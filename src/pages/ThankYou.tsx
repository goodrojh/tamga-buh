import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Pencil, Home, Phone, MessageCircle, Send, Clock, PhoneCall, FileSignature, BookOpen } from 'lucide-react'
import { site, waLink, tgLink } from '@/config/site'
import { media } from '@/data/media'
import { articles } from '@/data/articles'
import { useLead } from '@/components/LeadModal'
import { useArticle } from '@/components/ArticleModal'
import { MaxIcon } from '@/components/MaxIcon'
import { readSubmittedLead, HOME_PATH, type SubmittedLead } from '@/lib/thanks'

const STEPS = [
  { icon: PhoneCall, t: 'Перезвоним', d: 'В рабочее время — в течение 15 минут. Вечером или в выходной — утром следующего рабочего дня.' },
  { icon: Clock, t: 'Разберём задачу', d: 'Бухгалтер задаст 2–3 вопроса о бизнесе и назовёт точную стоимость. Без «менеджеров по продажам».' },
  { icon: FileSignature, t: 'Договор и старт', d: 'Цена фиксируется в договоре. Первый месяц — без предоплаты. Подключаемся за один день.' },
]

function fmtDate(iso: string) {
  try {
    return new Date(iso).toLocaleString('ru-RU', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })
  } catch {
    return ''
  }
}

export default function ThankYou() {
  const { open } = useLead()
  const { openArticle } = useArticle()
  const [lead, setLead] = useState<SubmittedLead | null>(null)

  useEffect(() => {
    setLead(readSubmittedLead())
    window.scrollTo(0, 0)
    document.title = 'Заявка принята — ТамгаБух'
  }, [])

  const rows = useMemo(
    () =>
      lead
        ? [
            ['Имя', lead.name || '—'],
            ['Телефон', lead.phone],
            ['Тема', lead.topic || 'Обратный звонок'],
            ['Комментарий', lead.message || '—'],
          ]
        : [],
    [lead],
  )

  const correct = () =>
    open({
      source: 'thanks-correction',
      title: 'Исправить данные заявки',
      subtitle: 'Поправьте, что нужно, и отправьте ещё раз — мы увидим, что это уточнение, а не новая заявка.',
      topic: lead?.topic,
      name: lead?.name,
      phone: lead?.phone,
      message: lead?.message,
      cta: 'Отправить исправление',
      correctionOf: lead?.id ?? 'без номера',
    })

  return (
    <main className="min-h-screen bg-night text-white">
      {/* Hero */}
      <section className="relative overflow-hidden pt-[104px] md:pt-[128px] pb-14 md:pb-20 px-4 md:px-6">
        <video autoPlay muted loop playsInline poster={media.desk} className="absolute inset-0 w-full h-full object-cover opacity-50">
          <source src={media.sealVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-night/85 via-night/60 to-night" />

        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.4, opacity: 0, rotate: -12 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.15 }}
            className="mx-auto w-24 h-24 md:w-28 md:h-28 rounded-full bg-gold/15 border-2 border-gold/60 flex items-center justify-center shadow-gold"
          >
            <TamgaSeal />
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }} className="font-display font-semibold text-[34px] sm:text-5xl md:text-[58px] leading-[1.08] tracking-[-0.02em] mt-8">
            {lead?.correctionOf ? 'Уточнение принято' : 'Заявка принята.'} <br />
            <span className="gold-text italic inline-block pr-[0.15em] -mr-[0.15em]">Тамга поставлена</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="text-white/80 text-base md:text-lg mt-5 max-w-xl mx-auto leading-relaxed">
            {lead?.name ? `${lead.name.split(' ')[0]}, спасибо!` : 'Спасибо!'} Теперь это наша ответственность: бухгалтер свяжется с вами{' '}
            <b className="text-white">в рабочее время в течение 15 минут</b>.
            {lead?.via === 'messenger' && ' Если окно мессенджера не открылось — напишите нам любым удобным способом ниже.'}
          </motion.p>

          {lead?.id && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-5 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-[13px] text-white/80">
              <span className="w-2 h-2 rounded-full bg-gold" /> Номер заявки <span className="font-mono font-semibold text-gold">#{lead.id}</span>
              {lead.at && <span className="text-white/45">· {fmtDate(lead.at)}</span>}
            </motion.div>
          )}
        </div>
      </section>

      {/* Data + steps */}
      <section className="px-4 md:px-6 pb-16 md:pb-24 -mt-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-5 lg:gap-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }} className="lg:col-span-3 bg-white text-night rounded-[28px] p-6 md:p-8 shadow-panel">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[12px] uppercase tracking-[0.15em] text-gray-400">Проверьте данные</div>
                <h2 className="font-display font-semibold text-xl md:text-2xl mt-1">Что вы нам отправили</h2>
              </div>
              <span className="inline-flex w-9 h-9 rounded-full bg-steppe/10 items-center justify-center shrink-0">
                <Check className="w-5 h-5 text-steppe stroke-[3]" />
              </span>
            </div>

            {lead ? (
              <dl className="mt-6 divide-y divide-gray-100">
                {rows.map(([k, v]) => (
                  <div key={k} className="py-3.5 grid grid-cols-[86px_1fr] sm:grid-cols-[110px_1fr] gap-3">
                    <dt className="text-[13px] text-gray-400 pt-0.5">{k}</dt>
                    <dd className={'text-[15px] leading-relaxed break-words ' + (k === 'Телефон' ? 'font-display font-semibold text-base sm:text-lg whitespace-nowrap' : 'text-night')}>{v}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-6 text-gray-500 leading-relaxed">Данные заявки не сохранились в этом окне браузера — ничего страшного. Если вы уже отправляли заявку, мы её получили. Если нет — оставьте её сейчас.</p>
            )}

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              {lead ? (
                <button type="button" onClick={correct} className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border-2 border-night text-night font-semibold py-3.5 px-6 hover:bg-night hover:text-white transition-colors">
                  <Pencil className="w-4 h-4" /> Ошибка в данных? Исправить
                </button>
              ) : (
                <button type="button" onClick={() => open({ source: 'thanks-empty', topic: 'Заявка со страницы «Спасибо»' })} className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-gold text-night font-bold py-3.5 px-6 hover:bg-gold-light transition-colors">
                  <Phone className="w-4 h-4" /> Оставить заявку
                </button>
              )}
              <a href={HOME_PATH} className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-night text-white font-semibold py-3.5 px-6 hover:bg-night-3 transition-colors">
                <Home className="w-4 h-4 text-gold" /> Вернуться на главную
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.6 }} className="lg:col-span-2 glass rounded-[28px] p-6 md:p-7">
            <div className="text-[12px] uppercase tracking-[0.15em] text-white/50">Что дальше</div>
            <ol className="mt-4 space-y-5">
              {STEPS.map(({ icon: Icon, t, d }, i) => (
                <li key={t} className="flex gap-4">
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    {i < STEPS.length - 1 && <div className="absolute left-1/2 -translate-x-1/2 top-10 w-px h-5 bg-white/15" />}
                  </div>
                  <div>
                    <div className="font-semibold">{t}</div>
                    <p className="text-[13px] text-white/60 leading-relaxed mt-1">{d}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-6 pt-5 border-t border-white/10">
              <div className="text-[12px] text-white/50 mb-3">Срочно? Напишите или позвоните сами</div>
              <div className="flex flex-wrap gap-2">
                <a href={site.phoneHref} className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-2 text-[13px] font-semibold hover:bg-white/20"><Phone className="w-4 h-4 text-gold" /> {site.phone}</a>
                <a href={waLink()} target="_blank" rel="noopener" aria-label="WhatsApp" className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center hover:scale-110 transition-transform"><MessageCircle className="w-5 h-5 text-white" /></a>
                <a href={tgLink()} target="_blank" rel="noopener" aria-label="Telegram" className="w-10 h-10 rounded-full bg-[#2AABEE] flex items-center justify-center hover:scale-110 transition-transform"><Send className="w-5 h-5 text-white" /></a>
                <a href={site.max} target="_blank" rel="noopener" aria-label="MAX" className="w-10 h-10 rounded-full bg-[#5B4BFF] flex items-center justify-center hover:scale-110 transition-transform"><MaxIcon className="w-5 h-5 text-white" /></a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* While you wait */}
      <section className="bg-sand text-night px-4 md:px-6 py-16 md:py-20 pb-28 md:pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-5 h-5 text-gold-dark" />
            <h2 className="font-display font-semibold text-2xl md:text-3xl">Пока ждёте звонка — 5 минут полезного</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {articles.map((a) => (
              <button key={a.id} type="button" onClick={() => openArticle(a.id)} className="text-left bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-[0_12px_40px_-16px_rgba(10,26,51,0.3)] transition-shadow group">
                <div className="h-36 overflow-hidden">
                  <img src={a.image} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gold-dark">{a.tag} · {a.readTime}</span>
                  <div className="font-display font-semibold text-[15px] leading-snug mt-1.5">{a.title}</div>
                </div>
              </button>
            ))}
          </div>
          <p className="text-center text-[12px] text-gray-400 mt-8">
            © {new Date().getFullYear()} {site.brand} · <a href={HOME_PATH} className="underline decoration-gold/50 hover:text-night">на главную</a>
          </p>
        </div>
      </section>
    </main>
  )
}

/** Печать-тамга: марка + пульсирующее кольцо */
function TamgaSeal() {
  return (
    <div className="relative w-14 h-14 md:w-16 md:h-16">
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-gold/50"
        animate={{ scale: [1, 1.6], opacity: [0.7, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 0.8 }}
      />
      <img src={media.markGold} alt="" className="relative w-full h-full" draggable={false} />
    </div>
  )
}
