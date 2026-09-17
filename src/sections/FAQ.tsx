import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, X, Briefcase, MapPin, CreditCard } from 'lucide-react'
import { useLead } from '@/components/LeadModal'
import { media } from '@/data/media'

interface FAQItem { question: string; answer: string }

const faqData: Record<string, FAQItem[]> = {
  services: [
    { question: 'Вы работаете только с Калмыкией?', answer: 'Нет. Мы находимся в Элисте, но ведём клиентов по всей России — учёт полностью удалённый: документы фото в чат, отчётность через ЭЦП, доступ к базе онлайн. Калмыкия — это наше преимущество для тех, кому нужны льготные ставки и юрадрес.' },
    { question: 'Как передать документы?', answer: 'Фото или скан в WhatsApp/Telegram, выписки подключаем напрямую из банка, отчёты маркетплейсов забираем из кабинета по доступу. Ничего возить и распечатывать не нужно.' },
    { question: 'Что входит в учёт маркетплейсов?', answer: 'Сверяем еженедельные отчёты Wildberries, Ozon, Яндекс Маркета с поступлениями на счёт, учитываем комиссии, логистику, возвраты и удержания, считаем налог с правильной базы и следим за лимитами УСН и порогом НДС.' },
    { question: 'У меня уже есть бухгалтер, как перейти?', answer: 'Забираем базу и документы сами, проводим экспресс-аудит за последний год (бесплатно), исправляем найденное и подключаемся с ближайшего месяца. Переход занимает 1–3 дня.' },
    { question: 'Что если вы ошибётесь?', answer: 'Штрафы и пени по нашей вине компенсируем полностью — это условие договора. За всю историю таких случаев единицы, потому что каждый отчёт перед отправкой проверяет второй бухгалтер.' },
    { question: 'Кто будет вести мой учёт?', answer: 'Персональный бухгалтер, закреплённый за вами. Он знает ваш бизнес, отвечает в чате и звонит сам, если что-то важное. Сложные вопросы разбирает главный бухгалтер.' },
  ],
  kalmykia: [
    { question: 'Какие ставки УСН в Калмыкии?', answer: '1 % для объекта «доходы» и 5 % для «доходы минус расходы» — вместо стандартных 6 % и 15 %. Льгота действует для ИП и ООО, зарегистрированных в республике, без ограничений по виду деятельности.' },
    { question: 'Я уже ИП в другом регионе. Могу переехать и платить 1 %?', answer: 'С 2025 года действует правило: при переезде в регион с более низкой ставкой прежняя ставка сохраняется ещё 3 года. Поэтому «переезд ради 1 %» в лоб не работает. Но есть законные варианты — например, регистрация нового бизнеса. Разберём ваш случай честно и бесплатно.' },
    { question: 'Что такое юридический адрес и зачем он нужен?', answer: 'Для регистрации ООО нужен адрес в регионе, а ИП регистрируется по прописке. Мы предоставляем реальный офис в Элисте с приёмом корреспонденции и гарантийным письмом для ФНС. Это не «массовый адрес» — проверки проходит.' },
    { question: 'Это законно и не вызовет вопросов у ФНС?', answer: 'Льготные ставки установлены региональным законом и применяются открыто. Вопросы у ФНС возникают при фиктивной прописке без реальной связи с регионом. Мы объясним, какие условия нужно соблюсти, и не возьмёмся, если это невозможно.' },
    { question: 'Сколько занимает регистрация?', answer: 'ИП — 3 рабочих дня после подачи, ООО — 3–5. Документы подаём через ЭЦП, госпошлина в этом случае не платится. Расчётный счёт открываем параллельно.' },
  ],
  payments: [
    { question: 'Как формируется цена?', answer: 'По прайсу: форма бизнеса, режим налога, объект, число сотрудников и магазинов на маркетплейсах. Калькулятор на сайте считает по той же таблице. Цена фиксируется в договоре на 12 месяцев.' },
    { question: 'Есть ли предоплата?', answer: 'Первый месяц — без предоплаты: подключаемся, ведём, а оплату выставляем по итогу. Дальше — ежемесячно, по счёту, безналом с любого расчётного счёта.' },
    { question: 'Что если бизнес не работал в этом месяце?', answer: 'Для периодов без деятельности есть тариф «нулевая отчётность» — от 2 500 ₽ за квартал. Переключим автоматически, доплачивать за простой не нужно.' },
    { question: 'Можно ли расторгнуть договор?', answer: 'Да, в любой момент с уведомлением за 30 дней. Передаём базу, документы и доступы в полном объёме, без «выкупа» и скрытых условий.' },
    { question: 'Работаете ли вы с НДС и ОСНО?', answer: 'Да: ООО и ИП на ОСНО, а также УСН с НДС 5 %, 7 % и 20 %. Для НДС 20 % с вычетами цена уточняется после разбора оборотов — в калькуляторе это указано.' },
  ],
}

export default function FAQ() {
  const { open } = useLead()
  const [activeTab, setActiveTab] = useState('services')
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const tabs = [
    { id: 'services', label: 'Услуги', icon: <Briefcase size={16} /> },
    { id: 'kalmykia', label: 'Калмыкия и налоги', icon: <MapPin size={16} /> },
    { id: 'payments', label: 'Оплата и договор', icon: <CreditCard size={16} /> },
  ]

  return (
    <section id="faq" className="bg-white py-20 md:py-28 px-4 md:px-6">
      <div className="max-w-[820px] mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-gold-dark">Вопросы</span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-night leading-tight mt-4 mb-3">Спрашивают перед тем, как позвонить</h2>
          <p className="text-gray-500">Если вашего вопроса нет — задайте его нам, ответим за 15 минут.</p>
        </div>

        <div className="flex justify-start sm:justify-center gap-2 border-b border-gray-100 mb-6 overflow-x-auto no-scrollbar -mx-4 px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setOpenIndex(0) }}
              className={'inline-flex items-center gap-2 px-4 py-3 text-[15px] transition-all border-b-2 whitespace-nowrap ' + (activeTab === tab.id ? 'text-gold-dark font-semibold border-gold' : 'text-gray-500 font-medium border-transparent')}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div>
          {faqData[activeTab].map((item, index) => (
            <div key={item.question} className="border-b border-gray-100 py-5">
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full flex justify-between items-center gap-4 text-left">
                <span className="text-[16px] font-semibold text-night">{item.question}</span>
                <span className="text-gray-400 shrink-0">{openIndex === index ? <X size={20} strokeWidth={1.5} /> : <Plus size={20} strokeWidth={1.5} />}</span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div key="a" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeOut' }} className="overflow-hidden">
                    <div className="pt-3 pb-1 text-[15px] text-gray-600 leading-[1.7]">{item.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-sand rounded-[20px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img src={media.portrait} alt="" className="w-12 h-12 rounded-full object-cover object-top border-2 border-white shadow" />
            <div>
              <p className="font-semibold text-[15px] text-night">Остались вопросы?</p>
              <p className="text-[14px] text-gray-500">Бухгалтер ответит лично, без скриптов</p>
            </div>
          </div>
          <button onClick={() => open({ source: 'faq', topic: 'Вопрос бухгалтеру', title: 'Задайте вопрос', subtitle: 'Напишите вопрос в комментарии — ответим звонком или сообщением, как удобнее.', cta: 'Отправить вопрос' })} className="relative group bg-night text-white rounded-2xl px-6 py-3.5 text-[15px] font-semibold hover:bg-night-3 transition-all flex items-center gap-3">
            Задать вопрос
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
              <path d="M7 7v6a2 2 0 0 0 2 2h9" />
              <path d="m15 11 4 4-4 4" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
