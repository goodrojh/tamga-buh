import { motion, type Variants } from 'framer-motion'
import { FileCheck2, ShoppingBag, CalendarClock, Check, Send, ShieldCheck, TrendingDown } from 'lucide-react'
import { media } from '@/data/media'
import { useLead } from '@/components/LeadModal'

const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }
const cardVariants: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } }

const DEADLINES = [
  { d: '25 апр', t: 'Уведомление по УСН за I кв.', tone: 'bg-gold' },
  { d: '28 апр', t: 'Аванс по УСН', tone: 'bg-steppe' },
  { d: '25 мая', t: '6-НДФЛ, РСВ за I кв.', tone: 'bg-night' },
]

export default function Features() {
  const { open } = useLead()
  return (
    <section className="w-full px-4 md:px-6 py-20 md:py-[120px] bg-sand relative overflow-hidden">
      <div className="hidden md:block absolute top-0 left-1/4 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
      <div className="hidden md:block absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-night/10 rounded-full blur-[100px] translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 mb-12 md:mb-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-3xl md:text-5xl font-semibold text-night mb-5 leading-[1.1]"
        >
          Вы занимаетесь бизнесом. <br className="hidden md:block" />
          Мы — всем остальным
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg text-gray-500 max-w-2xl mx-auto">
          Налоги, отчёты, зарплата, сверки с Wildberries и Ozon, письма из ФНС — всё это уходит к нам. Вам остаётся раз в месяц посмотреть на итог.
        </motion.p>
      </div>

      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-7xl mx-auto relative z-10">
        {/* Card 1 — image */}
        <motion.div variants={cardVariants} whileHover={{ y: -5 }} className="rounded-[32px] border border-gray-200 p-6 flex flex-col gap-10 group relative overflow-hidden min-h-[460px]">
          <div className="absolute inset-0 z-0">
            <img src={media.desk} alt="Рабочий стол бухгалтера с печатью-тамгой" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-b from-night/70 via-night/30 to-night/80" />
          </div>
          <div className="relative z-10">
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-white leading-[1.15] tracking-tight drop-shadow-lg">
              Один бухгалтер, <br />
              <span className="italic text-gold-light">который знает ваш бизнес</span>
            </h3>
            <p className="text-base text-white/85 leading-relaxed max-w-[450px] mt-3 drop-shadow-md">
              Не колл-центр и не «тикеты». Персональный бухгалтер отвечает в мессенджере, а главбух подключается к сложным вопросам.
            </p>
          </div>
          <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
            {[
              { icon: FileCheck2, t: 'Налоги и отчёты', d: 'УСН, ПСН, АвтоУСН, ОСНО, НДС 5/7/20 %. Все формы в ФНС и СФР.' },
              { icon: ShoppingBag, t: 'Маркетплейсы', d: 'Сверка отчётов WB, Ozon, Яндекс Маркет. Комиссии, возвраты, логистика — в учёте.' },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="flex flex-col gap-3 p-5 rounded-[24px] glass hover:bg-white/20 transition-all group/item shadow-xl">
                <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center border border-white/30 shrink-0 transition-transform group-hover/item:scale-110">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="text-sm font-bold text-white">{t}</span>
                  <p className="text-[12px] text-white/75 leading-relaxed mt-1">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Card 2 — tax calendar */}
        <motion.div variants={cardVariants} whileHover={{ y: -5 }} className="bg-white rounded-[32px] border border-gray-200 p-6 flex flex-col overflow-hidden relative min-h-[460px]">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-white to-night/5" />
          <div className="hidden md:block absolute top-1/4 right-0 w-64 h-64 bg-gold/20 rounded-full blur-[80px]" />
          <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center pointer-events-none select-none py-6">
            <div className="w-full max-w-[300px] bg-white/60 backdrop-blur-xl border border-white/80 rounded-[24px] p-6 shadow-2xl shadow-night/10">
              <div className="flex items-center gap-2 mb-4">
                <CalendarClock className="w-4 h-4 text-gold-dark" />
                <span className="text-xs font-bold text-night">Налоговый календарь</span>
              </div>
              <div className="space-y-3">
                {DEADLINES.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.12 }} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
                    <div className={'w-2 h-2 rounded-full ' + item.tone} />
                    <span className="text-[11px] font-bold text-night w-12">{item.d}</span>
                    <span className="text-[11px] text-gray-600">{item.t}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 bg-night rounded-full p-2 pl-4 flex items-center gap-3 shadow-lg">
                <span className="text-[11px] font-medium text-white/80 flex-1">Напомним за 7 дней</span>
                <div className="w-7 h-7 rounded-full bg-gold flex items-center justify-center">
                  <Check className="h-3.5 w-3.5 text-night stroke-[3]" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-auto relative z-10 pt-6">
            <h3 className="font-display text-xl font-semibold text-night">Ни одного пропущенного срока</h3>
            <p className="text-sm text-gray-500 leading-relaxed mt-2">
              Ведём календарь по каждому клиенту. Если срок сорван по нашей вине — штраф платим мы. Это прописано в договоре.
            </p>
          </div>
        </motion.div>

        {/* Card 3 — workflow */}
        <motion.div variants={cardVariants} whileHover={{ y: -5 }} className="bg-white rounded-[32px] border border-gray-200 overflow-hidden flex flex-col">
          <div className="bg-gray-50 h-72 relative flex items-center justify-center overflow-hidden border-b border-gray-200 p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-white to-night/5" />
            <motion.div animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-8 right-8 w-16 h-16 rounded-2xl bg-white/60 backdrop-blur-md border border-white shadow-[0_20px_40px_rgba(0,0,0,0.08)] flex items-center justify-center">
              <ShieldCheck className="h-7 w-7 text-gold-dark" />
            </motion.div>
            <motion.div animate={{ y: [0, 12, 0], rotate: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="absolute bottom-8 left-8 w-16 h-16 rounded-[24px] bg-white/60 backdrop-blur-md border border-white shadow-[0_20px_40px_rgba(0,0,0,0.08)] flex items-center justify-center">
              <Send className="h-7 w-7 text-night" />
            </motion.div>

            <div className="relative z-10 w-full max-w-[270px] flex flex-col items-center">
              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl p-4 shadow-xl shadow-night/5 border border-gold/20 flex items-center gap-3 w-full mb-8 relative">
                <div className="w-10 h-10 rounded-xl bg-night flex items-center justify-center shrink-0">
                  <Send className="h-5 w-5 text-gold" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-night">Вы прислали фото чека</span>
                  <span className="text-[9px] text-gray-400">WhatsApp · 14:02</span>
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-gold/40 to-gold" />
              </motion.div>
              <div className="grid grid-cols-2 gap-4 w-full relative">
                <div className="absolute -top-4 left-1/4 right-1/4 h-px bg-gold/40" />
                <div className="absolute -top-4 left-1/4 w-px h-4 bg-gold/40" />
                <div className="absolute -top-4 right-1/4 w-px h-4 bg-gold/40" />
                {['Разнесли в учёт', 'Проверили НДС'].map((t, i) => (
                  <motion.div key={t} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1 }} className="bg-white/80 backdrop-blur-md rounded-xl p-3 shadow-lg border border-white flex flex-col gap-2 items-center text-center">
                    <div className="w-8 h-8 rounded-lg bg-gold/15 flex items-center justify-center">
                      <Check className="h-4 w-4 text-gold-dark" />
                    </div>
                    <span className="text-[10px] font-bold text-night">{t}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="mt-8 bg-steppe text-white text-[10px] font-bold py-2 px-4 rounded-full shadow-lg shadow-steppe/20 flex items-center gap-2">
                <Check className="h-3 w-3 stroke-[3]" /> Отчёт принят ФНС
              </motion.div>
            </div>
          </div>
          <div className="p-6">
            <h3 className="font-display text-xl font-semibold text-night">Документы — фото в чат</h3>
            <p className="text-base text-gray-500 leading-relaxed mt-2">
              Никаких «привезите папку». Чеки, счета, договоры — фотографией в WhatsApp или Telegram. Остальное делаем мы: разносим, проверяем, сдаём.
            </p>
          </div>
        </motion.div>

        {/* Card 4 — savings chart */}
        <motion.div variants={cardVariants} whileHover={{ y: -5 }} className="bg-white rounded-[32px] border border-gray-200 overflow-hidden flex flex-col">
          <div className="bg-gray-50 h-72 relative flex flex-col items-center justify-center border-b border-gray-200 p-6 md:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-white to-night/5" />
            <div className="w-full h-full bg-white/70 backdrop-blur-xl rounded-2xl border border-white shadow-2xl shadow-night/5 p-5 flex flex-col gap-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gold/15 flex items-center justify-center">
                    <TrendingDown className="h-5 w-5 text-gold-dark" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-night">Налог УСН «Доходы»</div>
                    <div className="text-[9px] text-gray-400">выручка 10 млн ₽ / год</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-steppe bg-steppe/10 px-2 py-1 rounded-full">−500 000 ₽</span>
              </div>
              <div className="flex-1 flex items-end gap-6 px-4">
                {[
                  { l: 'Обычный регион · 6 %', v: 600, h: 100, c: 'from-gray-300 to-gray-400' },
                  { l: 'Калмыкия · 1 %', v: 100, h: 17, c: 'from-gold to-gold-light' },
                ].map((b) => (
                  <div key={b.l} className="flex-1 h-full flex flex-col justify-end items-center gap-2">
                    <span className="text-[11px] font-bold text-night">{b.v} 000 ₽</span>
                    <motion.div initial={{ height: 0 }} whileInView={{ height: b.h + '%' }} viewport={{ once: true }} transition={{ duration: 1.2, ease: 'easeOut' }} className={'w-full max-w-[90px] bg-gradient-to-t rounded-t-lg ' + b.c} />
                    <span className="text-[9px] text-gray-500 text-center leading-tight">{b.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="p-6">
            <h3 className="font-display text-xl font-semibold text-night">Считаем, где вы переплачиваете</h3>
            <p className="text-base text-gray-500 leading-relaxed mt-2">
              Подбираем режим и объект налогообложения, проверяем право на льготы Калмыкии. Если выгоднее остаться как есть — так и скажем.
            </p>
            <button onClick={() => open({ source: 'features', topic: 'Аудит налоговой нагрузки', title: 'Бесплатный аудит налогов', subtitle: 'Пришлите обороты и режим — за день скажем, сколько можно сэкономить и как.' })} className="mt-4 text-sm font-bold text-night inline-flex items-center gap-1.5 hover:gap-2.5 transition-all">
              Проверить мой налог <span className="text-gold-dark">→</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
