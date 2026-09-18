import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Phone } from 'lucide-react'
import { site, waLink, tgLink } from '@/config/site'
import { TamgaMark } from './TamgaMark'
import { sendLead, makeLeadId } from '@/lib/leads'
import { saveSubmittedLead, THANKS_PATH } from '@/lib/thanks'

export interface LeadOptions {
  /** Заголовок окна */
  title?: string
  /** Подзаголовок / обещание */
  subtitle?: string
  /** Что именно интересует — уйдёт в заявку */
  topic?: string
  /** Предзаполненный комментарий */
  message?: string
  /** Текст кнопки */
  cta?: string
  /** Откуда открыли (для аналитики) */
  source?: string
  /** Предзаполнить имя и телефон (например, при исправлении заявки) */
  name?: string
  phone?: string
  /** Это исправление ранее отправленной заявки с таким id */
  correctionOf?: string
}

interface LeadCtx {
  open: (o?: LeadOptions) => void
  close: () => void
}

const Ctx = createContext<LeadCtx>({ open: () => {}, close: () => {} })
export const useLead = () => useContext(Ctx)

const DEFAULTS: Required<Pick<LeadOptions, 'title' | 'subtitle' | 'cta'>> = {
  title: 'Перезвоним за 15 минут',
  subtitle: 'Оставьте номер — бухгалтер, а не менеджер, ответит на вопросы и назовёт точную цену.',
  cta: 'Жду звонка',
}

function formatPhone(v: string) {
  const d = v.replace(/\D/g, '').replace(/^8/, '7').slice(0, 11)
  if (!d) return ''
  let out = '+7'
  if (d.length > 1) out += ' (' + d.slice(1, 4)
  if (d.length >= 4) out += ') ' + d.slice(4, 7)
  if (d.length >= 7) out += '-' + d.slice(7, 9)
  if (d.length >= 9) out += '-' + d.slice(9, 11)
  return out
}

export function LeadProvider({ children }: { children: React.ReactNode }) {
  const [opts, setOpts] = useState<LeadOptions | null>(null)
  const open = useCallback((o?: LeadOptions) => setOpts(o ?? {}), [])
  const close = useCallback(() => setOpts(null), [])
  const value = useMemo(() => ({ open, close }), [open, close])

  return (
    <Ctx.Provider value={value}>
      {children}
      <AnimatePresence>{opts && <LeadModal key="lead" opts={opts} onClose={close} />}</AnimatePresence>
    </Ctx.Provider>
  )
}

function LeadModal({ opts, onClose }: { opts: LeadOptions; onClose: () => void }) {
  const [name, setName] = useState(opts.name ?? '')
  const [phone, setPhone] = useState(opts.phone ? formatPhone(opts.phone) : '')
  const [message, setMessage] = useState(opts.message ?? '')
  const [agree, setAgree] = useState(true)
  const [company, setCompany] = useState('') // honeypot
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')


  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const digits = phone.replace(/\D/g, '')
  const valid = digits.length === 11 && agree

  const composeText = () =>
    [
      `Заявка с сайта ${site.brand}`,
      opts.topic ? `Тема: ${opts.topic}` : null,
      name ? `Имя: ${name}` : null,
      `Телефон: ${phone}`,
      message ? `Комментарий: ${message}` : null,
    ]
      .filter(Boolean)
      .join('\n')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid) return
    setState('sending')
    const topic = opts.correctionOf ? `Исправление заявки #${opts.correctionOf}: ${opts.topic ?? ''}`.trim() : opts.topic
    const goThanks = (via: 'server' | 'messenger', id?: string) => {
      saveSubmittedLead({ id, name, phone, message, topic, via, correctionOf: opts.correctionOf, at: new Date().toISOString() })
      location.assign(THANKS_PATH)
    }
    if (company) {
      // honeypot заполнен — молча «принимаем», чтобы не подсказывать боту
      goThanks('server')
      return
    }
    try {
      if (site.formEndpoint) {
        const { id } = await sendLead({ id: makeLeadId(), name, phone, message, topic, source: opts.source })
        goThanks('server', id)
      } else {
        const url = site.fallbackChannel === 'telegram' ? tgLink(composeText()) : waLink(composeText())
        window.open(url, '_blank', 'noopener')
        goThanks('messenger')
      }
    } catch {
      setState('error')
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.12 } }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-night/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        role="dialog"
        aria-modal="true"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 16, opacity: 0, transition: { duration: 0.12 } }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="relative w-full sm:max-w-[520px] max-h-[92vh] overflow-y-auto bg-white rounded-t-[28px] sm:rounded-[28px] shadow-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-night text-white px-6 pt-6 pb-7 rounded-t-[28px] overflow-hidden">
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-gold/25 blur-3xl" />
          <div className="absolute inset-0 tamga-grid opacity-40" />
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onClose() }}
            aria-label="Закрыть"
            className="absolute top-3 right-3 z-20 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 active:bg-white/40 flex items-center justify-center transition-colors touch-manipulation"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="relative flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0">
              <TamgaMark className="w-7 h-7 text-gold" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-xl leading-tight">{opts.title ?? DEFAULTS.title}</h3>
              <p className="text-white/70 text-sm mt-1.5 leading-relaxed">{opts.subtitle ?? DEFAULTS.subtitle}</p>
            </div>
          </div>
          {opts.topic && (
            <div className="relative mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1.5 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              {opts.topic}
            </div>
          )}
        </div>

        {
          <form onSubmit={submit} className="p-6 space-y-4 relative">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Как к вам обращаться</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Имя"
                className="mt-1.5 w-full rounded-2xl border border-gray-200 bg-sand/60 px-4 py-3 outline-none focus:border-gold focus:ring-4 focus:ring-gold/15 transition"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Телефон *</span>
              <input
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                inputMode="tel"
                autoComplete="tel"
                required
                placeholder="+7 (___) ___-__-__"
                className="mt-1.5 w-full rounded-2xl border border-gray-200 bg-sand/60 px-4 py-3 outline-none focus:border-gold focus:ring-4 focus:ring-gold/15 transition"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Комментарий</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder="Коротко о бизнесе: ИП или ООО, режим налога, есть ли сотрудники и маркетплейсы"
                className="mt-1.5 w-full rounded-2xl border border-gray-200 bg-sand/60 px-4 py-3 outline-none focus:border-gold focus:ring-4 focus:ring-gold/15 transition resize-none"
              />
            </label>
            {/* Honeypot: скрыт от людей, боты его заполняют */}
            <div className="absolute -left-[9999px] top-0 w-px h-px overflow-hidden" aria-hidden>
              <label>
                Компания
                <input tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} />
              </label>
            </div>
            <label className="flex items-start gap-3 text-xs text-gray-500 leading-relaxed cursor-pointer">
              <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 accent-gold w-4 h-4" />
              <span>
                Согласен(на) на обработку персональных данных согласно{' '}
                <a href="#policy" className="underline decoration-gold/50 hover:text-ink">политике конфиденциальности</a>
              </span>
            </label>
            {state === 'error' && (
              <div className="rounded-2xl bg-red-50 border border-red-100 p-3 text-sm text-red-700">
                Не получилось отправить автоматически. Отправьте заявку одним нажатием:{' '}
                <a className="font-semibold underline" href={waLink(composeText())} target="_blank" rel="noopener">в WhatsApp</a>
                {' '}или позвоните <a className="font-semibold underline" href={site.phoneHref}>{site.phone}</a>
              </div>
            )}
            <button
              type="submit"
              disabled={!valid || state === 'sending'}
              className="w-full rounded-full bg-gold hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed text-night font-bold py-4 px-6 text-base transition-all hover:scale-[1.02] active:scale-[0.98] shadow-gold flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              {state === 'sending' ? 'Отправляем… это займёт до 15 секунд' : opts.cta ?? DEFAULTS.cta}
            </button>
            <p className="text-center text-[12px] text-gray-400">
              Без спама и навязчивых звонков. Или напишите сами:{' '}
              <a href={waLink()} target="_blank" rel="noopener" className="text-ink underline decoration-gold/50">WhatsApp</a>
              {' · '}
              <a href={tgLink()} target="_blank" rel="noopener" className="text-ink underline decoration-gold/50">Telegram</a>
              {' · '}
              <a href={site.max} target="_blank" rel="noopener" className="text-ink underline decoration-gold/50">MAX</a>
            </p>
          </form>
        }
      </motion.div>
    </motion.div>
  )
}
