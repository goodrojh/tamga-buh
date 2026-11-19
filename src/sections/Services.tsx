import { Calculator, Users, FileCheck2 } from 'lucide-react'
import { useLead } from '@/components/LeadModal'

const scope = [
  {
    icon: Calculator,
    title: 'Бухгалтерия и налоги',
    description: 'Ведём учёт, проверяем первичные документы, рассчитываем налоги и сообщаем, сколько и когда платить.',
  },
  {
    icon: Users,
    title: 'Зарплата и кадры',
    description: 'Начисляем зарплату, НДФЛ и взносы. Оформляем приём, увольнение, отпуска и больничные.',
  },
  {
    icon: FileCheck2,
    title: 'Отчётность и запросы ФНС',
    description: 'Ведём календарь сроков, готовим и сдаём отчётность, помогаем отвечать на запросы налоговой.',
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
          {scope.map(({ icon: Icon, title, description }) => (
            <article key={title} className="rounded-[28px] border border-gray-200 bg-white p-6 md:p-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-sand text-night">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="font-display text-lg font-semibold text-night">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 md:text-base">{description}</p>
            </article>
          ))}
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
