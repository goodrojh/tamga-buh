import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Award, ShieldCheck, MessageCircle, ZoomIn, X } from 'lucide-react'
import { media } from '@/data/media'
import { site } from '@/config/site'
import { useLead } from '@/components/LeadModal'

const PRINCIPLES = [
  { t: 'Отвечаю лично', d: 'Каждый клиент знает, кому звонить. Не «ваш менеджер», а конкретный человек, который принимает решения.' },
  { t: 'Говорю как есть', d: 'Если льгота вам не подходит или бухгалтер вообще не нужен — скажу прямо. Долгие отношения дороже одной продажи.' },
  { t: 'Ставлю тамгу', d: 'Родовой знак у калмыков ставили на то, за что отвечают головой. Так же отношусь к учёту клиентов.' },
]

export default function About() {
  const { open } = useLead()
  const [lightbox, setLightbox] = useState(false)

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setLightbox(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox])

  return (
    <section id="about" className="bg-sand py-20 md:py-28 px-4 md:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Photo */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-5 relative">
            <div className="hidden md:block absolute -inset-6 bg-gold/15 blur-3xl rounded-full" />
            <div className="relative rounded-[28px] overflow-hidden shadow-panel aspect-[4/3]">
              <img src={media.owner} alt={site.owner.name} loading="lazy" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-night/75 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-white">
                <div className="font-display font-semibold text-xl md:text-2xl">{site.owner.name}</div>
                <div className="text-white/75 text-sm mt-1">{site.owner.role}</div>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <div className="lg:col-span-7">
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-night leading-[1.1]">
              Учёт ведёт не «компания». <br className="hidden md:block" />
              <span className="gold-text">Его ведут люди с именем</span>
            </h2>
            <p className="text-gray-600 text-lg mt-5 leading-relaxed">
              ТамгаБух — не колл-центр с анонимными «специалистами». За каждым клиентом закреплён бухгалтер, а за всем учётом — руководитель, который отвечает за результат своим именем и зарегистрированным товарным знаком.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {PRINCIPLES.map((p, i) => (
                <motion.div key={p.t} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl border border-gray-200 p-5">
                  <div className="font-display font-semibold text-night">{p.t}</div>
                  <p className="text-[13px] text-gray-500 mt-2 leading-relaxed">{p.d}</p>
                </motion.div>
              ))}
            </div>

            {/* Trademark */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mt-8 bg-night text-white rounded-[24px] p-5 md:p-6 flex flex-col sm:flex-row gap-5 items-center relative overflow-hidden">
              <div className="hidden md:block absolute -top-16 -right-16 w-48 h-48 bg-gold/25 rounded-full blur-3xl" />
              <button
                type="button"
                onClick={() => setLightbox(true)}
                className="relative shrink-0 w-[120px] rounded-xl overflow-hidden border border-white/15 shadow-lg group"
                aria-label="Открыть свидетельство на товарный знак"
              >
                <img src={media.trademarkThumb} alt="Свидетельство на товарный знак ТАМГАБУХ" loading="lazy" className="w-full h-auto group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute inset-0 bg-night/0 group-hover:bg-night/40 transition-colors flex items-center justify-center">
                  <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </button>
              <div className="relative flex-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-gold">
                  <Award className="w-4 h-4" /> Зарегистрированный товарный знак
                </div>
                <div className="font-display font-semibold text-xl mt-2">«{site.trademark.name}» — свидетельство № {site.trademark.number}</div>
                <p className="text-white/65 text-[13px] mt-2 leading-relaxed">
                  Зарегистрирован Роспатентом {site.trademark.registered} г., приоритет от {site.trademark.priority} г. Действует до {site.trademark.validUntil} г. Бренд защищён — это значит, что мы здесь надолго.
                </p>
                <button type="button" onClick={() => setLightbox(true)} className="mt-3 text-[13px] font-semibold text-gold hover:text-gold-light inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Посмотреть свидетельство
                </button>
              </div>
            </motion.div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => open({ source: 'about', topic: 'Личный вопрос руководителю', title: `Написать ${site.owner.name === 'Надвидов' ? 'руководителю' : site.owner.name}`, subtitle: 'Опишите ситуацию — отвечу лично в течение рабочего дня.', cta: 'Отправить' })}
                className="rounded-full bg-night text-white font-semibold px-6 py-3.5 hover:bg-night-3 transition-colors inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-gold" /> Написать руководителю
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.12 } }} className="fixed inset-0 z-[96] flex items-center justify-center p-3 sm:p-8" onClick={() => setLightbox(false)}>
            <div className="absolute inset-0 bg-night/85 backdrop-blur-sm" />
            <button type="button" aria-label="Закрыть" onClick={() => setLightbox(false)} className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white touch-manipulation">
              <X className="w-5 h-5" />
            </button>
            <motion.img
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0, transition: { duration: 0.12 } }}
              src={media.trademark}
              alt="Свидетельство на товарный знак ТАМГАБУХ № 1226547"
              className="relative max-h-full max-w-full rounded-lg shadow-panel object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
