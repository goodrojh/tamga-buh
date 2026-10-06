import { site } from '@/config/site'
import { getAttribution } from './attribution'

export interface LeadPayload {
  name: string
  phone: string
  message: string
  topic?: string
  source?: string
  /** honeypot — реальный пользователь его не заполняет */
  company?: string
}

function device(): string {
  const ua = navigator.userAgent
  const mobile = /Mobi|Android|iPhone|iPad/i.test(ua) ? 'Телефон' : 'Компьютер'
  const os = /Android/i.test(ua) ? 'Android' : /iPhone|iPad/i.test(ua) ? 'iOS' : /Windows/i.test(ua) ? 'Windows' : /Mac/i.test(ua) ? 'macOS' : 'другая ОС'
  return `${mobile}, ${os}`
}

/**
 * Отправка заявки в Google Apps Script (см. integrations/README.md).
 * Тело — text/plain, чтобы браузер не делал CORS-preflight (Apps Script его не поддерживает).
 * Бросает исключение, если endpoint не настроен или ответил ошибкой.
 */
export async function sendLead(payload: LeadPayload): Promise<void> {
  if (!site.formEndpoint) throw new Error('form endpoint not configured')

  const body = JSON.stringify({
    ...payload,
    ...getAttribution(),
    secret: site.formSecret || undefined,
    page: location.href,
    device: device(),
    sentAt: new Date().toISOString(),
  })

  const res = await fetch(site.formEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body,
    redirect: 'follow',
  })
  // Apps Script обрабатывает POST на script.google.com и отвечает редиректом на страницу с результатом.
  // Если сам редирект изредка отдаёт 404 (сбой Google), заявка уже записана и разослана —
  // не считаем это ошибкой, чтобы не заставлять клиента отправлять повторно.
  if (!res.ok) {
    if (res.redirected) return
    throw new Error('http ' + res.status)
  }
  const data = (await res.json().catch(() => ({ ok: true }))) as { ok?: boolean; error?: string }
  if (data.ok === false) throw new Error(data.error || 'server error')
}
