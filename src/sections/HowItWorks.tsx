import { motion, type Variants } from 'framer-motion'
import { MessageCircle, FileCheck2, CheckCircle, Camera, ShieldCheck } from 'lucide-react'
import { media } from '@/data/media'
import { useLead } from '@/components/LeadModal'

const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }
const stepVariants: Variants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } } }

export default function HowItWorks() {
  const { open } = useLead()
  return (
    <section id="how" className="w-full px-4 md:px-12 lg:px-20 py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="hidden md:block absolute -top-24 -left-24 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
        <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="hidden md:block absolute -bottom-24 -right-24 w-96 h-96 bg-night/10 rounded-full blur-3xl" />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-14 md:mb-20 flex flex-col items-center gap-4 relative z-10">
        <h2 className="font-display font-semibold text-3xl md:text-[48px] leading-[1.1] max-w-2xl text-night">
          Переход к нам занимает один день. <br className="hidden md:block" />
          Дальше — 3 простых шага
        </h2>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14 max-w-7xl mx-auto relative z-10">
        {/* STEP 1 */}
        <motion.div variants={stepVariants} className="flex flex-col gap-6 group">
          <div className="rounded-2xl overflow-hidden relative aspect-[4/3] w-full shadow-lg">
            <img src={media.step1} alt="Отправка документов фото в мессенджер" loading="lazy" className="object-cover w-full h-full absolute inset-0 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="w-full bg-white/20 backdrop-blur-2xl rounded-[15px] border border-white/30 p-5 flex flex-col justify-center gap-2 shadow-2xl">
                {[
                  { icon: Camera, t: 'Фото чека', d: 'из WhatsApp', a: false },
                  { icon: MessageCircle, t: 'Выписка из банка', d: 'подключили автоматически', a: true },
                  { icon: FileCheck2, t: 'Отчёт Wildberries', d: 'загружен', a: false },
                ].map(({ icon: Icon, t, d, a }, i) => (
                  <motion.div key={t} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.1 }} className={'rounded-[8px] px-2.5 py-1.5 flex items-center gap-2 shadow-lg border ' + (a ? 'bg-white border-gold/30' : 'bg-white/50 border-white/40')}>
                    <div className={'w-6 h-6 rounded-[6px] flex items-center justify-center shrink-0 ' + (a ? 'bg-gold/15' : 'bg-white/40')}>
                      <Icon className={'h-3 w-3 ' + (a ? 'text-gold-dark' : 'text-gray-600')} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold leading-none mb-0.5 text-night">{t}</span>
                      <span className="text-[8px] text-gray-500 leading-none">{d}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="inline-flex w-fit rounded-full text-gold-dark text-xs font-bold px-3 py-1 border border-gold">Шаг 01</span>
            <h3 className="font-display text-2xl font-semibold leading-tight text-night">Знакомимся и подключаем</h3>
            <p className="text-base text-gray-500 leading-relaxed">15-минутный звонок: разбираем режим, обороты, сотрудников. Подписываем договор, подключаем банк и маркетплейсы. Забираем дела у прошлого бухгалтера сами.</p>
          </div>
        </motion.div>

        {/* STEP 2 */}
        <motion.div variants={stepVariants} className="flex flex-col gap-6 group">
          <div className="rounded-2xl overflow-hidden relative aspect-[4/3] w-full shadow-lg">
            <img src={media.step2} alt="Бухгалтер ведёт учёт" loading="lazy" className="object-cover w-full h-full absolute inset-0 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="w-full bg-white/20 backdrop-blur-2xl rounded-[15px] border border-white/30 p-4 flex flex-col gap-2 shadow-2xl overflow-hidden">
                {/* Чат с бухгалтером */}
                {[
                  { me: true, t: 'Пришло требование из ФНС, что делать?', time: '10:14' },
                  { me: false, t: 'Вижу. Это сверка по УСН за I кв. Ответ подготовлю сегодня, вам ничего делать не нужно.', time: '10:21' },
                  { me: false, t: 'Отправила ответ, квитанция о приёме — во вложении ✓', time: '15:40' },
                ].map((m, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.2 }} className={'flex ' + (m.me ? 'justify-end' : 'justify-start')}>
                    <div className={'max-w-[85%] rounded-[12px] px-3 py-2 shadow-lg ' + (m.me ? 'bg-gold text-night rounded-br-[4px]' : 'bg-white text-night rounded-bl-[4px]')}>
                      <p className="text-[10px] leading-snug">{m.t}</p>
                      <span className={'block text-[8px] mt-1 text-right ' + (m.me ? 'text-night/60' : 'text-gray-400')}>{m.time}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="inline-flex w-fit rounded-full text-gold-dark text-xs font-bold px-3 py-1 border border-gold">Шаг 02</span>
            <h3 className="font-display text-2xl font-semibold leading-tight text-night">Ведём учёт и держим в курсе</h3>
            <p className="text-base text-gray-500 leading-relaxed">Вы присылаете документы фото в чат, мы разносим, считаем налоги и напоминаем о платежах за неделю. Вопросы — в мессенджере, ответ в среднем за 15 минут.</p>
          </div>
        </motion.div>

        {/* STEP 3 */}
        <motion.div variants={stepVariants} className="flex flex-col gap-6 group">
          <div className="rounded-2xl overflow-hidden relative aspect-[4/3] w-full shadow-lg">
            <img src={media.step3} alt="Отчётность сдана и принята" loading="lazy" className="object-cover w-full h-full absolute inset-0 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="w-full bg-white/20 backdrop-blur-2xl rounded-[15px] border border-white/30 p-5 flex flex-col justify-center gap-3 shadow-2xl overflow-hidden">
                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="bg-white rounded-[8px] p-2.5 flex items-center gap-3 shadow-xl border border-white relative overflow-hidden">
                  <motion.div animate={{ x: ['-100%', '200%'] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-gold/10 to-transparent -skew-x-12 pointer-events-none" />
                  <div className="w-9 h-9 rounded-[8px] bg-steppe/10 flex items-center justify-center shrink-0">
                    <CheckCircle className="h-5 w-5 text-steppe" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-night leading-none mb-1">Декларация УСН</span>
                    <span className="text-[8px] text-gray-500 leading-none">Принята ФНС · квитанция в чате</span>
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }} className="bg-white rounded-[8px] px-3 py-1.5 w-fit shadow-lg border border-white flex items-center gap-2">
                  <ShieldCheck className="w-3 h-3 text-gold-dark" />
                  <span className="text-[10px] font-bold tracking-tight leading-none text-night">Ответственность в договоре</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="inline-flex w-fit rounded-full text-gold-dark text-xs font-bold px-3 py-1 border border-gold">Шаг 03</span>
            <h3 className="font-display text-2xl font-semibold leading-tight text-night">Сдаём отчёты и отвечаем за них</h3>
            <p className="text-base text-gray-500 leading-relaxed">Отправляем отчётность через ЭЦП, присылаем квитанции о приёме. Пришло требование из ФНС — отвечаем сами. Ошиблись мы — штраф платим мы.</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} onClick={() => open({ source: 'how', topic: 'Начать сотрудничество', title: 'Сделаем шаг 01 прямо сейчас', subtitle: 'Оставьте номер — назначим 15-минутный звонок в удобное время.' })} className="w-full sm:w-auto rounded-full px-10 py-4 text-sm font-bold tracking-widest uppercase bg-gold text-night shadow-gold transition-all">
          Начать
        </motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} onClick={() => open({ source: 'how-switch', topic: 'Переход от другого бухгалтера', title: 'Переходите — заберём дела сами', subtitle: 'Расскажите, у кого сейчас учёт и что беспокоит. Проведём бесплатный экспресс-аудит базы.' })} className="w-full sm:w-auto rounded-full px-10 py-4 text-sm font-bold tracking-widest uppercase bg-white text-night border border-gray-200 shadow-lg transition-all">
          У меня уже есть бухгалтер
        </motion.button>
      </motion.div>
    </section>
  )
}
