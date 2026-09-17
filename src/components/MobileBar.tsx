import { Phone, MessageCircle, Send, FileText } from 'lucide-react'
import { site, waLink, tgLink } from '@/config/site'
import { useLead } from './LeadModal'
import { MaxIcon } from './MaxIcon'

/** Липкая панель действий на мобильных: позвонить / WhatsApp / Telegram / заявка */
export default function MobileBar() {
  const { open } = useLead()
  const item = 'flex-1 flex flex-col items-center justify-center gap-1 py-2 text-[10px] font-semibold'
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-[90] px-3 pb-[max(env(safe-area-inset-bottom),12px)] pointer-events-none">
      <div className="pointer-events-auto flex bg-night/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-panel text-white overflow-hidden">
        <a href={site.phoneHref} className={item}><Phone className="w-5 h-5 text-gold" />Позвонить</a>
        <a href={waLink()} target="_blank" rel="noopener" className={item}><MessageCircle className="w-5 h-5 text-[#25D366]" />WhatsApp</a>
        <a href={tgLink()} target="_blank" rel="noopener" className={item}><Send className="w-5 h-5 text-[#2AABEE]" />Telegram</a>
        <a href={site.max} target="_blank" rel="noopener" className={item}><MaxIcon className="w-5 h-5 text-[#8B7CFF]" />MAX</a>
        <button type="button" onClick={() => open({ source: 'mobile-bar', topic: 'Заявка с мобильной панели' })} className={item + ' bg-gold text-night'}><FileText className="w-5 h-5" />Заявка</button>
      </div>
    </div>
  )
}
