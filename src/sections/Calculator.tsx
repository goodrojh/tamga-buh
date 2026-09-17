import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Info, Lock, Sparkles } from 'lucide-react'
import {
  calculate,
  describeInput,
  fmt,
  ENTITY_LABEL,
  OBJ_LABEL,
  REGIME_LABEL,
  REGIMES_FOR,
  SHOPS_LABEL,
  WORKERS_LABEL,
  type CalcInput,
  type Entity,
  type Obj,
  type Regime,
  type Shops,
  type Workers,
} from '@/data/pricing'
import { useLead } from '@/components/LeadModal'

function Chips<T extends string>({ label, hint, value, options, labels, onChange }: { label: string; hint?: string; value: T; options: T[]; labels: Record<T, string>; onChange: (v: T) => void }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2.5">
        <span className="text-[13px] font-bold text-night">{label}</span>
        {hint && <span className="text-[11px] text-gray-400">{hint}</span>}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            className={
              'rounded-full px-4 py-2.5 text-[14px] font-semibold border transition-all ' +
              (value === o ? 'bg-night text-white border-night shadow-lg shadow-night/20' : 'bg-white text-night border-gray-200 hover:border-night/40')
            }
          >
            {labels[o]}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Calculator() {
  const { open } = useLead()
  const [entity, setEntity] = useState<Entity>('ip')
  const [regime, setRegime] = useState<Regime>('usn')
  const [obj, setObj] = useState<Obj>('d')
  const [workers, setWorkers] = useState<Workers>('0')
  const [shops, setShops] = useState<Shops>('none')
  const [extraShops, setExtraShops] = useState(1)
  const [nds20, setNds20] = useState(false)

  const changeEntity = (e: Entity) => {
    setEntity(e)
    if (!REGIMES_FOR[e].includes(regime)) setRegime('usn')
  }

  const input: CalcInput = { entity, regime, obj, workers, shops, extraShops, nds20 }
  const result = useMemo(() => calculate(input), [entity, regime, obj, workers, shops, extraShops, nds20]) // eslint-disable-line react-hooks/exhaustive-deps

  const showObj = regime === 'usn' || regime === 'usn_nds' || regime === 'ausn'
  const showShops = regime === 'usn' || regime === 'usn_nds'
  const workerOptions: Workers[] = regime === 'ausn' ? ['0', 'le5'] : ['0', 'le5', 'gt5']

  return (
    <section id="calculator" className="bg-white py-20 md:py-28 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-gold-dark">Калькулятор</span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-night leading-[1.1] mt-4">Узнайте цену за 30 секунд</h2>
          <p className="text-gray-500 mt-4 text-lg">Считаем по тому же прайсу, что и наши бухгалтеры. Никаких «оставьте телефон, и мы скажем».</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          <div className="lg:col-span-3 bg-sand rounded-[28px] p-6 md:p-8 space-y-7">
            <Chips label="Форма бизнеса" value={entity} options={['ip', 'ooo']} labels={ENTITY_LABEL} onChange={changeEntity} />
            <Chips label="Режим налогообложения" hint="Не знаете? Выберите УСН" value={regime} options={REGIMES_FOR[entity]} labels={REGIME_LABEL} onChange={(r) => { setRegime(r); if (r === 'ausn' && workers === 'gt5') setWorkers('le5') }} />
            <AnimatePresence initial={false}>
              {showObj && (
                <motion.div key="obj" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                  <Chips label="Объект" value={obj} options={['d', 'dr']} labels={OBJ_LABEL} onChange={setObj} />
                </motion.div>
              )}
            </AnimatePresence>
            <Chips label="Сотрудники" hint="по трудовым и ГПХ" value={workers} options={workerOptions} labels={WORKERS_LABEL} onChange={setWorkers} />
            <AnimatePresence initial={false}>
              {showShops && (
                <motion.div key="shops" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden space-y-4">
                  <Chips label="Магазины на маркетплейсах" hint="WB, Ozon, Яндекс — каждый кабинет" value={shops} options={['none', '1-2', '3-5', 'gt5']} labels={SHOPS_LABEL} onChange={setShops} />
                  {shops === 'gt5' && (
                    <label className="flex items-center gap-3 text-[14px] text-night">
                      Сколько сверх пяти?
                      <input type="number" min={1} max={30} value={extraShops} onChange={(e) => setExtraShops(Math.max(1, Math.min(30, Number(e.target.value) || 1)))} className="w-20 rounded-xl border border-gray-200 px-3 py-2 bg-white" />
                    </label>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence initial={false}>
              {regime === 'usn_nds' && (
                <motion.div key="nds" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                  <Chips label="Ставка НДС" value={nds20 ? '20' : '5'} options={['5', '20']} labels={{ '5': '5 % / 7 % без вычетов', '20': '20 % с вычетами' }} onChange={(v) => setNds20(v === '20')} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Result */}
          <div className="lg:col-span-2">
            <div className="sticky top-6 bg-night text-white rounded-[28px] p-6 md:p-8 overflow-hidden relative">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold/25 rounded-full blur-3xl" />
              <div className="absolute inset-0 tamga-grid opacity-30" />
              <div className="relative">
                <div className="text-[12px] uppercase tracking-[0.15em] text-white/50">Ваша конфигурация</div>
                <p className="text-[14px] text-white/80 mt-2 leading-relaxed">{describeInput(input)}</p>

                <div className="mt-6">
                  <div className="text-[12px] uppercase tracking-[0.15em] text-white/50">Стоимость в месяц</div>
                  <AnimatePresence mode="wait">
                    <motion.div key={String(result.price)} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="font-display font-bold text-4xl md:text-5xl mt-2 gold-text">
                      {result.price != null ? `${fmt(result.price)} ₽` : 'Индивидуально'}
                    </motion.div>
                  </AnimatePresence>
                  {result.note && (
                    <p className="text-[13px] text-white/60 mt-3 flex gap-2">
                      <Info className="w-4 h-4 shrink-0 mt-0.5 text-gold" /> {result.note}
                    </p>
                  )}
                </div>

                {result.breakdown.length > 0 && (
                  <ul className="mt-5 space-y-1.5 text-[13px] text-white/60 border-t border-white/10 pt-4">
                    {result.breakdown.map((b) => (
                      <li key={b}>· {b}</li>
                    ))}
                  </ul>
                )}

                <button
                  onClick={() =>
                    open({
                      source: 'calculator',
                      topic: `Расчёт: ${describeInput(input)} — ${result.price != null ? fmt(result.price) + ' ₽/мес' : 'индивидуально'}`,
                      title: 'Зафиксировать эту цену',
                      subtitle: 'Цена из калькулятора действует 30 дней и фиксируется в договоре на год. Бухгалтер перезвонит, чтобы уточнить детали.',
                      cta: 'Зафиксировать цену',
                    })
                  }
                  className="mt-6 w-full rounded-full bg-gold hover:bg-gold-light text-night font-bold py-4 px-6 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-gold flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" /> Зафиксировать цену на 30 дней
                </button>
                <p className="text-[12px] text-white/45 mt-3 text-center flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-gold" /> Первый месяц — без предоплаты
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
