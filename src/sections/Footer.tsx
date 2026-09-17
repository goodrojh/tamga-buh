import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react'
import { media } from '@/data/media'
import { site, waLink, tgLink } from '@/config/site'
import { useLead } from '@/components/LeadModal'
import { Logo } from '@/components/TamgaMark'

export default function Footer() {
  const { open } = useLead()
  return (
    <footer className="w-full pb-20 md:pb-0">
      <div className="m-2 rounded-[20px] overflow-hidden relative min-h-[720px] flex flex-col">
        <div className="absolute inset-0 z-0">
          <img src={media.steppe} alt="" loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-night/60 via-night/70 to-night" />
        </div>

        {/* CTA */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 md:px-20 pt-20 pb-10 text-center">
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }} className="font-display text-[36px] md:text-[72px] font-bold text-white leading-[1.02] tracking-[-0.02em]">
            Отдайте учёт. <br />
            <span className="gold-text">Оставьте себе бизнес.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="text-white/70 mt-5 max-w-lg text-base md:text-lg">
            Один звонок — и следующий отчёт сдаём уже мы. Первый месяц без предоплаты, цена фиксируется в договоре.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.25 }} className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button onClick={() => open({ source: 'footer', topic: 'Заявка из подвала сайта' })} className="rounded-full bg-gold text-night font-bold px-8 py-4 hover:bg-gold-light transition-all shadow-gold hover:scale-105 active:scale-95">
              Оставить заявку
            </button>
            <a href={site.phoneHref} className="rounded-full glass text-white font-semibold px-8 py-4 hover:bg-white/20 transition-all inline-flex items-center justify-center gap-2">
              <Phone className="w-4 h-4 text-gold" /> {site.phone}
            </a>
          </motion.div>
          <div className="mt-5 flex items-center gap-3">
            <a href={waLink()} target="_blank" rel="noopener" className="w-11 h-11 rounded-full bg-[#25D366] flex items-center justify-center hover:scale-110 transition-transform" aria-label="WhatsApp"><MessageCircle className="w-5 h-5 text-white" /></a>
            <a href={tgLink()} target="_blank" rel="noopener" className="w-11 h-11 rounded-full bg-[#2AABEE] flex items-center justify-center hover:scale-110 transition-transform" aria-label="Telegram"><Send className="w-5 h-5 text-white" /></a>
          </div>
        </div>

        {/* Footer bar */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} className="relative z-10 glass rounded-[24px] mx-3 md:mx-5 mb-3 md:mb-5 p-6 md:p-10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <Logo light />
              <p className="mt-3 text-white/55 text-[13px] leading-relaxed max-w-[260px]">
                Бухгалтерское сопровождение ИП и ООО по всей России. Регистрация бизнеса и юридический адрес в Республике Калмыкия.
              </p>
            </div>
            <div>
              <h4 className="text-white text-[13px] font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2">
                {[['Бухгалтерское сопровождение', '#services'], ['Учёт маркетплейсов', '#services'], ['Регистрация ИП и ООО', '#kalmykia'], ['Юридический адрес', '#kalmykia'], ['3-НДФЛ', '#services'], ['Калькулятор', '#calculator']].map(([l, h]) => (
                  <li key={l}><a href={h} className="text-white/60 text-[13px] hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white text-[13px] font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2.5 text-[13px] text-white/60">
                <li className="flex gap-2"><Phone className="w-4 h-4 text-gold shrink-0" /><a href={site.phoneHref} className="hover:text-white">{site.phone}</a></li>
                <li className="flex gap-2"><Mail className="w-4 h-4 text-gold shrink-0" /><a href={'mailto:' + site.email} className="hover:text-white">{site.email}</a></li>
                <li className="flex gap-2"><MapPin className="w-4 h-4 text-gold shrink-0" />{site.address}</li>
                <li className="flex gap-2"><Clock className="w-4 h-4 text-gold shrink-0" />{site.workHours}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-[13px] font-semibold mb-4">Реквизиты</h4>
              <ul className="space-y-2 text-[13px] text-white/60">
                <li>{site.requisites.name}</li>
                <li>ИНН {site.requisites.inn}</li>
                <li>ОГРН {site.requisites.ogrn}</li>
                <li><a id="policy" href="#policy" className="hover:text-white underline decoration-white/20">Политика конфиденциальности</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-6 pt-5 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 text-[12px] text-white/40">
            <span>© {new Date().getFullYear()} {site.brand}. Информация на сайте не является публичной офертой.</span>
            <span>Сделано с уважением к вашему времени</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
