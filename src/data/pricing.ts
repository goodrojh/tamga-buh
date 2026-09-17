/**
 * Прайс ТАМГА (лист "ПРАЙС", колонка «Будет с учётом изменений»).
 * Цены в рублях в месяц за бухгалтерское сопровождение.
 */
export type Entity = 'ip' | 'ooo'
export type Regime = 'psn' | 'ausn' | 'usn' | 'usn_nds' | 'osno'
export type Obj = 'd' | 'dr'
export type Workers = '0' | 'le5' | 'gt5'
export type Shops = 'none' | '1-2' | '3-5' | 'gt5'

export const ENTITY_LABEL: Record<Entity, string> = { ip: 'ИП', ooo: 'ООО' }
export const REGIME_LABEL: Record<Regime, string> = {
  psn: 'Патент (ПСН)',
  ausn: 'АвтоУСН',
  usn: 'УСН',
  usn_nds: 'УСН + НДС',
  osno: 'ОСНО',
}
export const OBJ_LABEL: Record<Obj, string> = { d: '«Доходы»', dr: '«Доходы − расходы»' }
export const WORKERS_LABEL: Record<Workers, string> = { '0': 'Нет', le5: 'До 5', gt5: 'Больше 5' }
export const SHOPS_LABEL: Record<Shops, string> = {
  none: 'Нет',
  '1-2': '1–2 магазина',
  '3-5': '3–5 магазинов',
  gt5: 'Больше 5',
}

/** Доступные режимы для формы бизнеса */
export const REGIMES_FOR: Record<Entity, Regime[]> = {
  ip: ['usn', 'psn', 'ausn', 'usn_nds', 'osno'],
  ooo: ['usn', 'usn_nds', 'osno'],
}

type ByShops = Record<'1-2' | '3-5', number>
type ByWorkers = Record<Workers, ByShops>
type ByObj = Record<Obj, ByWorkers>

const usnIp: ByObj = {
  d: { '0': { '1-2': 7000, '3-5': 10000 }, le5: { '1-2': 11000, '3-5': 14000 }, gt5: { '1-2': 14000, '3-5': 16000 } },
  dr: { '0': { '1-2': 12000, '3-5': 15000 }, le5: { '1-2': 16000, '3-5': 19000 }, gt5: { '1-2': 19000, '3-5': 21000 } },
}
const usnNdsIp: ByObj = {
  d: { '0': { '1-2': 16000, '3-5': 18000 }, le5: { '1-2': 20000, '3-5': 23000 }, gt5: { '1-2': 23000, '3-5': 25000 } },
  dr: { '0': { '1-2': 21000, '3-5': 23000 }, le5: { '1-2': 25000, '3-5': 28000 }, gt5: { '1-2': 28000, '3-5': 30000 } },
}
const usnOoo: ByObj = {
  d: { '0': { '1-2': 9000, '3-5': 11000 }, le5: { '1-2': 13000, '3-5': 16000 }, gt5: { '1-2': 16000, '3-5': 19000 } },
  dr: { '0': { '1-2': 14000, '3-5': 16000 }, le5: { '1-2': 18000, '3-5': 21000 }, gt5: { '1-2': 21000, '3-5': 24000 } },
}
const usnNdsOoo: ByObj = {
  d: { '0': { '1-2': 20000, '3-5': 23000 }, le5: { '1-2': 25000, '3-5': 30000 }, gt5: { '1-2': 28000, '3-5': 31000 } },
  dr: { '0': { '1-2': 25000, '3-5': 28000 }, le5: { '1-2': 30000, '3-5': 35000 }, gt5: { '1-2': 33000, '3-5': 36000 } },
}
const psnIp: Record<Workers, number> = { '0': 4000, le5: 7000, gt5: 10000 }
const ausnIp: Record<Obj, Partial<Record<Workers, number>>> = {
  d: { '0': 10000, le5: 14000 },
  dr: { '0': 15000, le5: 19000 },
}
const osno: Record<Entity, Record<Workers, number>> = {
  ip: { '0': 15000, le5: 20000, gt5: 25000 },
  ooo: { '0': 20000, le5: 25000, gt5: 30000 },
}

export const EXTRA_SHOP = 1500 // за каждый магазин сверх 5
export const NDS20_EXTRA = { min: 3000, max: 5000 } // если выбрана ставка НДС 20 %

export interface CalcInput {
  entity: Entity
  regime: Regime
  obj: Obj
  workers: Workers
  shops: Shops
  extraShops: number // сколько магазинов сверх 5
  nds20: boolean
}

export interface CalcResult {
  price: number | null
  note?: string
  breakdown: string[]
}

export function calculate(i: CalcInput): CalcResult {
  const breakdown: string[] = []
  const shopsKey: '1-2' | '3-5' = i.shops === '3-5' || i.shops === 'gt5' ? '3-5' : '1-2'

  const withShops = (table: ByObj): number => {
    let p = table[i.obj][i.workers][shopsKey]
    breakdown.push(`База: ${fmt(p)} ₽`)
    if (i.shops === 'gt5' && i.extraShops > 0) {
      const add = i.extraShops * EXTRA_SHOP
      p += add
      breakdown.push(`+ ${i.extraShops} магазин(ов) сверх 5 × ${fmt(EXTRA_SHOP)} = ${fmt(add)} ₽`)
    }
    return p
  }

  let price: number | null = null
  let note: string | undefined

  switch (i.regime) {
    case 'psn':
      if (i.entity !== 'ip') return { price: null, note: 'Патент доступен только ИП', breakdown }
      price = psnIp[i.workers]
      breakdown.push(`Патент, сотрудники: ${WORKERS_LABEL[i.workers].toLowerCase()}`)
      break
    case 'ausn': {
      if (i.entity !== 'ip') return { price: null, note: 'АвтоУСН считаем индивидуально для ООО', breakdown }
      const p = ausnIp[i.obj][i.workers]
      if (p == null) return { price: null, note: 'АвтоУСН допускает не более 5 сотрудников', breakdown }
      price = p
      breakdown.push(`АвтоУСН ${OBJ_LABEL[i.obj]}`)
      break
    }
    case 'usn':
      price = withShops(i.entity === 'ip' ? usnIp : usnOoo)
      break
    case 'usn_nds':
      price = withShops(i.entity === 'ip' ? usnNdsIp : usnNdsOoo)
      if (i.nds20) {
        price += NDS20_EXTRA.min
        breakdown.push(`+ НДС 20 %: от ${fmt(NDS20_EXTRA.min)} до ${fmt(NDS20_EXTRA.max)} ₽`)
        note = 'При НДС 20 % итог уточняется после разбора оборотов'
      }
      break
    case 'osno':
      price = osno[i.entity][i.workers]
      breakdown.push(`ОСНО, ${ENTITY_LABEL[i.entity]}, сотрудники: ${WORKERS_LABEL[i.workers].toLowerCase()}`)
      if (i.entity === 'ip') note = 'Для оборотов до 100 млн ₽ в год'
      else note = 'Итог зависит от оборотов — уточним при звонке'
      break
  }
  return { price, note, breakdown }
}

export const fmt = (n: number) => n.toLocaleString('ru-RU')

export function describeInput(i: CalcInput): string {
  const parts = [ENTITY_LABEL[i.entity], REGIME_LABEL[i.regime]]
  if (i.regime === 'usn' || i.regime === 'usn_nds' || i.regime === 'ausn') parts.push(OBJ_LABEL[i.obj])
  parts.push(`сотрудники: ${WORKERS_LABEL[i.workers].toLowerCase()}`)
  if (i.regime === 'usn' || i.regime === 'usn_nds') {
    parts.push(`маркетплейсы: ${SHOPS_LABEL[i.shops].toLowerCase()}${i.shops === 'gt5' && i.extraShops ? ` (+${i.extraShops})` : ''}`)
  }
  if (i.regime === 'usn_nds') parts.push(i.nds20 ? 'НДС 20 %' : 'НДС 5/7 %')
  return parts.join(', ')
}

/** Пакеты-якоря для секции тарифов (собраны из прайса) */
export const packages = [
  {
    id: 'start',
    name: 'Старт',
    tagline: 'ИП на УСН «Доходы», без сотрудников',
    price: 7000,
    popular: false,
    features: [
      'Ведение учёта и КУДиР',
      'Расчёт налога и взносов',
      'Декларация УСН и уведомления',
      'До 2 магазинов на маркетплейсах',
      'Ответы бухгалтера в мессенджере',
      'Налоговый календарь и напоминания',
    ],
    preset: { entity: 'ip', regime: 'usn', obj: 'd', workers: '0', shops: '1-2' } as Partial<CalcInput>,
  },
  {
    id: 'business',
    name: 'Бизнес',
    tagline: 'ИП с сотрудниками и маркетплейсами',
    price: 11000,
    popular: true,
    features: [
      'Всё из «Старт»',
      'Кадровый учёт до 5 сотрудников',
      'Зарплата, взносы, 6-НДФЛ, РСВ, ЕФС-1',
      'Сверка отчётов WB / Ozon / Яндекс',
      'Первичка и акты с контрагентами',
      'Персональный бухгалтер',
    ],
    preset: { entity: 'ip', regime: 'usn', obj: 'd', workers: 'le5', shops: '1-2' } as Partial<CalcInput>,
  },
  {
    id: 'ooo',
    name: 'Компания',
    tagline: 'ООО на УСН «Доходы»',
    price: 9000,
    popular: false,
    features: [
      'Бухгалтерский и налоговый учёт',
      'Бухгалтерская отчётность в ФНС',
      'Учёт дивидендов и займов',
      'Взаимодействие с банком и ФНС',
      'Кадры и зарплата — по запросу',
      'Главбух на связи по сложным вопросам',
    ],
    preset: { entity: 'ooo', regime: 'usn', obj: 'd', workers: '0', shops: '1-2' } as Partial<CalcInput>,
  },
]

/**
 * Разовые услуги. Цены, отмеченные `estimate: true`, — ориентиры, которых нет в прайсе клиента.
 * TODO: подтвердить с заказчиком.
 */
export const oneTimeServices = [
  { id: 'reg-ip', name: 'Регистрация ИП', price: 'Бесплатно', sub: 'при заключении договора на сопровождение', estimate: true },
  { id: 'reg-ooo', name: 'Регистрация ООО', price: 'от 5 000 ₽', sub: 'устав, решение, подача через ЭЦП', estimate: true },
  { id: 'liq-ip', name: 'Закрытие ИП', price: 'от 3 000 ₽', sub: 'с финальной отчётностью', estimate: true },
  { id: 'liq-ooo', name: 'Ликвидация ООО', price: 'от 30 000 ₽', sub: 'полное сопровождение, 4–6 месяцев', estimate: true },
  { id: 'address', name: 'Юридический адрес в Калмыкии', price: 'от 5 000 ₽/мес', sub: 'реальный офис, почта, гарантийное письмо', estimate: true },
  { id: 'account', name: 'Открытие расчётного счёта', price: 'Бесплатно', sub: 'подберём банк под ваши обороты', estimate: true },
  { id: 'ndfl', name: 'Декларация 3-НДФЛ', price: 'от 1 500 ₽', sub: 'вычеты за жильё, лечение, обучение, ИИС', estimate: true },
  { id: 'zero', name: 'Нулевая отчётность', price: 'от 2 500 ₽/кв', sub: 'ИП и ООО без движений', estimate: true },
  { id: 'hr', name: 'Кадровый учёт', price: 'от 1 000 ₽/сотр.', sub: 'приём, увольнение, отпуска, ЕФС-1', estimate: true },
  { id: 'consult', name: 'Консультация главбуха', price: 'от 2 000 ₽/час', sub: 'первые 15 минут — бесплатно', estimate: true },
]
