import { Container } from './Container'

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#why', label: 'Why' },
  { href: '#how', label: 'How' },
]

export function Nav() {
  return (
    <header className="sticky top-0 z-30 pt-3 sm:pt-4">
      <Container className="flex h-12 justify-center">
        <nav aria-label="Main" className="glass flex h-12 items-center rounded-full p-1">
          <ul className="flex items-center">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block rounded-full px-4 py-2 text-[15px] text-ink-soft transition-[background-color,color,box-shadow] hover:bg-glass-hover hover:text-ink hover:shadow-glass sm:px-5"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  )
}
