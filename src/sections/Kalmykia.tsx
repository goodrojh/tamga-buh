import { motion } from 'framer-motion'
import { Percent, MapPin, ShieldAlert, Sparkles, Check } from 'lucide-react'
import { media } from '@/data/media'
import { useLead } from '@/components/LeadModal'

export default function Kalmykia() {
  const { open } = useLead()
  return (
    <section id="kalmykia" className="relative bg-night text-white py-20 md:py-28 px-4 md:px-6 overflow-hidden">
      <div className="absolute inset-0">
        <img src={media.elista} alt="Золотая обитель Будды Шакьямуни, Элиста" loading="lazy" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-night via-night/70 to-night" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-5xl font-semibold leading-[1.1]">
              Регион, где УСН — <span className="gold-text">1 % вместо 6 %</span>
            </h2>
            <p className="text-white/75 text-lg mt-5 leading-relaxed">
              В Калмыкии действуют одни из самых низких ставок УСН в России: <b className="text-white">1 %</b> с доходов и <b className="text-white">5 %</b> с разницы «доходы − расходы». Мы находимся здесь, предоставляем юридический адрес и знаем, как всё оформить, чтобы льгота работала, а не стала проблемой при проверке.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Percent, t: '1 % и 5 %', d: 'Для новых ИП и ООО, зарегистрированных в Калмыкии — с первого дня.' },
                { icon: MapPin, t: 'Юрадрес с офисом', d: 'Реальный адрес в Элисте, приём писем, подтверждение для ФНС.' },
                { icon: Sparkles, t: 'Регистрация под ключ', d: 'ОКВЭД, режим налогообложения, заявление, расчётный счёт — за 3–5 рабочих дней.' },
                { icon: ShieldAlert, t: 'Честно про риски', d: 'Для переехавших с 2025 года действует 3-летний «карантин» ставки. Проверим ваш случай до подачи документов.' },
              ].map(({ icon: Icon, t, d }) => (
                <div key={t} className="glass rounded-2xl p-5">
                  <Icon className="w-5 h-5 text-gold" />
                  <div className="font-display font-semibold mt-3">{t}</div>
                  <p className="text-[13px] text-white/65 mt-1.5 leading-relaxed">{d}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => open({ source: 'kalmykia', topic: 'Регистрация бизнеса в Калмыкии (УСН 1 %)', title: 'Подходит ли вам УСН 1 %?', subtitle: 'Расскажите, откуда вы, какой оборот и вид деятельности — за день дадим честный ответ и расчёт экономии.' })}
                className="rounded-full bg-gold text-night font-bold px-7 py-4 hover:bg-gold-light transition-colors shadow-gold"
              >
                Проверить, подхожу ли я
              </button>
              <button onClick={() => open({ source: 'kalmykia-address', topic: 'Юридический адрес в Калмыкии' })} className="rounded-full glass text-white font-semibold px-7 py-4 hover:bg-white/20 transition-colors">
                Нужен только юрадрес
              </button>
            </div>
          </div>

          {/* Savings card */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
            <div className="hidden md:block absolute -inset-4 bg-gold/20 blur-3xl rounded-full" />
            <div className="relative bg-white text-night rounded-[28px] p-6 md:p-8 shadow-panel">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-[0.15em] uppercase text-gray-400">Пример экономии</span>
                <span className="text-[11px] font-bold bg-steppe/10 text-steppe px-3 py-1 rounded-full">УСН «Доходы»</span>
              </div>
              <div className="mt-5 space-y-4">
                {[
                  { label: 'Выручка за год', v: '12 000 000 ₽' },
                  { label: 'Налог в «обычном» регионе (6 %)', v: '720 000 ₽', muted: true },
                  { label: 'Налог в Калмыкии (1 %)', v: '120 000 ₽', gold: true },
                ].map((r) => (
                  <div key={r.label} className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <span className="text-[15px] text-gray-600">{r.label}</span>
                    <span className={'font-display font-semibold ' + (r.gold ? 'text-gold-dark text-xl' : r.muted ? 'text-gray-400 line-through' : 'text-night')}>{r.v}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-night text-white p-5 flex items-center justify-between">
                <div>
                  <div className="text-[12px] text-white/60">Экономия в год</div>
                  <div className="font-display font-bold text-3xl gold-text">600 000 ₽</div>
                </div>
                <div className="text-right text-[12px] text-white/60 leading-snug">
                  минус бухгалтерия<br />и юрадрес ≈ 150 000 ₽
                </div>
              </div>
              <ul className="mt-5 space-y-2 text-[13px] text-gray-500">
                {['Расчёт иллюстративный; страховые взносы и вычеты считаем отдельно', 'Ставка зависит от даты регистрации и вида деятельности', 'Нужна реальная связь с регионом — поможем оформить правильно'].map((t) => (
                  <li key={t} className="flex gap-2">
                    <Check className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
