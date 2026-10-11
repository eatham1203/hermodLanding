import { lazy, Suspense, useEffect, useRef, useState, type RefObject } from 'react'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

const CrowdCanvas = lazy(() => import('@/components/ui/skiper39').then((m) => ({ default: m.CrowdCanvas })))

const CLOSING_LINE = 'Every one of them is a patient between visits.'

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
    <div ref={ref} className="relative h-[560px] overflow-hidden sm:h-[min(100svh,880px)] sm:min-h-[640px]">
      <div className="relative z-10 flex flex-col items-center px-5 pt-24 text-center sm:pt-32">
        <p className="max-w-[24ch] font-serif text-[clamp(2.25rem,5.5vw,3.5rem)] leading-[1.08] tracking-[-0.02em] text-ink text-balance">
          {CLOSING_LINE}
        </p>
        <span aria-hidden="true" className="mt-6 h-16 w-px bg-gradient-to-b from-border-strong to-transparent" />
      </div>

      <div
        role="img"
        aria-label="A hand-drawn crowd of everyday people walking past"
        className="absolute inset-x-0 bottom-0 h-[72%]"
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
