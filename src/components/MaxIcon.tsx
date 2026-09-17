/** Иконка мессенджера MAX (упрощённая, монохромная) */
export function MaxIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="2" />
      <path d="M7 16V8l5 5 5-5v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
