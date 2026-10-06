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

/**
 * Простой способ настройки: впишите значения прямо сюда.
 * Если то же свойство задано в «Настройки проекта → Свойства скрипта», приоритет у свойства.
 */
var CONFIG = {
  TELEGRAM_BOT_TOKEN: '',
  TELEGRAM_CHAT_ID: '',   // один или несколько chat_id через запятую
  EMAIL_TO: '',
  SECRET: '',
};

var SHEET_NAME = 'Заявки';
// Порядок колонок. Скрипт раскладывает значения ПО НАЗВАНИЮ колонки,
// поэтому колонки в таблице можно переставлять и прятать — ничего не сломается.
var HEADERS = [
  'Дата и время', 'Имя', 'Телефон', 'Тема', 'Комментарий',
  'Источник', 'Кнопка на сайте',
  'UTM source', 'UTM medium', 'UTM campaign', 'UTM content', 'UTM term',
  'Клик (yclid/gclid)', 'Страница заявки', 'Страница входа', 'Первый визит', 'Реферер',
  'Устройство', 'ID заявки',
];

function props_() {
  return PropertiesService.getScriptProperties();
}

/** Значение настройки: сначала Свойства скрипта, затем CONFIG выше. */
function cfg_(key) {
  return props_().getProperty(key) || CONFIG[key] || '';
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
  ensureHeaders_(sh);
  var last = sh.getLastColumn();
  sh.getRange(1, 1, 1, last).setFontWeight('bold').setBackground('#0A1A33').setFontColor('#F0C96A');
  sh.setFrozenRows(1);
  var widths = {
    'Дата и время': 150, 'Имя': 140, 'Телефон': 150, 'Тема': 260, 'Комментарий': 320,
    'Источник': 180, 'Кнопка на сайте': 150,
    'UTM source': 120, 'UTM medium': 110, 'UTM campaign': 140, 'UTM content': 120, 'UTM term': 120,
    'Клик (yclid/gclid)': 160, 'Страница заявки': 220, 'Страница входа': 220, 'Первый визит': 140,
    'Реферер': 180, 'Устройство': 130, 'ID заявки': 100,
  };
  var header = sh.getRange(1, 1, 1, last).getValues()[0];
  header.forEach(function (h, i) { if (widths[h]) sh.setColumnWidth(i + 1, widths[h]); });
}

/**
 * Приводит шапку к нужному виду: недостающие колонки вставляются на свои места,
 * существующие остаются там, где их поставили вы (данные под ними не съезжают).
 */
function ensureHeaders_(sh) {
  if (sh.getLastRow() === 0) {
    sh.appendRow(HEADERS);
    return;
  }
  for (var i = 0; i < HEADERS.length; i++) {
    var name = HEADERS[i];
    var header = sh.getRange(1, 1, 1, Math.max(sh.getLastColumn(), 1)).getValues()[0];
    if (header.indexOf(name) !== -1) continue;
    var pos = Math.min(i + 1, header.length + 1);
    if (pos <= header.length) {
      sh.insertColumnBefore(pos);
    } else {
      sh.insertColumnAfter(header.length);
      pos = header.length + 1;
    }
    sh.getRange(1, pos).setValue(name);
  }
}

/** Health-check: открыть URL веб-приложения в браузере — должно вернуть {"ok":true}. */
function doGet() {
  return json_({ ok: true, service: 'tamga-buh leads' });
}

function doPost(e) {
  try {
    var data = parseBody_(e);

    // Секрет (если задан)
    var secret = cfg_('SECRET');
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
      sourceLabel: String(data.sourceLabel || 'Прямой заход'),
      clickId: String(data.clickId || ''),
      landing: String(data.landing || ''),
      firstVisit: data.firstVisit ? new Date(data.firstVisit) : '',
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
    ensureHeaders_(sh);
    var header = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];

    var values = {
      'Дата и время': lead.ts,
      'Имя': lead.name,
      'Телефон': "'" + lead.phone,       // апостроф — чтобы Таблицы не съели «+»
      'Тема': lead.topic,
      'Комментарий': lead.message,
      'Источник': lead.sourceLabel,
      'Кнопка на сайте': lead.source,
      'UTM source': lead.utm_source,
      'UTM medium': lead.utm_medium,
      'UTM campaign': lead.utm_campaign,
      'UTM content': lead.utm_content,
      'UTM term': lead.utm_term,
      'Клик (yclid/gclid)': lead.clickId,
      'Страница заявки': lead.page,
      'Страница входа': lead.landing,
      'Первый визит': lead.firstVisit,
      'Реферер': lead.referrer,
      'Устройство': lead.device,
      'ID заявки': lead.id,
    };

    var row = header.map(function (h) { return values[h] !== undefined ? values[h] : ''; });
    sh.appendRow(row);

    var r = sh.getLastRow();
    var dateCol = header.indexOf('Дата и время') + 1;
    if (dateCol > 0) sh.getRange(r, dateCol).setNumberFormat('dd.MM.yyyy HH:mm');
    var firstCol = header.indexOf('Первый визит') + 1;
    if (firstCol > 0) sh.getRange(r, firstCol).setNumberFormat('dd.MM.yyyy HH:mm');

    return sh.getParent().getUrl() + '#gid=' + sh.getSheetId() + '&range=A' + r;
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
  var token = cfg_('TELEGRAM_BOT_TOKEN');
  var chatIds = String(cfg_('TELEGRAM_CHAT_ID') || '').split(',').map(function (s) { return s.trim(); }).filter(String);
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
    '📈 <b>Источник:</b> ' + esc_(lead.sourceLabel || '—') + (lead.utm_campaign ? '  ·  кампания: ' + esc_(lead.utm_campaign) : ''),
    '🔘 Кнопка: ' + esc_(lead.source || '—'),
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
  var token = cfg_('TELEGRAM_BOT_TOKEN');
  if (!token) { Logger.log('Сначала задайте TELEGRAM_BOT_TOKEN (в CONFIG вверху файла или в свойствах скрипта)'); return; }
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
  var to = cfg_('EMAIL_TO');
  if (!to) return 'not configured';
  var d = digits_(lead.phone);
  var subject = 'Заявка с сайта ТамгаБух: ' + (lead.topic || lead.source || 'звонок') + ' — ' + lead.phone;
  var rows = [
    ['Имя', lead.name || '—'], ['Телефон', lead.phone], ['Тема', lead.topic || '—'], ['Комментарий', lead.message || '—'],
    ['Источник', lead.sourceLabel || '—'], ['Кнопка', lead.source || '—'], ['Страница', lead.page || '—'],
    ['UTM', [lead.utm_source, lead.utm_medium, lead.utm_campaign].filter(String).join(' / ') || '—'],
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
        sourceLabel: 'Проверка из редактора', utm_source: 'test', utm_medium: 'manual', utm_campaign: 'proverka',
        landing: 'https://goodrojh.github.io/tamga-buh/', firstVisit: new Date().toISOString(),
      }),
    },
  };
  var out = doPost(fake);
  Logger.log(out.getContent());
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
