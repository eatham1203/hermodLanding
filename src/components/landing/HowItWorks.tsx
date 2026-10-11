import { useLayoutEffect, useRef, useState, type RefObject } from 'react'
import { useLenis } from 'lenis/react'
import { Safari } from '@/components/ui/safari'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'
import { Container } from './Container'
import { VideoDialog } from './VideoDialog'

/** Product video (public/demo.mp4). Set to null to show the placeholder frame instead. */
export const VIDEO_SRC: string | null = '/demo.mp4'

/** Playback speed for the preview and the full-screen player. */
const VIDEO_SPEED = 1.25

/** Shown in the Safari address bar. A made-up address, so it can't point at anyone's real site. */
const SAFARI_URL = 'hermod.demo'

const STEPS = [
  {
    title: 'Add a patient and set their reminders',
    body: 'Choose the medication, how many times a day, the start date, and how long it runs: a number of days, until a date, or until the next appointment.',
  },
  {
    title: 'They reply on Telegram in plain words',
    body: 'At each dose time the patient gets a friendly check-in. Hermod records every dose as taken, late, missed or extra, and only counts it as taken when the patient clearly says so.',
  },
  {
    title: 'You see adherence on the dashboard',
    body: 'Each patient shows how many doses were taken. Pause, edit or stop their reminders at any time.',
  },
]

/**
 * On desktop the section pins while you scroll through a tall track: the
 * video stays on the left and the steps crossfade on the right. Opacity,
 * drift and the progress bars are driven straight from scroll position each
 * frame (no timed transitions), so they move exactly with Lenis' easing.
 * Below lg everything stacks and all steps are visible.
 */
export function HowItWorks() {
  const trackRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLLIElement | null)[]>([])
  const barRefs = useRef<(HTMLSpanElement | null)[]>([])
  const active = useScrollSteps(trackRef, stepRefs, barRefs, STEPS.length)
  const lenis = useLenis()

  const goTo = (i: number) => {
    const track = trackRef.current
    if (!track) return
    const top = track.getBoundingClientRect().top + window.scrollY
    const segment = (track.offsetHeight - window.innerHeight) / STEPS.length
    const target = top + segment * (i + 0.5)
    if (lenis) lenis.scrollTo(target)
    else window.scrollTo({ top: target })
  }

  return (
    <section id="how" aria-labelledby="how-title" className="border-t border-border bg-surface">
      <div ref={trackRef} className="lg:h-[300svh]">
        <div className="py-24 sm:py-32 lg:sticky lg:top-0 lg:flex lg:h-svh lg:items-center lg:py-0">
          <Container className="grid gap-y-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:grid-rows-[auto_auto] lg:gap-x-16 lg:gap-y-8">
            <h2
              id="how-title"
              className="font-serif text-[clamp(2rem,4.5vw,2.75rem)] leading-[1.1] font-semibold tracking-[-0.02em] lg:col-start-2 lg:row-start-1 lg:self-end"
            >
              How it works
            </h2>

            <div className="lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-center">
              <VideoFrame src={VIDEO_SRC} />
            </div>

            <div className="lg:col-start-2 lg:row-start-2 lg:self-start">
              <div className="mb-8 hidden gap-2 lg:flex">
                {STEPS.map((step, i) => (
                  <button
                    key={step.title}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Step ${i + 1}: ${step.title}`}
                    aria-current={i === active ? 'step' : undefined}
                    className="group rounded-full py-2"
                  >
                    <span className="block h-[3px] w-12 overflow-hidden rounded-full bg-border transition-colors group-hover:bg-border-strong">
                      <span
                        ref={(el) => {
                          barRefs.current[i] = el
                        }}
                        className="block h-full w-full origin-left rounded-full bg-ink"
                        style={{ transform: 'scaleX(0)' }}
                      />
                    </span>
                  </button>
                ))}
              </div>

              <ol className="space-y-12 lg:grid lg:space-y-0">
                {STEPS.map((step, i) => (
                  <li
                    key={step.title}
                    ref={(el) => {
                      stepRefs.current[i] = el
                    }}
                    className="will-change-[opacity,transform] lg:col-start-1 lg:row-start-1"
                  >
                    <h3 className="font-serif text-[1.625rem] leading-[1.25] font-semibold tracking-[-0.01em] text-balance">
                      <span className="mr-3 text-muted tabular-nums">{i + 1}</span>
                      {step.title}
                    </h3>
                    <p className="mt-4 max-w-[46ch] text-body text-muted">{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </Container>
        </div>
      </div>
    </section>
  )
}

const DESKTOP = '(min-width: 1024px)'
const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1)

/**
 * Writes each step's opacity/offset and each bar's fill from scroll progress,
 * straight to the DOM. Returns the step in view (for aria-current).
 */
function useScrollSteps(
  trackRef: RefObject<HTMLDivElement | null>,
  stepRefs: RefObject<(HTMLLIElement | null)[]>,
  barRefs: RefObject<(HTMLSpanElement | null)[]>,
  count: number,
) {
  const [active, setActive] = useState(0)

  useLayoutEffect(() => {
    const mql = window.matchMedia(DESKTOP)
    let raf = 0

    const update = () => {
      raf = 0
      const track = trackRef.current
      if (!track) return
      const steps = stepRefs.current
      const bars = barRefs.current

      if (!mql.matches) {
        steps.forEach((el) => el?.style.removeProperty('opacity'))
        steps.forEach((el) => el?.style.removeProperty('transform'))
        steps.forEach((el) => el?.style.removeProperty('pointer-events'))
        return
      }

      const distance = Math.max(1, track.offsetHeight - window.innerHeight)
      // 0..count across the pinned stretch.
      const p = clamp01(-track.getBoundingClientRect().top / distance) * count

      steps.forEach((el, i) => {
        if (!el) return
        let d = p - (i + 0.5)
        if (i === 0 && d < 0) d = 0
        if (i === count - 1 && d > 0) d = 0
        // Fully visible within ±0.38 of its centre, gone by ±0.62: neighbours overlap at the boundary.
        const opacity = clamp01((0.62 - Math.abs(d)) / 0.24)
        el.style.opacity = String(opacity)
        el.style.transform = `translate3d(0, ${(-d * 28).toFixed(2)}px, 0)`
        el.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none'
      })
      bars.forEach((el, i) => {
        if (el) el.style.transform = `scaleX(${clamp01(p - i).toFixed(3)})`
      })

      setActive(Math.min(Math.floor(p), count - 1))
    }

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    mql.addEventListener('change', schedule)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      mql.removeEventListener('change', schedule)
    }
  }, [trackRef, stepRefs, barRefs, count])

  return active
}

function VideoFrame({ src }: { src: string | null }) {
  const reducedMotion = usePrefersReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [startAt, setStartAt] = useState(0)

  const preview = () => wrapRef.current?.querySelector('video') ?? null

  const openPlayer = () => {
    const video = preview()
    setStartAt(video?.currentTime ?? 0)
    video?.pause()
    setOpen(true)
  }

  const closePlayer = () => {
    setOpen(false)
    if (!reducedMotion) preview()?.play().catch(() => {})
  }

  return (
    <div ref={wrapRef} className="relative">
      <Safari
        url={SAFARI_URL}
        videoSrc={src ?? undefined}
        paused={reducedMotion}
        playbackRate={VIDEO_SPEED}
        role="img"
        aria-label={src ? 'Hermod product walkthrough video' : 'Product video, coming soon'}
      >
        <div className="grid size-full place-items-center rounded-b-[clamp(4px,0.9vw,11px)] bg-page">
          <div className="flex flex-col items-center gap-4">
            <span className="glass grid size-16 place-items-center rounded-full sm:size-20">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="ml-1 size-6 fill-ink sm:size-7">
                <path d="M7 4.5v15a.5.5 0 0 0 .77.42l11.5-7.5a.5.5 0 0 0 0-.84L7.77 4.08A.5.5 0 0 0 7 4.5Z" />
              </svg>
            </span>
            <span className="text-sm text-muted">Video coming soon</span>
          </div>
        </div>
      </Safari>

      {src && (
        <>
          {/* Covers the Safari "screen" (same box as the component's video), so the whole preview opens the player. */}
          <button
            type="button"
            onClick={openPlayer}
            aria-haspopup="dialog"
            className="group absolute z-20 cursor-pointer rounded-b-[clamp(4px,0.9vw,11px)]"
            style={{ left: '0.083%', top: '6.906%', width: '99.75%', height: '92.96%' }}
          >
            <span className="glass absolute right-3 bottom-3 inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium text-ink transition-[background-color,box-shadow] group-hover:bg-glass-hover group-hover:shadow-glass-hover sm:right-4 sm:bottom-4">
              <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 6V2.5H6M10 2.5h3.5V6M13.5 10v3.5H10M6 13.5H2.5V10" />
              </svg>
              Watch full screen
            </span>
          </button>
          <VideoDialog src={src} open={open} startAt={startAt} playbackRate={VIDEO_SPEED} onClose={closePlayer} />
        </>
      )}
    </div>
  )
}
