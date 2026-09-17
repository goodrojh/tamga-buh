import { motion } from 'framer-motion'
import { ShieldCheck, Clock, Eye, MessageCircle } from 'lucide-react'
import { media } from '@/data/media'
import { site } from '@/config/site'
import { useLead } from '@/components/LeadModal'
import { TamgaMark } from '@/components/TamgaMark'

const VOWS = [
  { icon: ShieldCheck, t: 'Ошиблись мы — платим мы', d: 'Штрафы и пени по нашей вине компенсируем полностью. Это пункт договора, а не обещание на сайте.' },
  { icon: Clock, t: 'Ответ за 15 минут в рабочее время', d: 'Вопрос в чат — ответ бухгалтера, а не «ваш запрос зарегистрирован». Срочное — звоним сами.' },
  { icon: Eye, t: 'Вы видите всё', d: 'Доступ к базе, квитанции о приёме каждого отчёта, сверка с ФНС раз в квартал — по умолчанию.' },
]

export default function Tamga() {
  const { open } = useLead()
  return (
    <section id="tamga" className="bg-white py-20 md:py-28 px-4 md:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
          <div className="hidden md:block absolute -inset-6 bg-gold/15 blur-3xl rounded-full" />
          <div className="relative rounded-[32px] overflow-hidden shadow-panel aspect-[4/3] bg-night">
            <video autoPlay muted loop playsInline poster={media.desk} className="w-full h-full object-cover">
              <source src={media.sealVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-gold/20 border border-gold/40 flex items-center justify-center">
                  <TamgaMark className="w-6 h-6 text-gold" />
                </span>
                <span className="text-[12px] uppercase tracking-[0.2em] text-white/70">Что такое тамга</span>
              </div>
              <p className="mt-3 text-[15px] md:text-base text-white/85 leading-relaxed max-w-md">
                У калмыков тамга — родовой знак, которым метили то, за что отвечают головой. Мы ставим свою тамгу на ваш учёт.
              </p>
            </div>
          </div>
        </motion.div>

        <div>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-night leading-[1.1]">
            Три обещания, <br />
            <span className="gold-text">за которые отвечаем</span>
          </h2>
          <div className="mt-8 space-y-4">
            {VOWS.map(({ icon: Icon, t, d }, i) => (
              <motion.div key={t} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex gap-4 rounded-2xl border border-gray-200 p-5 hover:border-gold/50 hover:shadow-[0_10px_40px_-15px_rgba(217,169,59,0.4)] transition-all">
                <div className="w-11 h-11 rounded-xl bg-night flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <div className="font-display font-semibold text-night">{t}</div>
                  <p className="text-[14px] text-gray-500 mt-1 leading-relaxed">{d}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Expert card */}
          <div className="mt-8 rounded-[24px] bg-sand border border-gray-200 p-4 flex flex-col sm:flex-row gap-4 items-center">
            <img src={media.ownerSquare} alt={site.owner.name} loading="lazy" className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shrink-0" />
            <div className="flex-1 text-center sm:text-left">
              <div className="text-[12px] uppercase tracking-[0.15em] text-gray-400">{site.owner.role}</div>
              <div className="font-display font-semibold text-lg text-night mt-1">{site.owner.shortName} ответит на сложный вопрос лично</div>
              <p className="text-[13px] text-gray-500 mt-1">Требование ФНС, переезд в Калмыкию, НДС на УСН, спор с маркетплейсом — первые 15 минут бесплатно.</p>
            </div>
            <button onClick={() => open({ source: 'expert', topic: 'Вопрос руководителю', title: 'Вопрос руководителю', subtitle: 'Опишите ситуацию — перезвоним в течение рабочего дня.', cta: 'Задать вопрос' })} className="rounded-full bg-night text-white font-semibold px-5 py-3 inline-flex items-center gap-2 hover:bg-night-3 transition-colors whitespace-nowrap">
              <MessageCircle className="w-4 h-4 text-gold" /> Задать вопрос
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
