import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Menu, X, ArrowDown } from 'lucide-react'
import { media } from '@/data/media'
import { site } from '@/config/site'
import { useLead } from '@/components/LeadModal'
import { Logo } from '@/components/TamgaMark'

const NAV = [
  { label: 'Услуги', href: '#services' },
  { label: 'Калмыкия 1 %', href: '#kalmykia' },
  { label: 'Цены', href: '#pricing' },
  { label: 'Калькулятор', href: '#calculator' },
  { label: 'Вопросы', href: '#faq' },
]

const PARTNERS = ['Wildberries', 'Ozon', 'Яндекс Маркет', '1С', 'СБИС', 'Контур', 'Т-Банк', 'Сбер Бизнес', 'Альфа-Банк', 'Точка', 'Модульбанк', 'ФНС', 'СФР', 'Честный знак']

const STATS = [
  { v: '1 %', l: 'ставка УСН в Калмыкии' },
  { v: '15 мин', l: 'среднее время ответа' },
  { v: '0 ₽', l: 'штрафов по нашей вине — платим сами' },
  { v: '100 %', l: 'удалённо, по всей России' },
]

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [menu, setMenu] = useState(false)
  const { open } = useLead()

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.75
  }, [])

  return (
    <section id="top" className="min-h-[100svh] flex flex-col bg-night relative w-full overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster={media.heroPoster}
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={media.heroVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-night/70 via-night/40 to-night z-[1]" />
      <div className="absolute inset-0 tamga-grid opacity-30 z-[1] pointer-events-none" />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-50 px-4 md:px-8 pt-4 md:pt-6 pb-2"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between p-[8px] md:p-[10px] rounded-full glass">
          <div className="flex-1 flex items-center pl-2 md:pl-3">
            <Logo light />
          </div>
          <div className="hidden lg:flex items-center gap-7">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-[15px] font-medium text-white/70 hover:text-white transition-colors relative group whitespace-nowrap">
                {n.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full" />
              </a>
            ))}
          </div>
          <div className="flex-1 flex items-center justify-end gap-2 md:gap-3">
            <a href={site.phoneHref} className="hidden md:inline-flex items-center gap-2 text-[15px] font-medium text-white/80 hover:text-white transition-colors px-3 py-2 whitespace-nowrap">
              <Phone className="w-4 h-4 text-gold" /> {site.phone}
            </a>
            <button
              onClick={() => open({ source: 'nav', topic: 'Обратный звонок' })}
              className="hidden sm:inline-flex rounded-full px-4 md:px-5 py-2.5 text-[14px] md:text-[15px] font-semibold bg-gold text-night hover:bg-gold-light transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              Заказать звонок
            </button>
            <button
              onClick={() => open({ source: 'nav', topic: 'Обратный звонок' })}
              aria-label="Заказать звонок"
              className="sm:hidden w-10 h-10 rounded-full bg-gold text-night flex items-center justify-center"
            >
              <Phone className="w-4 h-4" />
            </button>
            <button onClick={() => setMenu(!menu)} aria-label="Меню" className="lg:hidden w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center">
              {menu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {menu && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="lg:hidden max-w-6xl mx-auto mt-2 rounded-3xl glass p-4 flex flex-col">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setMenu(false)} className="px-4 py-3 text-white/85 font-medium rounded-2xl hover:bg-white/10">
                {n.label}
              </a>
            ))}
            <a href={site.phoneHref} className="px-4 py-3 text-gold font-semibold flex items-center gap-2">
              <Phone className="w-4 h-4" /> {site.phone}
            </a>
          </motion.div>
        )}
      </motion.nav>

      <div className="relative flex-1 flex flex-col items-center justify-center text-center px-5 pt-16 md:pt-24 pb-10 z-10">
        <div className="flex flex-col items-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-[13px] text-white/85 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            Бухгалтерия для ИП и ООО · Элиста → вся Россия
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="font-display font-semibold text-[34px] sm:text-5xl md:text-6xl lg:text-[64px] leading-[1.08] tracking-[-0.02em] text-white max-w-4xl mb-5"
          >
            Бухгалтерия, за которую
            <br />
            отвечаем <span className="gold-text italic">как за свою</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="text-base md:text-lg text-white/85 max-w-[560px] leading-relaxed mb-8"
          >
            Ведём учёт, сдаём отчёты, считаем налоги и разбираемся с маркетплейсами. Регистрируем бизнес в Калмыкии со ставкой УСН 1 % — и говорим честно, если вам это невыгодно.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
          >
            <button
              onClick={() => open({ source: 'hero', topic: 'Расчёт стоимости сопровождения', title: 'Назовём точную цену за 15 минут', subtitle: 'Бухгалтер задаст 3 вопроса о бизнесе и озвучит стоимость. Цена фиксируется в договоре.' })}
              className="w-full sm:w-auto rounded-full px-8 py-4 text-base font-bold bg-gold text-night hover:bg-gold-light transition-all shadow-gold hover:scale-105 active:scale-95"
            >
              Получить расчёт бесплатно
            </button>
            <a
              href="#calculator"
              className="w-full sm:w-auto rounded-full px-8 py-4 text-base font-semibold glass text-white hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              Посчитать самому <ArrowDown className="w-4 h-4" />
            </a>
          </motion.div>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-sm text-white/55 mt-4">
            Первая консультация — бесплатно · Без предоплаты за первый месяц
          </motion.span>

          {/* Stats */}
          <motion.div
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.5 } } }}
            initial="hidden"
            animate="show"
            className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-4xl"
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

      {/* Partners marquee */}
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
