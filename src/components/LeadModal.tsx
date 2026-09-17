import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Phone, Send, CheckCircle2, MessageCircle } from 'lucide-react'
import { site, waLink, tgLink } from '@/config/site'
import { TamgaMark } from './TamgaMark'

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
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState(opts.message ?? '')
  const [agree, setAgree] = useState(true)
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
    try {
      if (site.formEndpoint) {
        const res = await fetch(site.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ name, phone, message, topic: opts.topic, source: opts.source, page: location.href }),
        })
        if (!res.ok) throw new Error(String(res.status))
      } else {
        const url = site.fallbackChannel === 'telegram' ? tgLink(composeText()) : waLink(composeText())
        window.open(url, '_blank', 'noopener')
      }
      setState('done')
    } catch {
      setState('error')
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-night/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        role="dialog"
        aria-modal="true"
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        className="relative w-full sm:max-w-[520px] max-h-[92vh] overflow-y-auto bg-white rounded-t-[28px] sm:rounded-[28px] shadow-panel"
      >
        <div className="relative bg-night text-white px-6 pt-6 pb-7 rounded-t-[28px] overflow-hidden">
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-gold/25 blur-3xl" />
          <div className="absolute inset-0 tamga-grid opacity-40" />
          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
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

        {state === 'done' ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-steppe/10 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9 text-steppe" />
            </div>
            <h4 className="font-display font-semibold text-xl mt-5">Заявка принята</h4>
            <p className="text-gray-500 mt-2 leading-relaxed">
              {site.formEndpoint
                ? 'Перезвоним в рабочее время в течение 15 минут. Если срочно — напишите нам в мессенджер.'
                : 'Мы открыли мессенджер с готовым сообщением — просто нажмите «Отправить». Если окно не открылось, напишите нам напрямую.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <a href={waLink(composeText())} target="_blank" rel="noopener" className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] text-white font-semibold py-3 px-5">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <a href={tgLink(composeText())} target="_blank" rel="noopener" className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#2AABEE] text-white font-semibold py-3 px-5">
                <Send className="w-4 h-4" /> Telegram
              </a>
            </div>
            <button onClick={onClose} className="mt-4 text-sm text-gray-400 hover:text-gray-600">Закрыть</button>
          </div>
        ) : (
          <form onSubmit={submit} className="p-6 space-y-4">
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
            <label className="flex items-start gap-3 text-xs text-gray-500 leading-relaxed cursor-pointer">
              <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 accent-gold w-4 h-4" />
              <span>
                Согласен(на) на обработку персональных данных согласно{' '}
                <a href="#policy" className="underline decoration-gold/50 hover:text-ink">политике конфиденциальности</a>
              </span>
            </label>
            {state === 'error' && (
              <p className="text-sm text-red-600">Не получилось отправить. Позвоните нам: <a className="underline" href={site.phoneHref}>{site.phone}</a></p>
            )}
            <button
              type="submit"
              disabled={!valid || state === 'sending'}
              className="w-full rounded-full bg-gold hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed text-night font-bold py-4 px-6 text-base transition-all hover:scale-[1.02] active:scale-[0.98] shadow-gold flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              {state === 'sending' ? 'Отправляем…' : opts.cta ?? DEFAULTS.cta}
            </button>
            <p className="text-center text-[12px] text-gray-400">
              Без спама и навязчивых звонков. Или напишите сами:{' '}
              <a href={waLink()} target="_blank" rel="noopener" className="text-ink underline decoration-gold/50">WhatsApp</a>
              {' · '}
              <a href={tgLink()} target="_blank" rel="noopener" className="text-ink underline decoration-gold/50">Telegram</a>
            </p>
          </form>
        )}
      </motion.div>
    </motion.div>
  )
}
