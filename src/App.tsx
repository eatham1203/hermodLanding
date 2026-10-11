import 'lenis/dist/lenis.css'
import { ReactLenis } from 'lenis/react'
import { Footer } from '@/components/landing/Footer'
import { Hero } from '@/components/landing/Hero'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { Nav } from '@/components/landing/Nav'
import { Why } from '@/components/landing/Why'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

export default function App() {
  const reducedMotion = usePrefersReducedMotion()

  const page = (
    <>
      <Nav />
      <main>
        <Hero />
        <Why />
        <HowItWorks />
      </main>
      <Footer />
    </>
  )

  // Smooth (eased) scrolling for the whole page, including the nav's anchor
  // links. Skipped under reduced motion so scrolling stays native.
  if (reducedMotion) return page
  return (
    <ReactLenis root options={{ lerp: 0.1, anchors: true }}>
      {page}
    </ReactLenis>
  )
}
