import { motion } from 'framer-motion'
import { media } from '@/data/media'
import { useLead } from '@/components/LeadModal'

const posts = [
  {
    id: 1,
    image: media.calendar,
    tag: 'Сроки',
    title: 'Налоговый календарь ИП и ООО на 2026 год: что и когда платить',
    description: 'Все даты по УСН, ПСН, взносам, НДФЛ и отчётности в фонды — в одной таблице. Плюс что изменилось с этого года.',
    topic: 'Хочу налоговый календарь 2026',
  },
  {
    id: 2,
    image: media.marketplace,
    tag: 'Маркетплейсы',
    title: 'Как селлеру на Wildberries считать налог, чтобы не переплачивать',
    description: 'С какой суммы платить УСН: до комиссии или после? Что делать с возвратами и удержаниями? Разбираем на цифрах из отчёта.',
    topic: 'Хочу разбор налога для селлера',
  },
  {
    id: 3,
    image: media.office,
    tag: 'Калмыкия',
    title: 'УСН 1 % в Калмыкии: кому подходит, а кому уже нет',
    description: 'Что изменилось с 2025 года, кто получает льготу сразу, а кто попадает в трёхлетний «карантин». Без маркетинга, с ссылками на закон.',
    topic: 'Хочу гайд по УСН 1 % в Калмыкии',
  },
]

export default function Blog() {
  const { open } = useLead()
  return (
    <section id="blog" className="bg-sand py-20 md:py-28 px-4 md:px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-gold-dark">Полезное</span>
            <h2 className="font-display font-semibold text-3xl md:text-[44px] text-night leading-[1.15] mt-4">Разбираем сложное простыми словами</h2>
          </div>
          <a href={'https://t.me/'} target="_blank" rel="noopener" className="bg-night text-white rounded-[12px] px-6 py-3 text-[15px] font-semibold flex items-center gap-2 hover:bg-night-3 transition-colors">
            Telegram-канал <span className="text-[14px] leading-none">↗</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <motion.article key={post.id} whileHover={{ y: -2 }} className="bg-white border border-gray-200 rounded-[14px] p-5 flex flex-col transition-all duration-200 hover:shadow-[0_8px_32px_rgba(10,26,51,0.10)] group">
              <div className="w-full h-[220px] rounded-[10px] overflow-hidden mb-[18px] relative">
                <img src={post.image} alt={post.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider bg-white/90 text-night px-2.5 py-1 rounded-full">{post.tag}</span>
              </div>
              <h3 className="font-display font-semibold text-[17px] text-night leading-[1.4] mb-2.5">{post.title}</h3>
              <p className="text-[14px] text-gray-500 leading-[1.6] mb-5 line-clamp-3">{post.description}</p>
              <div className="mt-auto">
                <button onClick={() => open({ source: 'blog', topic: post.topic, title: 'Пришлём материал в мессенджер', subtitle: 'Оставьте контакт — отправим статью и ответим на вопросы по ней.', cta: 'Получить материал' })} className="text-[14px] font-semibold text-night inline-flex items-center gap-1.5 hover:underline">
                  Получить разбор <span className="text-[16px] leading-none text-gold-dark">↳</span>
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
