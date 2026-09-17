import { motion } from 'framer-motion'
import { Calculator, ShoppingBag, Users, FileText, Rocket, XCircle, MapPin, Landmark, Receipt, MessageSquare, ArrowRight } from 'lucide-react'
import { oneTimeServices } from '@/data/pricing'
import { useLead } from '@/components/LeadModal'

const MAIN = [
  { icon: Calculator, title: 'Бухгалтерское сопровождение', desc: 'ИП и ООО на УСН, ПСН, АвтоУСН, ОСНО, УСН + НДС. Учёт, налоги, отчётность, ЕНС.', price: 'от 4 000 ₽/мес', href: '#calculator', topic: 'Бухгалтерское сопровождение' },
  { icon: ShoppingBag, title: 'Учёт маркетплейсов', desc: 'Wildberries, Ozon, Яндекс Маркет. Сверка отчётов, комиссии, возвраты, налог с правильной базы.', price: 'включено в тариф', topic: 'Учёт маркетплейсов' },
  { icon: Users, title: 'Кадры и зарплата', desc: 'Приём и увольнение, отпуска, больничные, 6-НДФЛ, РСВ, ЕФС-1, персучёт.', price: 'от 1 000 ₽/сотр.', topic: 'Кадровый учёт и зарплата' },
  { icon: FileText, title: 'Нулевая отчётность', desc: 'Для ИП и ООО без деятельности. Чтобы не блокировали счёт и не начисляли штрафы.', price: 'от 2 500 ₽/кв', topic: 'Нулевая отчётность' },
  { icon: Rocket, title: 'Регистрация ИП и ООО', desc: 'В Калмыкии или вашем регионе. Подбираем коды ОКВЭД и режим налога, подаём через ЭЦП без госпошлины.', price: 'ИП — бесплатно*', topic: 'Регистрация ИП / ООО' },
  { icon: XCircle, title: 'Ликвидация ИП и ООО', desc: 'Закрываем без долгов и «хвостов»: финальная отчётность, расчёты с фондами, снятие с учёта.', price: 'от 3 000 ₽', topic: 'Ликвидация ИП / ООО' },
  { icon: MapPin, title: 'Юридический адрес в Калмыкии', desc: 'Реальный офис в Элисте, приём корреспонденции, гарантийное письмо. Для регистрации со ставкой УСН 1 %.', price: 'от 5 000 ₽/мес', topic: 'Юридический адрес в Калмыкии' },
  { icon: Landmark, title: 'Открытие расчётного счёта', desc: 'Подбираем банк под обороты и маркетплейсы, готовим документы, сопровождаем открытие.', price: 'бесплатно', topic: 'Открытие расчётного счёта' },
  { icon: Receipt, title: '3-НДФЛ для физлиц', desc: 'Вычеты за жильё, лечение, обучение, ИИС, продажа имущества, доходы из-за рубежа.', price: 'от 1 500 ₽', topic: 'Декларация 3-НДФЛ' },
  { icon: MessageSquare, title: 'Консультация главбуха', desc: 'Разбор конкретной ситуации: требование ФНС, выбор режима, переезд в Калмыкию, НДС на УСН.', price: 'первые 15 мин — бесплатно', topic: 'Консультация главного бухгалтера' },
]

export default function Services() {
  const { open } = useLead()
  return (
    <section id="services" className="bg-sand py-20 md:py-28 px-4 md:px-6 relative overflow-hidden">
      <div className="absolute inset-0 tamga-grid opacity-60 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-night leading-[1.1]">Всё, что нужно бизнесу — в одном окне</h2>
          <p className="text-gray-500 mt-4 text-lg">Не отправляем «к юристам» и «в банк». Регистрируем, открываем счёт, ведём учёт и, если понадобится, закрываем — одна команда от начала до конца.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {MAIN.map(({ icon: Icon, title, desc, price, topic, href }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-[24px] border border-gray-200 p-6 flex flex-col hover:shadow-[0_20px_50px_-20px_rgba(10,26,51,0.25)] transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-night/5 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-night" />
                </div>
                <span className="text-[12px] font-bold text-gold-dark bg-gold/10 px-3 py-1.5 rounded-full">{price}</span>
              </div>
              <h3 className="font-display text-[17px] font-semibold text-night mt-5 leading-snug">{title}</h3>
              <p className="text-[14px] text-gray-500 leading-relaxed mt-2 flex-1">{desc}</p>
              <div className="mt-5 flex items-center gap-4">
                <button
                  onClick={() => open({ source: 'services', topic, title: title, subtitle: 'Расскажите пару слов о задаче — бухгалтер перезвонит и назовёт цену и сроки.' })}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-night hover:gap-2.5 transition-all"
                >
                  Заказать <ArrowRight className="w-4 h-4 text-gold-dark" />
                </button>
                {href && (
                  <a href={href} className="text-sm text-gray-400 hover:text-night">
                    Рассчитать
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-[12px] text-gray-400 mt-6">* Регистрация ИП бесплатна при заключении договора на сопровождение. Цены разовых услуг — ориентировочные, точную назовём после уточнения задачи.</p>

        {/* compact price list */}
        <div className="mt-12 bg-night rounded-[28px] p-6 md:p-10 text-white relative overflow-hidden">
          <div className="hidden md:block absolute -top-20 -right-20 w-72 h-72 bg-gold/20 rounded-full blur-3xl" />
          <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-14">
            <div className="lg:w-1/3">
              <h3 className="font-display text-2xl md:text-3xl font-semibold leading-tight">Разовые услуги <span className="gold-text">без скрытых доплат</span></h3>
              <p className="text-white/65 mt-3 leading-relaxed">Цена фиксируется до начала работы. Если задача окажется сложнее — предупредим заранее, а не в счёте.</p>
              <button onClick={() => open({ source: 'services-list', topic: 'Разовая услуга', title: 'Подберём услугу под задачу' })} className="mt-6 rounded-full bg-gold text-night font-bold px-6 py-3 hover:bg-gold-light transition-colors">
                Получить прайс
              </button>
            </div>
            <ul className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              {oneTimeServices.map((s) => (
                <li key={s.id} className="flex items-baseline justify-between gap-4 py-3 border-b border-white/10">
                  <div>
                    <div className="text-[15px] font-semibold">{s.name}</div>
                    <div className="text-[12px] text-white/50">{s.sub}</div>
                  </div>
                  <span className="text-gold font-bold whitespace-nowrap text-[15px]">{s.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
