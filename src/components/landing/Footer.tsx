import { lazy, Suspense, useEffect, useRef, useState, type RefObject } from 'react'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

const CrowdCanvas = lazy(() => import('@/components/ui/skiper39').then((m) => ({ default: m.CrowdCanvas })))

const CLOSING_LINE = 'Every one of them is a patient between visits.'

// WHO, Adherence to long-term therapies: evidence for action (2003), executive summary.
const STAT_SOURCE = {
  label: 'Source: WHO, 2003',
  href: 'https://iris.who.int/handle/10665/42682',
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <CrowdScene />
    </footer>
  )
}

/** The closing line hangs above a crowd walking along the bottom of the page. */
function CrowdScene() {
  const ref = useRef<HTMLDivElement>(null)
  const near = useNearViewport(ref)
  const reducedMotion = usePrefersReducedMotion()

  return (
    <div ref={ref} className="relative h-[700px] overflow-hidden sm:h-[740px] lg:h-[min(100svh,880px)] lg:min-h-[680px]">
      <div className="relative z-10 flex flex-col items-center px-5 pt-24 text-center sm:pt-32">
        <p className="max-w-[24ch] font-serif text-[clamp(2.25rem,5.5vw,3.5rem)] leading-[1.08] tracking-[-0.02em] text-ink text-balance">
          {CLOSING_LINE}
        </p>
        <p className="mt-4 font-serif text-[clamp(1.25rem,2.6vw,1.625rem)] leading-snug text-muted italic text-balance">
          About half won’t take their medication as prescribed.
        </p>
        <a
          href={STAT_SOURCE.href}
          target="_blank"
          rel="noreferrer"
          className="mt-3 text-xs text-muted underline underline-offset-2 hover:text-ink"
        >
          {STAT_SOURCE.label}
        </a>
        <span aria-hidden="true" className="mt-6 h-16 w-px bg-gradient-to-b from-border-strong to-transparent" />
      </div>

      <div
        role="img"
        aria-label="A hand-drawn crowd of everyday people walking past"
        className="absolute inset-x-0 bottom-0 h-1/2 sm:h-[68%]"
      >
        {near && (
          <Suspense fallback={null}>
            <CrowdCanvas
              src="/illustrations/open-peeps-crowd.png"
              rows={15}
              cols={7}
              paused={reducedMotion}
              className="absolute inset-0 size-full"
            />
          </Suspense>
        )}
      </div>
    </div>
  )
}

/** Becomes true once the element is within a screen of the viewport, then stays true. */
function useNearViewport(ref: RefObject<HTMLElement | null>) {
  const [near, setNear] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || near) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setNear(true)
      },
      { rootMargin: '100% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, near])
  return near
}
