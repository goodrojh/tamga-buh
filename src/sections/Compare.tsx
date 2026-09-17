import { motion } from 'framer-motion'
import { Check, X, Minus } from 'lucide-react'
import { useLead } from '@/components/LeadModal'

type Cell = 'yes' | 'no' | 'partial' | string

const ROWS: { label: string; tamga: Cell; staff: Cell; freelancer: Cell; online: Cell }[] = [
  { label: 'Стоимость в месяц', tamga: 'от 4 000 ₽', staff: 'от 70 000 ₽ + налоги', freelancer: 'от 5 000 ₽', online: 'от 3 000 ₽' },
  { label: 'Ответственность за ошибки в договоре', tamga: 'yes', staff: 'partial', freelancer: 'no', online: 'partial' },
  { label: 'Персональный бухгалтер, а не чат-бот', tamga: 'yes', staff: 'yes', freelancer: 'yes', online: 'no' },
  { label: 'Отпуск / больничный не останавливают учёт', tamga: 'yes', staff: 'no', freelancer: 'no', online: 'yes' },
  { label: 'Маркетплейсы: сверка отчётов WB / Ozon', tamga: 'yes', staff: 'partial', freelancer: 'partial', online: 'partial' },
  { label: 'Юрадрес и регистрация в Калмыкии', tamga: 'yes', staff: 'no', freelancer: 'no', online: 'no' },
  { label: 'Ответы на требования ФНС включены', tamga: 'yes', staff: 'yes', freelancer: 'partial', online: 'за доплату' },
  { label: 'Главбух для сложных вопросов', tamga: 'yes', staff: 'partial', freelancer: 'no', online: 'partial' },
]

function CellView({ v }: { v: Cell }) {
  if (v === 'yes') return <span className="inline-flex w-7 h-7 rounded-full bg-steppe/15 items-center justify-center"><Check className="w-4 h-4 text-steppe stroke-[3]" /></span>
  if (v === 'no') return <span className="inline-flex w-7 h-7 rounded-full bg-red-500/10 items-center justify-center"><X className="w-4 h-4 text-red-500 stroke-[3]" /></span>
  if (v === 'partial') return <span className="inline-flex w-7 h-7 rounded-full bg-gray-200 items-center justify-center"><Minus className="w-4 h-4 text-gray-500 stroke-[3]" /></span>
  return <span className="text-[13px] font-semibold">{v}</span>
}

export default function Compare() {
  const { open } = useLead()
  return (
    <section className="bg-sand py-20 md:py-28 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-gold-dark">Сравнение</span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-night leading-[1.1] mt-4">Честно про альтернативы</h2>
          <p className="text-gray-500 mt-4 text-lg">Штатный бухгалтер, фрилансер, онлайн-сервис или мы. Сравнили по тому, что реально важно владельцу.</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="overflow-x-auto no-scrollbar -mx-4 px-4">
          <table className="w-full min-w-[720px] bg-white rounded-[24px] overflow-hidden border border-gray-200 border-separate border-spacing-0">
            <thead>
              <tr className="text-left">
                <th className="p-4 md:p-5 text-[12px] uppercase tracking-wider text-gray-400 font-semibold">Критерий</th>
                <th className="p-4 md:p-5 bg-night text-white font-display font-semibold text-[15px] rounded-t-2xl">ТАМГА</th>
                <th className="p-4 md:p-5 text-[13px] font-semibold text-gray-600">Штатный бухгалтер</th>
                <th className="p-4 md:p-5 text-[13px] font-semibold text-gray-600">Фрилансер</th>
                <th className="p-4 md:p-5 text-[13px] font-semibold text-gray-600">Онлайн-бухгалтерия</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={r.label} className={i % 2 ? 'bg-sand/40' : ''}>
                  <td className="p-4 md:p-5 text-[14px] text-night font-medium border-t border-gray-100">{r.label}</td>
                  <td className="p-4 md:p-5 bg-gold/10 border-t border-gold/20 text-night"><CellView v={r.tamga} /></td>
                  <td className="p-4 md:p-5 border-t border-gray-100 text-gray-600"><CellView v={r.staff} /></td>
                  <td className="p-4 md:p-5 border-t border-gray-100 text-gray-600"><CellView v={r.freelancer} /></td>
                  <td className="p-4 md:p-5 border-t border-gray-100 text-gray-600"><CellView v={r.online} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 bg-white rounded-[24px] border border-gray-200 p-6">
          <p className="text-night text-[15px] leading-relaxed max-w-xl">
            <b>Скажем честно:</b> если у вас ИП без сотрудников на патенте с одним счётом — вам, возможно, хватит онлайн-сервиса. Позвоните, и мы так и скажем.
          </p>
          <button onClick={() => open({ source: 'compare', topic: 'Нужен ли мне бухгалтер?', title: 'Честный ответ за 15 минут', subtitle: 'Расскажем, нужен ли вам бухгалтер вообще, и если да — какой.' })} className="rounded-full bg-night text-white font-semibold px-6 py-3.5 hover:bg-night-3 transition-colors whitespace-nowrap">
            Спросить честно
          </button>
        </div>
      </div>
    </section>
  )
}
