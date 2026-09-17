/** Стилизованная тамга — родовой знак. Логотип-иконка. */
export function TamgaMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="32" cy="22" r="10" />
      <path d="M32 32v18M20 50h24M18 42l14-8 14 8" />
    </svg>
  )
}

export function Logo({ light = false, className = '' }: { light?: boolean; className?: string }) {
  return (
    <a href="#top" className={'flex items-center gap-2.5 ' + className} aria-label="ТАМГА — на главную">
      <span className={'w-9 h-9 rounded-xl flex items-center justify-center ' + (light ? 'bg-gold/15 border border-gold/30' : 'bg-night')}>
        <TamgaMark className="w-5 h-5 text-gold" />
      </span>
      <span className={'font-display font-bold tracking-[0.12em] text-[17px] ' + (light ? 'text-white' : 'text-night')}>ТАМГА</span>
    </a>
  )
}
