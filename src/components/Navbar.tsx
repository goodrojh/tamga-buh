import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Menu, X } from 'lucide-react'
import { site } from '@/config/site'
import { useLead } from './LeadModal'
import { Logo } from './TamgaMark'

const NAV = [
  { label: 'Услуги', href: '#services' },
  { label: 'Калмыкия 1 %', href: '#kalmykia' },
  { label: 'Цены', href: '#pricing' },
  { label: 'Калькулятор', href: '#calculator' },
  { label: 'Вопросы', href: '#faq' },
]

/** Фиксированное меню: всегда доступно при скролле, ширина совпадает с контентом секций (max-w-7xl). */
export default function Navbar() {
  const [menu, setMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { open } = useLead()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menu) return
    const close = () => setMenu(false)
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [menu])

  return (
    <header className="fixed top-0 inset-x-0 z-[80] px-4 md:px-6 pt-3 md:pt-4 pointer-events-none">
      <div className="max-w-7xl mx-auto pointer-events-auto">
        <div
          className={
            'flex items-center justify-between p-[8px] md:p-[10px] rounded-full border transition-colors duration-300 ' +
            (scrolled ? 'bg-night/85 backdrop-blur-xl border-white/10 shadow-panel' : 'bg-white/5 backdrop-blur-xl border-white/10')
          }
        >
          <div className="flex-1 flex items-center pl-2 md:pl-3">
            <Logo light />
          </div>
          <nav className="hidden lg:flex items-center gap-7" aria-label="Основное меню">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-[15px] font-medium text-white/75 hover:text-white transition-colors relative group whitespace-nowrap">
                {n.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>
          <div className="flex-1 flex items-center justify-end gap-2 md:gap-3">
            <a href={site.phoneHref} className="hidden md:inline-flex items-center gap-2 text-[15px] font-medium text-white/85 hover:text-white transition-colors px-3 py-2 whitespace-nowrap">
              <Phone className="w-4 h-4 text-gold" /> {site.phone}
            </a>
            <button
              type="button"
              onClick={() => open({ source: 'nav', topic: 'Обратный звонок' })}
              className="hidden sm:inline-flex rounded-full px-4 md:px-5 py-2.5 text-[14px] md:text-[15px] font-semibold bg-gold text-night hover:bg-gold-light transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              Заказать звонок
            </button>
            <button
              type="button"
              onClick={() => open({ source: 'nav', topic: 'Обратный звонок' })}
              aria-label="Заказать звонок"
              className="sm:hidden w-10 h-10 rounded-full bg-gold text-night flex items-center justify-center"
            >
              <Phone className="w-4 h-4" />
            </button>
            <button type="button" onClick={() => setMenu(!menu)} aria-label="Меню" aria-expanded={menu} className="lg:hidden w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center">
              {menu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menu && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mt-2 rounded-3xl bg-night/95 backdrop-blur-xl border border-white/10 p-3 flex flex-col shadow-panel"
            >
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
        </AnimatePresence>
      </div>
    </header>
  )
}
