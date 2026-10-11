import { Container } from './Container'

const PROBLEMS = [
  {
    question: 'Does your patient keep forgetting their medication?',
    detail: 'Hermod sends a short check-in at each dose time, so a forgotten dose is noticed the same day, not weeks later.',
  },
  {
    question: 'Do you only find out at the next appointment?',
    detail: 'Replies are recorded as they arrive, so you can see how the weeks between visits actually went.',
  },
  {
    question: 'Do your patients struggle with yet another health app?',
    detail: 'Hermod lives in Telegram, which they already use. There is no new app to download or log in to.',
  },
]

export function Why() {
  return (
    <section id="why" aria-labelledby="why-title" className="py-24 sm:py-32">
      <Container className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16">
        <h2
          id="why-title"
          className="font-serif text-[clamp(2rem,4.5vw,2.75rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-balance md:sticky md:top-24 md:self-start"
        >
          The weeks between visits
        </h2>

        <ol className="border-b border-border">
          {PROBLEMS.map((item, i) => (
            <li key={item.question} className="grid grid-cols-[2.25rem_1fr] gap-x-3 border-t border-border py-8 sm:grid-cols-[3rem_1fr] sm:py-10">
              <span aria-hidden="true" className="font-serif text-2xl leading-9 text-muted tabular-nums sm:text-[1.75rem]">
                {i + 1}
              </span>
              <div>
                <p className="font-serif text-2xl leading-9 tracking-[-0.01em] text-ink text-pretty sm:text-[1.75rem] sm:leading-10">
                  {item.question}
                </p>
                <p className="mt-3 max-w-[60ch] text-body text-muted">{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
