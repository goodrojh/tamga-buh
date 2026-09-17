import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import { articles } from '@/data/articles'
import { useArticle } from '@/components/ArticleModal'
import { site } from '@/config/site'

export default function Blog() {
  const { openArticle } = useArticle()
  return (
    <section id="blog" className="bg-sand py-20 md:py-28 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div className="max-w-2xl">
            <h2 className="font-display font-semibold text-3xl md:text-[44px] text-night leading-[1.15]">Разбираем сложное простыми словами</h2>
          </div>
          <a href={site.social.telegramChannel} target="_blank" rel="noopener" className="bg-night text-white rounded-[12px] px-6 py-3 text-[15px] font-semibold flex items-center gap-2 hover:bg-night-3 transition-colors">
            Telegram-канал <span className="text-[14px] leading-none">↗</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((post) => (
            <motion.article
              key={post.id}
              whileHover={{ y: -2 }}
              onClick={() => openArticle(post.id)}
              className="bg-white border border-gray-200 rounded-[14px] p-5 flex flex-col cursor-pointer transition-all duration-200 hover:shadow-[0_8px_32px_rgba(10,26,51,0.10)] group"
            >
              <div className="w-full h-[220px] rounded-[10px] overflow-hidden mb-[18px] relative">
                <img src={post.image} alt={post.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider bg-white/90 text-night px-2.5 py-1 rounded-full">{post.tag}</span>
                <span className="absolute top-3 right-3 text-[11px] font-semibold bg-night/70 text-white px-2.5 py-1 rounded-full inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
              </div>
              <h3 className="font-display font-semibold text-[17px] text-night leading-[1.4] mb-2.5">{post.title}</h3>
              <p className="text-[14px] text-gray-500 leading-[1.6] mb-5 line-clamp-3">{post.lead}</p>
              <div className="mt-auto">
                <button type="button" className="text-[14px] font-semibold text-night inline-flex items-center gap-1.5 group-hover:underline">
                  Читать <span className="text-[16px] leading-none text-gold-dark">↳</span>
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
