import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Clock, ArrowLeft } from 'lucide-react'
import { articles, type Article } from '@/data/articles'
import { useLead } from './LeadModal'

interface ArticleCtx {
  openArticle: (id: string) => void
}
const Ctx = createContext<ArticleCtx>({ openArticle: () => {} })
export const useArticle = () => useContext(Ctx)

export function ArticleProvider({ children }: { children: React.ReactNode }) {
  const [id, setId] = useState<string | null>(null)
  const openArticle = useCallback((a: string) => setId(a), [])
  const value = useMemo(() => ({ openArticle }), [openArticle])
  const article = articles.find((a) => a.id === id) ?? null
  return (
    <Ctx.Provider value={value}>
      {children}
      <AnimatePresence>{article && <ArticleView key={article.id} article={article} onClose={() => setId(null)} />}</AnimatePresence>
    </Ctx.Provider>
  )
}

function ArticleView({ article, onClose }: { article: Article; onClose: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { open } = useLead()

  useEffect(() => {
    // Статья всегда открывается с начала
    scrollRef.current?.scrollTo({ top: 0 })
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, article.id])

  return (
    <motion.div className="fixed inset-0 z-[95] flex items-end sm:items-center justify-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
      <div className="absolute inset-0 bg-night/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        ref={scrollRef}
        role="dialog"
        aria-modal="true"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0, transition: { duration: 0.12 } }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative w-full lg:max-w-[860px] h-[calc(100%-12px)] sm:h-full bg-white rounded-t-[24px] sm:rounded-[24px] shadow-panel overflow-y-auto overscroll-contain"
      >
        <div className="sticky top-0 z-20 flex items-center justify-between gap-3 px-4 sm:px-6 py-3 bg-white/90 backdrop-blur-md border-b border-gray-100">
          <button type="button" onClick={onClose} className="inline-flex items-center gap-2 text-sm font-semibold text-night hover:text-gold-dark">
            <ArrowLeft className="w-4 h-4" /> Назад
          </button>
          <button type="button" onClick={onClose} aria-label="Закрыть" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center touch-manipulation">
            <X className="w-5 h-5 text-night" />
          </button>
        </div>

        <div className="relative h-[220px] sm:h-[300px]">
          <img src={article.image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-night/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 text-white">
            <span className="inline-flex text-[11px] font-bold uppercase tracking-wider bg-gold text-night px-2.5 py-1 rounded-full">{article.tag}</span>
            <h1 className="font-display font-semibold text-2xl sm:text-4xl leading-tight mt-3">{article.title}</h1>
            <p className="text-white/70 text-[13px] mt-2 inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {article.readTime} чтения
            </p>
          </div>
        </div>

        <article className="px-5 sm:px-8 py-6 sm:py-8 max-w-[680px] mx-auto">
          <p className="text-lg text-gray-600 leading-relaxed">{article.lead}</p>
          {article.body.map((b, i) => {
            if (b.type === 'h') return <h2 key={i} className="font-display font-semibold text-xl text-night mt-8 mb-3">{b.text}</h2>
            if (b.type === 'p') return <p key={i} className="text-[16px] text-gray-700 leading-[1.75] mb-4">{b.text}</p>
            if (b.type === 'ul')
              return (
                <ul key={i} className="space-y-2 mb-4">
                  {b.items.map((it) => (
                    <li key={it} className="flex gap-3 text-[16px] text-gray-700 leading-[1.7]">
                      <span className="mt-[11px] w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                      {it}
                    </li>
                  ))}
                </ul>
              )
            return (
              <div key={i} className="my-6 rounded-2xl bg-sand border-l-4 border-gold p-4 sm:p-5 text-[15px] text-night leading-relaxed">
                {b.text}
              </div>
            )
          })}

          <div className="mt-10 rounded-[24px] bg-night text-white p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-gold/25 rounded-full blur-3xl" />
            <h3 className="font-display font-semibold text-xl relative">Разберём вашу ситуацию</h3>
            <p className="text-white/70 mt-2 text-[15px] relative">Бухгалтер посмотрит ваши цифры и скажет, что делать. Первые 15 минут — бесплатно.</p>
            <button
              type="button"
              onClick={() => open({ source: 'article-' + article.id, topic: article.ctaTopic })}
              className="relative mt-5 rounded-full bg-gold text-night font-bold px-6 py-3.5 hover:bg-gold-light transition-colors"
            >
              Получить консультацию
            </button>
          </div>
        </article>
      </motion.div>
    </motion.div>
  )
}
