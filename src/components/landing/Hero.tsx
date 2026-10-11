import { lazy, Suspense } from 'react'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'
import { Container } from './Container'

const ShaderBackground = lazy(() =>
  import('@/components/ui/halftone-cmyk-newspaper').then((m) => ({ default: m.ShaderBackground })),
)

// Draft copy, kept in one place so it's easy to change.
const HERO_COPY = {
  headline: 'Missed a pill?',
  subheadline: 'Hermod helps your doctor adjust the chill',
  cta: 'See how it works',
}

export function Hero() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section id="home" aria-labelledby="hero-title" className="relative -mt-[60px] overflow-hidden sm:-mt-16">
      <div aria-hidden="true" className="absolute inset-0">
        <Suspense fallback={null}>
          <ShaderBackground className="absolute inset-0" paused={reducedMotion} />
        </Suspense>
        {/* Paper wash: keeps the type on plain ground whatever the halftone does underneath. */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_95%_45%_at_50%_50%,var(--color-page)_40%,transparent_100%)] sm:bg-[radial-gradient(ellipse_60%_55%_at_50%_50%,var(--color-page)_35%,transparent_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-page" />
      </div>

      <Container className="relative flex min-h-[88svh] flex-col items-center justify-center pt-32 pb-24 text-center sm:min-h-[92svh]">
        <h1
          id="hero-title"
          className="font-serif text-[clamp(4.25rem,15vw,6rem)] leading-[0.95] font-semibold tracking-[-0.035em] text-ink"
        >
          Hermod
        </h1>
        <p className="mt-6 font-serif text-[clamp(2rem,6vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-ink italic">
          {HERO_COPY.headline}
        </p>
        <p className="mt-4 max-w-[34ch] text-lead text-ink-soft text-balance sm:text-[21px] sm:leading-8">
          {HERO_COPY.subheadline}
        </p>
        <a
          href="#how"
          className="glass group mt-10 inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-medium text-ink transition-[background-color,box-shadow,scale] duration-200 hover:bg-glass-hover hover:shadow-glass-hover active:scale-[0.98]"
        >
          {HERO_COPY.cta}
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="size-4 transition-transform duration-200 group-hover:translate-y-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 3v10M3.5 8.5 8 13l4.5-4.5" />
          </svg>
        </a>
      </Container>
    </section>
  )
}
