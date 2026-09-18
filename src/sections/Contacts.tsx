import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Star, Navigation, MessageCircle, Send } from 'lucide-react'
import { site, waLink, tgLink } from '@/config/site'
import { useLead } from '@/components/LeadModal'
import { MaxIcon } from '@/components/MaxIcon'

export default function Contacts() {
  const { open } = useLead()
  const mapSrc = `https://yandex.ru/map-widget/v1/?ol=biz&oid=${site.map.yandexOrgId}&z=16&ll=${site.map.lon}%2C${site.map.lat}`

  return (
    <section id="contacts" className="bg-white py-20 md:py-28 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-night leading-[1.1]">Мы в Элисте — приходите или звоните</h2>
          <p className="text-gray-500 mt-4 text-lg">Реальный офис, куда можно приехать с документами. А если вы в другом городе — всё то же самое делаем удалённо.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 lg:gap-6">
          {/* Map */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-3 rounded-[28px] overflow-hidden border border-gray-200 shadow-panel bg-sand min-h-[360px] relative">
            <iframe
              src={mapSrc}
              title="ТамгаБух на карте"
              className="absolute inset-0 w-full h-full"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="lg:col-span-2 bg-night text-white rounded-[28px] p-6 md:p-8 relative overflow-hidden flex flex-col">
            <div className="hidden md:block absolute -top-16 -right-16 w-56 h-56 bg-gold/25 rounded-full blur-3xl" />
            <div className="relative space-y-5 flex-1">
              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-2xl bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <div className="text-[12px] uppercase tracking-[0.15em] text-white/50">Адрес</div>
                  <div className="font-semibold mt-1 leading-snug">{site.address}</div>
                  <a href={site.map.routeUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 text-[13px] text-gold hover:text-gold-light mt-1.5">
                    <Navigation className="w-3.5 h-3.5" /> Построить маршрут
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-2xl bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <div className="text-[12px] uppercase tracking-[0.15em] text-white/50">Часы работы</div>
                  <div className="font-semibold mt-1">{site.workHours}</div>
                  <div className="text-[13px] text-white/55 mt-0.5">В мессенджерах отвечаем и в выходные</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-2xl bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <div className="text-[12px] uppercase tracking-[0.15em] text-white/50">Телефон</div>
                  <a href={site.phoneHref} className="font-display font-semibold text-xl mt-1 block hover:text-gold transition-colors">{site.phone}</a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-2xl bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <div className="text-[12px] uppercase tracking-[0.15em] text-white/50">E-mail</div>
                  <a href={'mailto:' + site.email} className="font-semibold mt-1 block hover:text-gold transition-colors break-all">{site.email}</a>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <a href={waLink()} target="_blank" rel="noopener" aria-label="WhatsApp" className="w-11 h-11 rounded-full bg-[#25D366] flex items-center justify-center hover:scale-110 transition-transform"><MessageCircle className="w-5 h-5 text-white" /></a>
                <a href={tgLink()} target="_blank" rel="noopener" aria-label="Telegram" className="w-11 h-11 rounded-full bg-[#2AABEE] flex items-center justify-center hover:scale-110 transition-transform"><Send className="w-5 h-5 text-white" /></a>
                <a href={site.max} target="_blank" rel="noopener" aria-label="MAX" className="w-11 h-11 rounded-full bg-[#5B4BFF] flex items-center justify-center hover:scale-110 transition-transform"><MaxIcon className="w-5 h-5 text-white" /></a>
                <a href={site.map.reviewsUrl} target="_blank" rel="noopener" className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 px-3 py-2 text-[13px] font-semibold hover:bg-white/20 transition-colors">
                  <Star className="w-4 h-4 text-gold fill-gold" /> {site.map.rating} на Яндекс Картах
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={() => open({ source: 'contacts', topic: 'Записаться на встречу в офисе', title: 'Записаться на встречу', subtitle: 'Подберём время, чтобы вас никто не ждал: приезжайте с документами или просто познакомиться.' })}
              className="relative mt-6 w-full rounded-full bg-gold text-night font-bold py-3.5 px-6 hover:bg-gold-light transition-colors"
            >
              Записаться на встречу
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
