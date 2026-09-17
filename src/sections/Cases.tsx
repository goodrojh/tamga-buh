import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useLead } from '@/components/LeadModal'

/** Типовые ситуации из практики. Цифры усреднённые — заменить на реальные кейсы клиента при наличии. */
const CASES = [
  {
    tag: 'Маркетплейсы',
    title: 'Селлер на WB платил налог с суммы «до комиссии»',
    before: 'Считал 6 % с выручки по отчёту, переплачивал ~11 % налога и не учитывал возвраты.',
    after: 'Пересобрали базу за год, подали уточнёнку, вернули переплату 184 000 ₽ на ЕНС.',
    metric: '+184 000 ₽',
    metricLabel: 'вернули на ЕНС',
  },
  {
    tag: 'Калмыкия 1 %',
    title: 'Новый ИП из Подмосковья открылся сразу в Элисте',
    before: 'Планировал УСН 6 % в своём регионе, оборот 9 млн ₽ в год — 540 000 ₽ налога.',
    after: 'Зарегистрировали ИП в Калмыкии, оформили юрадрес, ставка 1 % — 90 000 ₽ в год.',
    metric: '−450 000 ₽',
    metricLabel: 'налога в год',
  },
  {
    tag: 'ООО + НДС',
    title: 'ООО перешагнуло лимит и стало плательщиком НДС',
    before: 'Бухгалтер не заметил превышения лимита УСН, три месяца счета шли без НДС.',
    after: 'Выбрали ставку 5 % без вычетов, переоформили документы, ответили на требование ФНС без штрафа.',
    metric: '0 ₽',
    metricLabel: 'штрафов',
  },
]

export default function Cases() {
  const { open } = useLead()
  return (
    <section id="cases" className="bg-night text-white py-20 md:py-28 px-4 md:px-6 relative overflow-hidden">
      <div className="absolute inset-0 tamga-grid opacity-40" />
      <div className="hidden md:block absolute top-0 right-0 w-[500px] h-[500px] bg-gold/15 rounded-full blur-[140px]" />
      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="font-display text-3xl md:text-5xl font-semibold leading-[1.1] max-w-2xl">Ситуации, которые мы разбираем каждую неделю</h2>
          </div>
          <p className="text-white/60 max-w-sm">Узнали себя? Значит, решение уже есть — и обычно оно быстрее и дешевле, чем кажется.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CASES.map((c, i) => (
            <motion.div key={c.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-[28px] p-6 md:p-7 flex flex-col">
              <span className="inline-flex w-fit text-[11px] font-bold uppercase tracking-wider text-gold bg-gold/10 border border-gold/20 px-3 py-1 rounded-full">{c.tag}</span>
              <h3 className="font-display text-lg font-semibold mt-4 leading-snug">{c.title}</h3>
              <div className="mt-5 space-y-3 text-[14px]">
                <div className="rounded-xl bg-white/5 p-3">
                  <div className="text-[10px] uppercase tracking-wider text-red-300/80 mb-1">Было</div>
                  <p className="text-white/70 leading-relaxed">{c.before}</p>
                </div>
                <div className="rounded-xl bg-white/5 p-3">
                  <div className="text-[10px] uppercase tracking-wider text-steppe mb-1">Стало</div>
                  <p className="text-white/85 leading-relaxed">{c.after}</p>
                </div>
              </div>
              <div className="mt-auto pt-6 flex items-end justify-between">
                <div>
                  <div className="font-display font-bold text-3xl gold-text">{c.metric}</div>
                  <div className="text-[12px] text-white/50">{c.metricLabel}</div>
                </div>
                <button onClick={() => open({ source: 'cases', topic: `Похожая ситуация: ${c.tag}` })} className="w-10 h-10 rounded-full bg-gold text-night flex items-center justify-center hover:scale-110 transition-transform" aria-label="Обсудить похожую ситуацию">
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-[12px] text-white/35 mt-6">Примеры обобщены и обезличены. Результат зависит от вашей ситуации.</p>
      </div>
    </section>
  )
}
