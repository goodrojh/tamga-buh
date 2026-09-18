/** Данные последней заявки — передаём на страницу «Спасибо» через sessionStorage. */
export interface SubmittedLead {
  name: string
  phone: string
  message: string
  topic?: string
  /** Через что ушла заявка: сервер (таблица/почта/Telegram) или мессенджер (резервный режим) */
  via: 'server' | 'messenger'
  /** Это исправление предыдущей заявки */
  correction?: boolean
  at: string
}

const KEY = 'tamga_last_lead'

export const THANKS_PATH = import.meta.env.BASE_URL + 'spasibo/'
export const HOME_PATH = import.meta.env.BASE_URL

export function saveSubmittedLead(lead: SubmittedLead) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(lead))
  } catch {
    /* ignore */
  }
}

export function readSubmittedLead(): SubmittedLead | null {
  try {
    const raw = sessionStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as SubmittedLead) : null
  } catch {
    return null
  }
}

export function isThanksPage() {
  return location.pathname.replace(/\/+$/, '/').endsWith('/spasibo/')
}
