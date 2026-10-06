/**
 * Откуда пришёл посетитель. Запоминаем при первом заходе и храним 90 дней,
 * чтобы источник дошёл до заявки, даже если человек вернулся на сайт через неделю.
 */

const STORAGE = 'tamga_src'
const TTL_DAYS = 90

export interface Attribution {
  /** Человекочитаемый источник: «Яндекс Директ», «Поиск Google», «Прямой заход»… */
  sourceLabel: string
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_content: string
  utm_term: string
  /** Идентификатор рекламного клика: yclid (Яндекс), gclid (Google) */
  clickId: string
  /** Адрес сайта-источника */
  referrer: string
  /** Первая страница, на которую зашёл посетитель */
  landing: string
  /** Дата и время первого визита, ISO */
  firstVisit: string
}

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const
const CLICK_KEYS = ['yclid', 'gclid', 'ymclid', 'fbclid'] as const

/** Известные площадки: домен реферера → как показать в таблице */
const REFERRER_NAMES: Array<[RegExp, string]> = [
  [/(^|\.)yandex\.[a-z.]+$/i, 'Поиск Яндекса'],
  [/(^|\.)ya\.ru$/i, 'Поиск Яндекса'],
  [/(^|\.)google\.[a-z.]+$/i, 'Поиск Google'],
  [/(^|\.)mail\.ru$/i, 'Mail.ru'],
  [/(^|\.)bing\.com$/i, 'Поиск Bing'],
  [/(^|\.)duckduckgo\.com$/i, 'Поиск DuckDuckGo'],
  [/(^|\.)vk\.com$/i, 'ВКонтакте'],
  [/(^|\.)vk\.ru$/i, 'ВКонтакте'],
  [/(^|\.)ok\.ru$/i, 'Одноклассники'],
  [/(^|\.)t\.me$/i, 'Telegram'],
  [/(^|\.)telegram\.org$/i, 'Telegram'],
  [/(^|\.)web\.telegram\.org$/i, 'Telegram'],
  [/(^|\.)max\.ru$/i, 'MAX'],
  [/(^|\.)whatsapp\.com$/i, 'WhatsApp'],
  [/(^|\.)instagram\.com$/i, 'Instagram'],
  [/(^|\.)2gis\.[a-z.]+$/i, '2ГИС'],
  [/(^|\.)avito\.ru$/i, 'Avito'],
  [/(^|\.)zoon\.ru$/i, 'Zoon'],
  [/(^|\.)youtube\.com$/i, 'YouTube'],
  [/(^|\.)rutube\.ru$/i, 'Rutube'],
  [/(^|\.)dzen\.ru$/i, 'Дзен'],
]

/** Рекламные источники: utm_source → как показать */
const UTM_SOURCE_NAMES: Record<string, string> = {
  yandex: 'Яндекс',
  direct: 'Яндекс Директ',
  'yandex-direct': 'Яндекс Директ',
  google: 'Google',
  googleads: 'Google Ads',
  vk: 'ВКонтакте',
  vkads: 'VK Реклама',
  telegram: 'Telegram',
  tg: 'Telegram',
  instagram: 'Instagram',
  avito: 'Avito',
  '2gis': '2ГИС',
  email: 'E-mail рассылка',
  sms: 'SMS',
  qr: 'QR-код',
  visitka: 'Визитка',
}

const MEDIUM_NAMES: Record<string, string> = {
  cpc: 'реклама',
  ppc: 'реклама',
  cpm: 'реклама',
  banner: 'баннер',
  email: 'рассылка',
  social: 'соцсети',
  organic: 'поиск',
  referral: 'переход',
  post: 'пост',
}

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

function labelFromReferrer(referrer: string): string {
  const host = hostOf(referrer)
  if (!host) return ''
  if (host === location.hostname.replace(/^www\./, '')) return '' // переход внутри сайта
  for (const [re, name] of REFERRER_NAMES) {
    if (re.test(host)) return name
  }
  return 'Переход с ' + host
}

/** Собирает человекочитаемую подпись источника */
function makeLabel(utm: Record<string, string>, clickId: string, referrer: string): string {
  const src = (utm.utm_source || '').toLowerCase().trim()
  const medium = (utm.utm_medium || '').toLowerCase().trim()

  if (src) {
    const name = UTM_SOURCE_NAMES[src] || src.charAt(0).toUpperCase() + src.slice(1)
    // «Яндекс» + medium=cpc → «Яндекс Директ»
    if ((src === 'yandex' || src === 'ya') && (medium === 'cpc' || medium === 'ppc')) return 'Яндекс Директ'
    if ((src === 'google' || src === 'adwords') && (medium === 'cpc' || medium === 'ppc')) return 'Google Ads'
    const mediumName = MEDIUM_NAMES[medium] || medium
    return mediumName ? `${name} · ${mediumName}` : name
  }

  if (clickId.startsWith('yclid')) return 'Яндекс Директ'
  if (clickId.startsWith('gclid')) return 'Google Ads'

  const fromRef = labelFromReferrer(referrer)
  if (fromRef) return fromRef

  return 'Прямой заход'
}

function read(): Attribution | null {
  try {
    const raw = localStorage.getItem(STORAGE)
    if (!raw) return null
    const saved = JSON.parse(raw) as Attribution & { savedAt?: number }
    if (saved.savedAt && Date.now() - saved.savedAt > TTL_DAYS * 86400e3) return null
    return saved
  } catch {
    return null
  }
}

/**
 * Запоминает источник первого визита. Если человек пришёл заново по рекламной ссылке
 * (есть utm или идентификатор клика) — перезаписываем на свежий источник.
 */
export function captureAttribution() {
  try {
    const params = new URLSearchParams(location.search)
    const utm: Record<string, string> = {}
    UTM_KEYS.forEach((k) => {
      const v = params.get(k)
      if (v) utm[k] = v.slice(0, 120)
    })

    let clickId = ''
    for (const k of CLICK_KEYS) {
      const v = params.get(k)
      if (v) {
        clickId = `${k}=${v.slice(0, 120)}`
        break
      }
    }

    const existing = read()
    const hasAdMarkers = Object.keys(utm).length > 0 || !!clickId
    if (existing && !hasAdMarkers) return // источник уже известен, новой рекламной метки нет

    const referrer = document.referrer || ''
    const data: Attribution & { savedAt: number } = {
      sourceLabel: makeLabel(utm, clickId, referrer),
      utm_source: utm.utm_source || '',
      utm_medium: utm.utm_medium || '',
      utm_campaign: utm.utm_campaign || '',
      utm_content: utm.utm_content || '',
      utm_term: utm.utm_term || '',
      clickId,
      referrer: labelFromReferrer(referrer) ? referrer : '',
      landing: location.href.split('#')[0],
      firstVisit: existing?.firstVisit || new Date().toISOString(),
      savedAt: Date.now(),
    }
    localStorage.setItem(STORAGE, JSON.stringify(data))
  } catch {
    /* localStorage недоступен (приватный режим) — не критично, источник определим в момент заявки */
  }
}

/** Данные об источнике для отправки вместе с заявкой */
export function getAttribution(): Attribution {
  const saved = read()
  if (saved) return saved
  const referrer = document.referrer || ''
  return {
    sourceLabel: makeLabel({}, '', referrer),
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_content: '',
    utm_term: '',
    clickId: '',
    referrer: labelFromReferrer(referrer) ? referrer : '',
    landing: location.href.split('#')[0],
    firstVisit: new Date().toISOString(),
  }
}
