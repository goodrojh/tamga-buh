import { Calculator, Users, FileCheck2 } from 'lucide-react'
import { useLead } from '@/components/LeadModal'

const scope = [
  {
    icon: Calculator,
    title: 'Бухгалтерия и налоги',
    items: [
      'Отражаем операции по банку, продажам и закупкам.',
      'Проверяем первичные документы и сообщаем, каких не хватает.',
      'Рассчитываем налоги и заранее сообщаем суммы и сроки уплаты.',
    ],
  },
  {
    icon: Users,
    title: 'Зарплата и кадры',
    items: [
      'Рассчитываем зарплату, отпускные и выплаты при увольнении.',
      'Учитываем больничные, рассчитываем НДФЛ и взносы.',
      'Готовим кадровые документы по приёму, отпуску и увольнению.',
    ],
  },
  {
    icon: FileCheck2,
    title: 'Отчётность и запросы ФНС',
    items: [
      'Следим за сроками и сдаём отчётность по бизнесу и сотрудникам.',
      'Передаём квитанции о приёме отчётности.',
      'Разбираем запросы ФНС и согласуем, какие документы нужны для ответа.',
    ],
  },
]

export default function Services() {
  const { open } = useLead()

  return (
    <section id="services" className="bg-sand px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <h2 className="font-display text-3xl font-semibold leading-tight text-night md:text-5xl">
            Что входит в сопровождение
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">
            Ведём бухгалтерию ИП и ООО с сотрудниками на постоянной основе. Объём работы согласуем перед подписанием договора.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {scope.map(({ icon: Icon, title, items }) => (
            <article key={title} className="rounded-[28px] border border-gray-200 bg-white p-6 md:p-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-sand text-night">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="font-display text-lg font-semibold text-night">{title}</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-600 marker:text-gold-dark md:text-base">
                {items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 md:gap-6">
          <div className="rounded-[28px] border border-gray-200 bg-white p-6 md:p-8">
            <h3 className="font-display text-lg font-semibold text-night">Что понадобится от вас</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 md:text-base">
              Передавайте документы по операциям и сообщайте об изменениях по сотрудникам. На старте договоримся, куда присылать документы, кто подтверждает платежи и в какие дни нужны данные для расчёта зарплаты.
            </p>
          </div>
          <div className="rounded-[28px] border border-gray-200 bg-white p-6 md:p-8">
            <h3 className="font-display text-lg font-semibold text-night">Что согласуем до договора</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 md:text-base">
              Обсудим перечень работ, сроки передачи документов, стоимость в месяц и ответственность сторон. Если потребуется разобрать учёт за прошлые периоды, согласуем объём и цену этой работы отдельно.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-5 rounded-[28px] bg-night p-6 text-white md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <h3 className="font-display text-lg font-semibold md:text-xl">Стоимость ежемесячного ведения</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              Зависит от налогового режима, количества сотрудников и объёма операций.
            </p>
          </div>
          <button
            type="button"
            onClick={() => open({
              source: 'services',
              topic: 'Расчёт стоимости сопровождения ИП или ООО с сотрудниками',
              title: 'Стоимость сопровождения',
              subtitle: 'Оставьте телефон и укажите количество сотрудников, чтобы мы могли подготовить расчёт.',
            })}
            className="shrink-0 rounded-full bg-gold px-6 py-3.5 text-sm font-bold text-night transition-colors hover:bg-gold-light"
          >
            Запросить расчёт
          </button>
        </div>
      </div>
    </section>
  )
}
