import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { packages, fmt } from '@/data/pricing'
import { media } from '@/data/media'
import { useLead } from '@/components/LeadModal'

function DotGridIcon() {
  return (
    <div className="grid grid-cols-2 gap-1">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="w-1 h-1 rounded-full bg-white" />
      ))}
    </div>
  )
}

export default function Pricing() {
  const { open } = useLead()
  return (
    <section id="pricing" className="w-full px-0 py-20 md:py-28 bg-sand overflow-hidden relative">
      <div className="text-center px-6 mb-10 relative z-10">
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-gold-dark">Тарифы</span>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="font-display font-semibold text-3xl md:text-[48px] text-night leading-[1.06] tracking-tight mt-4">
          Понятные цены. Без «от».
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }} className="mt-4 text-base text-gray-500 max-w-xl mx-auto">
          Три самых частых конфигурации. Ваша отличается? Ниже калькулятор считает по нашему полному прайсу — той же таблице, по которой считаем мы.
        </motion.p>
      </div>

      <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }} className="mx-4 md:mx-10 lg:mx-auto max-w-[1440px] relative rounded-[20px] shadow-panel overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={media.night} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-night/40" />
        </div>

        <div className="relative z-10 bg-white/85 backdrop-blur-xl m-3 md:m-[40px] rounded-[12px] overflow-hidden border border-white/40">
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-night/10">
            {packages.map((plan, idx) => (
              <motion.div key={plan.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.25 + idx * 0.1 }} className={'flex flex-col px-6 md:px-8 py-8 md:py-10 ' + (plan.popular ? 'bg-gold/10' : '')}>
                <div className="pb-8 border-b border-night/10">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-display font-bold text-2xl text-night">{plan.name}</h3>
                    {plan.popular && <span className="inline-flex items-center px-3 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase bg-night text-gold rounded-full">Популярный</span>}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{plan.tagline}</p>
                  <div className="mt-8 flex items-baseline gap-1">
                    <span className="font-display font-bold text-4xl md:text-5xl text-night leading-none">{fmt(plan.price)} ₽</span>
                    <span className="text-xs font-medium tracking-[0.1em] uppercase text-gray-500 ml-1">/мес</span>
                  </div>
                  <button
                    onClick={() => open({ source: 'pricing-' + plan.id, topic: `Тариф «${plan.name}» — ${fmt(plan.price)} ₽/мес`, title: `Зафиксировать тариф «${plan.name}»`, subtitle: 'Цена из прайса фиксируется в договоре на 12 месяцев. Уточним детали и подключим за день.' })}
                    className="mt-6 w-full flex items-center justify-between rounded-full bg-night text-white p-1.5 group transition-colors hover:bg-night-3"
                  >
                    <span className="flex-1 px-5 py-3 text-sm font-medium text-left">Подключить</span>
                    <span className="w-10 h-10 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
                      <DotGridIcon />
                    </span>
                  </button>
                </div>
                <div className="pt-8 flex flex-col gap-3">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-sm bg-gold/15 border border-gold/40 flex items-center justify-center flex-shrink-0">
                        <Check className="h-2.5 w-2.5 text-gold-dark stroke-[2.5]" />
                      </div>
                      <span className="text-[12px] font-medium tracking-[0.04em] uppercase text-night">{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="px-6 md:px-8 py-4 border-t border-night/10 text-[12px] text-gray-500 text-center">
            В каждый тариф входят: ЕНС и уведомления · ответы на требования ФНС · налоговый календарь · чат с бухгалтером · страховка от штрафов по нашей вине
          </div>
        </div>
      </motion.div>
    </section>
  )
}
