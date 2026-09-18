import { media } from '@/data/media'

/** Фирменная марка — стилизованная «Т» из логотипа заказчика (без фона). */
export function TamgaMark({ className, variant = 'gold' }: { className?: string; variant?: 'gold' | 'white' | 'blue' }) {
  const src = variant === 'white' ? media.markWhite : variant === 'blue' ? media.markBlue : media.markGold
  return <img src={src} alt="" aria-hidden className={className} draggable={false} />
}

/** Полный логотип «ТАМГА офис-центр». light — белая версия для тёмного фона. */
export function Logo({ light = false, className = '' }: { light?: boolean; className?: string }) {
  return (
    <a href={import.meta.env.BASE_URL} className={'flex items-center ' + className} aria-label="ТамгаБух — на главную">
      <img
        src={light ? media.logoWhite : media.logoBlue}
        alt="ТАМГА офис-центр"
        className="h-10 md:h-11 w-auto select-none"
        draggable={false}
      />
    </a>
  )
}
