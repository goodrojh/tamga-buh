/**
 * ТамгаБух — приём заявок с сайта.
 *
 * Что делает при каждой заявке (POST с сайта):
 *   1. Записывает строку в Google-таблицу (лист «Заявки») — журнал всех лидов.
 *   2. Отправляет письмо на EMAIL_TO.
 *   3. Отправляет сообщение в Telegram (бот → ваш чат или группу).
 *
 * Настройка — см. integrations/README.md. Секреты хранятся в
 * «Настройки проекта → Свойства скрипта» (Script properties):
 *   TELEGRAM_BOT_TOKEN  — токен бота от @BotFather
 *   TELEGRAM_CHAT_ID    — кому слать: один или несколько chat_id через запятую (например 123456789,987654321)
 *                         Узнать chat_id: запустить функцию getChatIds() — она покажет всех, кто написал боту.
 *   EMAIL_TO            — куда слать письма (можно несколько через запятую)
 *   SHEET_ID            — (необязательно) id таблицы, если скрипт не привязан к ней
 *   SECRET              — (необязательно) общий секрет; если задан, сайт должен присылать его в поле `secret`
 */

var SHEET_NAME = 'Заявки';
var HEADERS = [
  'Дата и время', 'Имя', 'Телефон', 'Тема', 'Комментарий',
  'Кнопка (источник)', 'Страница', 'UTM source', 'UTM medium', 'UTM campaign', 'UTM content', 'UTM term',
  'Реферер', 'Устройство', 'ID заявки',
];

function props_() {
  return PropertiesService.getScriptProperties();
}

function getSheet_() {
  var id = props_().getProperty('SHEET_ID');
  var ss = id ? SpreadsheetApp.openById(id) : SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('Таблица не найдена: привяжите скрипт к таблице или задайте SHEET_ID');
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    formatSheet_(sh);
  }
  return sh;
}

/** Запустить один раз вручную: создаёт лист, шапку, закрепляет строку. */
function setup() {
  var sh = getSheet_();
  formatSheet_(sh);
  Logger.log('Готово. Лист «' + SHEET_NAME + '» настроен.');
}

function formatSheet_(sh) {
  if (sh.getLastRow() === 0) {
    sh.appendRow(HEADERS);
  }
  var header = sh.getRange(1, 1, 1, HEADERS.length);
  header.setValues([HEADERS]).setFontWeight('bold').setBackground('#0A1A33').setFontColor('#F0C96A');
  sh.setFrozenRows(1);
  // Ширины колонок
  var widths = [150, 140, 150, 260, 320, 160, 220, 110, 110, 130, 110, 110, 180, 120, 100];
  widths.forEach(function (w, i) { sh.setColumnWidth(i + 1, w); });
}

/** Health-check: открыть URL веб-приложения в браузере — должно вернуть {"ok":true}. */
function doGet() {
  return json_({ ok: true, service: 'tamga-buh leads' });
}

function doPost(e) {
  try {
    var data = parseBody_(e);

    // Секрет (если задан)
    var secret = props_().getProperty('SECRET');
    if (secret && data.secret !== secret) return json_({ ok: false, error: 'forbidden' });

    // Honeypot: боты заполняют скрытое поле
    if (data.company) return json_({ ok: true, skipped: 'honeypot' });

    var phone = String(data.phone || '').trim();
    if (!phone) return json_({ ok: false, error: 'phone required' });

    var lead = {
      ts: new Date(),
      name: String(data.name || '').trim(),
      phone: phone,
      topic: String(data.topic || '').trim(),
      message: String(data.message || '').trim(),
      source: String(data.source || '').trim(),
      page: String(data.page || '').trim(),
      utm_source: String(data.utm_source || ''),
      utm_medium: String(data.utm_medium || ''),
      utm_campaign: String(data.utm_campaign || ''),
      utm_content: String(data.utm_content || ''),
      utm_term: String(data.utm_term || ''),
      referrer: String(data.referrer || ''),
      device: String(data.device || ''),
      id: Utilities.getUuid().slice(0, 8).toUpperCase(),
    };

    var sheetUrl = saveToSheet_(lead);
    var results = { sheet: !!sheetUrl };
    try { results.telegram = sendTelegram_(lead, sheetUrl); } catch (err) { results.telegram = 'error: ' + err; }
    try { results.email = sendEmail_(lead, sheetUrl); } catch (err) { results.email = 'error: ' + err; }

    return json_({ ok: true, id: lead.id, results: results });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function parseBody_(e) {
  if (!e || !e.postData) return {};
  var raw = e.postData.contents || '';
  try { return JSON.parse(raw); } catch (_) {}
  // fallback: form-urlencoded
  return e.parameter || {};
}

function saveToSheet_(lead) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var sh = getSheet_();
    sh.appendRow([
      lead.ts, lead.name, "'" + lead.phone, lead.topic, lead.message,
      lead.source, lead.page, lead.utm_source, lead.utm_medium, lead.utm_campaign, lead.utm_content, lead.utm_term,
      lead.referrer, lead.device, lead.id,
    ]);
    var row = sh.getLastRow();
    sh.getRange(row, 1).setNumberFormat('dd.MM.yyyy HH:mm');
    return sh.getParent().getUrl() + '#gid=' + sh.getSheetId() + '&range=A' + row;
  } finally {
    lock.releaseLock();
  }
}

function esc_(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function digits_(phone) {
  var d = String(phone).replace(/\D/g, '');
  if (d.length === 11 && d[0] === '8') d = '7' + d.slice(1);
  return d;
}

function sendTelegram_(lead, sheetUrl) {
  var token = props_().getProperty('TELEGRAM_BOT_TOKEN');
  var chatIds = String(props_().getProperty('TELEGRAM_CHAT_ID') || '').split(',').map(function (s) { return s.trim(); }).filter(String);
  if (!token || !chatIds.length) return 'not configured';

  var d = digits_(lead.phone);
  var lines = [
    '🟡 <b>Новая заявка с сайта</b>  <code>#' + lead.id + '</code>',
    '',
    '👤 <b>Имя:</b> ' + esc_(lead.name || '—'),
    '📞 <b>Телефон:</b> <a href="tel:+' + d + '">' + esc_(lead.phone) + '</a>',
    lead.topic ? '📌 <b>Тема:</b> ' + esc_(lead.topic) : null,
    lead.message ? '💬 <b>Комментарий:</b> ' + esc_(lead.message) : null,
    '',
    '🔘 Кнопка: ' + esc_(lead.source || '—') + (lead.utm_source ? '  ·  UTM: ' + esc_(lead.utm_source + '/' + lead.utm_medium + '/' + lead.utm_campaign) : ''),
    '📱 ' + esc_(lead.device || ''),
    '',
    '<a href="https://wa.me/' + d + '">Написать в WhatsApp</a>  ·  <a href="' + sheetUrl + '">Открыть в таблице</a>',
  ].filter(function (x) { return x !== null; });

  // Шлём каждому получателю из списка. Бот пишет ТОЛЬКО этим chat_id —
  // посторонние, нажавшие Start, ничего не получают.
  var report = chatIds.map(function (chatId) {
    var res = UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({ chat_id: chatId, text: lines.join('\n'), parse_mode: 'HTML', disable_web_page_preview: true }),
      muteHttpExceptions: true,
    });
    return chatId + ': ' + (res.getResponseCode() === 200 ? 'sent' : 'http ' + res.getResponseCode() + ' ' + res.getContentText());
  });
  return report.join('; ');
}

/**
 * Помощник: показывает chat_id всех, кто писал боту (людей и групп).
 * Запустить вручную из редактора → смотреть «Журнал выполнения».
 * Нужные id вписать в свойство TELEGRAM_CHAT_ID (через запятую, если несколько).
 */
function getChatIds() {
  var token = props_().getProperty('TELEGRAM_BOT_TOKEN');
  if (!token) { Logger.log('Сначала задайте TELEGRAM_BOT_TOKEN в свойствах скрипта'); return; }
  var res = UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/getUpdates', { muteHttpExceptions: true });
  var data = JSON.parse(res.getContentText());
  if (!data.ok) { Logger.log('Ошибка Telegram: ' + res.getContentText()); return; }
  var seen = {};
  (data.result || []).forEach(function (u) {
    var m = u.message || u.my_chat_member || u.channel_post;
    if (!m || !m.chat) return;
    var c = m.chat;
    var title = c.title || [c.first_name, c.last_name].filter(String).join(' ') || '';
    seen[c.id] = (c.type === 'private' ? 'Личный чат' : 'Группа') + ': ' + title + (c.username ? ' (@' + c.username + ')' : '');
  });
  var ids = Object.keys(seen);
  if (!ids.length) {
    Logger.log('Пока никто не писал боту. Откройте бота в Telegram, нажмите Start, напишите «привет» и запустите снова.');
    return;
  }
  Logger.log('Найдены чаты:');
  ids.forEach(function (id) { Logger.log('  chat_id = ' + id + '   —   ' + seen[id]); });
  Logger.log('Впишите нужные chat_id в свойство TELEGRAM_CHAT_ID (несколько — через запятую).');
}

function sendEmail_(lead, sheetUrl) {
  var to = props_().getProperty('EMAIL_TO');
  if (!to) return 'not configured';
  var d = digits_(lead.phone);
  var subject = 'Заявка с сайта ТамгаБух: ' + (lead.topic || lead.source || 'звонок') + ' — ' + lead.phone;
  var rows = [
    ['Имя', lead.name || '—'], ['Телефон', lead.phone], ['Тема', lead.topic || '—'], ['Комментарий', lead.message || '—'],
    ['Кнопка', lead.source || '—'], ['Страница', lead.page || '—'], ['UTM', [lead.utm_source, lead.utm_medium, lead.utm_campaign].filter(String).join(' / ') || '—'],
    ['Устройство', lead.device || '—'], ['ID', lead.id],
  ];
  var html =
    '<div style="font-family:Arial,sans-serif;font-size:15px;color:#121826">' +
    '<h2 style="color:#0A1A33;margin:0 0 12px">Новая заявка с сайта</h2>' +
    '<table cellpadding="6" style="border-collapse:collapse">' +
    rows.map(function (r) { return '<tr><td style="color:#888;white-space:nowrap">' + esc_(r[0]) + '</td><td><b>' + esc_(r[1]) + '</b></td></tr>'; }).join('') +
    '</table>' +
    '<p style="margin-top:16px"><a href="tel:+' + d + '">Позвонить</a> &nbsp;·&nbsp; <a href="https://wa.me/' + d + '">WhatsApp</a> &nbsp;·&nbsp; <a href="' + sheetUrl + '">Открыть в таблице</a></p>' +
    '</div>';
  MailApp.sendEmail({ to: to, subject: subject, htmlBody: html, name: 'Сайт ТамгаБух' });
  return 'sent';
}

/** Тестовая заявка — запустить вручную из редактора, чтобы проверить таблицу, почту и Telegram. */
function testLead() {
  var fake = {
    postData: {
      contents: JSON.stringify({
        name: 'Тест', phone: '+7 (961) 545-39-19', topic: 'Проверка интеграции', message: 'Если вы это видите — всё работает',
        source: 'testLead()', page: 'https://goodrojh.github.io/tamga-buh/', device: 'Apps Script',
      }),
    },
  };
  var out = doPost(fake);
  Logger.log(out.getContent());
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
