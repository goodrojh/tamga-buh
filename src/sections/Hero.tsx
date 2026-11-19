import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { media } from '@/data/media'
import { LeadForm } from '@/components/LeadModal'

const PARTNERS = ['Wildberries', 'Ozon', 'Яндекс Маркет', '1С', 'СБИС', 'Контур', 'Т-Банк', 'Сбер Бизнес', 'Альфа-Банк', 'Точка', 'Модульбанк', 'ФНС', 'СФР', 'Честный знак']

const STATS = [
  { v: 'ИП и ООО', l: 'с сотрудниками' },
  { v: '15 мин', l: 'среднее время ответа' },
  { v: '0 ₽', l: 'штрафов по нашей вине — платим сами' },
  { v: '100 %', l: 'удалённо, по всей России' },
]

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.playbackRate = 0.85
    // На случай, если браузер заблокировал автозапуск — пробуем ещё раз после загрузки метаданных
    const tryPlay = () => { if (v.paused) v.play().catch(() => {}) }
    v.addEventListener('loadedmetadata', tryPlay)
    v.addEventListener('canplay', tryPlay)
    // Некоторые мобильные браузеры разрешают воспроизведение только после первого касания
    window.addEventListener('touchstart', tryPlay, { once: true, passive: true })
    window.addEventListener('scroll', tryPlay, { once: true, passive: true })
    return () => {
      v.removeEventListener('loadedmetadata', tryPlay)
      v.removeEventListener('canplay', tryPlay)
      window.removeEventListener('touchstart', tryPlay)
      window.removeEventListener('scroll', tryPlay)
    }
  }, [])

  return (
    <section id="top" className="min-h-[100svh] flex flex-col bg-night relative w-full overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={media.heroPoster}
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={media.heroVideoMobile} type="video/mp4" media="(max-width: 767px)" />
        <source src={media.heroVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-night/75 via-night/35 to-night z-[1]" />

      <div className="relative flex-1 flex flex-col items-center justify-center text-center px-5 pt-[104px] md:pt-[120px] pb-10 z-10">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:gap-12 xl:gap-16">
            <div className="min-w-0 text-center lg:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                className="font-display font-semibold text-[34px] sm:text-5xl md:text-5xl lg:text-[46px] xl:text-[56px] leading-[1.08] tracking-[-0.02em] text-white max-w-4xl mb-5"
              >
                Бухгалтерия на аутсорсе для <span className="gold-text inline-block pr-[0.1em]">ИП и ООО</span> с сотрудниками
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                className="text-base md:text-lg text-white/85 mx-auto max-w-[560px] leading-relaxed mb-6 lg:mx-0"
              >
                Ведём учёт каждый месяц, рассчитываем зарплату и налоги, оформляем кадровые документы и сдаём отчётность. Работаем удалённо по всей России.
              </motion.p>

              <a href="#services" className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-gold">
                Что входит в сопровождение <ArrowDown className="h-4 w-4" />
              </a>
              <p className="mt-4 text-sm text-white/70">
                Первая консультация — бесплатно · Без предоплаты за первый месяц
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className="mx-auto w-full max-w-xl lg:max-w-none"
            >
              <LeadForm compact opts={{
                source: 'hero',
                topic: 'Расчёт стоимости сопровождения',
                cta: 'Оставить заявку',
              }} />
            </motion.div>
          </div>

          <motion.div
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.5 } } }}
            initial="hidden"
            animate="show"
            className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 w-full"
          >
            {STATS.map((s) => (
              <motion.div key={s.l} variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} className="glass rounded-2xl px-4 py-4 text-left">
                <div className="font-display font-bold text-2xl md:text-3xl text-gold">{s.v}</div>
                <div className="text-[12px] md:text-[13px] text-white/65 mt-1 leading-snug">{s.l}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 pb-6 overflow-hidden">
        <p className="text-center text-[11px] uppercase tracking-[0.2em] text-white/40 mb-3">Работаем с</p>
        <div className="flex whitespace-nowrap marquee w-max">
          {[...PARTNERS, ...PARTNERS].map((p, i) => (
            <span key={i} className="mx-3 md:mx-4 px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm font-semibold">
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
