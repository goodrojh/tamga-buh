import { motion } from 'framer-motion'
import { ShoppingCart, Briefcase, Building2, User, ArrowUpRight } from 'lucide-react'
import { useLead } from '@/components/LeadModal'

const ITEMS = [
  {
    icon: ShoppingCart,
    title: 'Селлерам на Wildberries, Ozon, Яндекс',
    pains: ['Отчёты маркетплейса не сходятся с выпиской', 'Не понятно, с какой суммы платить налог', 'Боюсь превысить лимит УСН и попасть на НДС'],
    promise: 'Сверяем каждый еженедельный отчёт, считаем налог с правильной базы, заранее предупреждаем о лимитах.',
    topic: 'Учёт маркетплейсов',
  },
  {
    icon: Briefcase,
    title: 'ИП на УСН, патенте, АвтоУСН',
    pains: ['Уведомления по ЕНП путают', 'Забыл про взносы — набежали пени', 'Не знаю, выгоден ли патент'],
    promise: 'Берём на себя ЕНС, взносы, уведомления. Раз в год пересчитываем, какой режим дешевле.',
    topic: 'Сопровождение ИП',
  },
  {
    icon: Building2,
    title: 'ООО с сотрудниками и НДС',
    pains: ['Зарплата, 6-НДФЛ, РСВ, ЕФС-1 — каждый месяц новая форма', 'Требования из ФНС приходят внезапно', 'Штатный бухгалтер стоит 80 000+ ₽'],
    promise: 'Полный учёт, кадры и зарплата, ответы на требования ФНС — за 15–35 тыс. ₽ в месяц вместо штатной ставки.',
    topic: 'Сопровождение ООО',
  },
  {
    icon: User,
    title: 'Физлицам — 3-НДФЛ',
    pains: ['Вычет за квартиру, лечение, обучение, ИИС', 'Продал машину или квартиру — надо отчитаться', 'Доход из-за рубежа или от аренды'],
    promise: 'Заполняем и подаём декларацию через ваш личный кабинет за 1 день. Возвращаем деньги, а не нервы.',
    topic: 'Декларация 3-НДФЛ',
  },
]

export default function Audience() {
  const { open } = useLead()
  return (
    <section id="audience" className="bg-white py-20 md:py-28 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-night leading-[1.1]">
              Мы знаем, что у вас болит. <br className="hidden md:block" />
              Потому что уже лечили это
            </h2>
          </div>
          <p className="text-gray-500 max-w-sm">Четыре типа клиентов, четыре набора проблем. Найдите себя — и посмотрите, что мы с этим делаем.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ITEMS.map(({ icon: Icon, title, pains, promise, topic }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative flex flex-col rounded-[28px] border border-gray-200 bg-sand/50 hover:bg-night hover:border-night p-6 md:p-8 transition-colors duration-300 overflow-hidden"
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-gold/10 group-hover:bg-gold/20 blur-2xl transition-colors" />
              <div className="flex items-start justify-between gap-4">
                <div className="w-12 h-12 rounded-2xl bg-night group-hover:bg-gold flex items-center justify-center transition-colors">
                  <Icon className="w-6 h-6 text-gold group-hover:text-night transition-colors" />
                </div>
                <button
                  onClick={() => open({ source: 'audience', topic })}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-night group-hover:text-gold transition-colors"
                >
                  Обсудить <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-semibold text-night group-hover:text-white mt-5 transition-colors">{title}</h3>
              <ul className="mt-4 space-y-2">
                {pains.map((p) => (
                  <li key={p} className="flex gap-2.5 text-[15px] text-gray-600 group-hover:text-white/70 transition-colors">
                    <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-5"><div className="rounded-2xl bg-white group-hover:bg-white/10 border border-gray-100 group-hover:border-white/10 p-4 text-[15px] text-night group-hover:text-white leading-relaxed transition-colors">
                <span className="font-bold text-gold-dark group-hover:text-gold">Что делаем: </span>
                {promise}
              </div></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
