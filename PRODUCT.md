# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite + React 19 + TypeScript + Tailwind v4, mirroring the Hermod dashboard (`../hermod/frontend`). Standalone promo site; it does not link to or route into the dashboard.

## Users

Clinic staff and doctors in Australia who want to know whether patients take their medication between visits.

## Product Purpose

Hermod checks medication adherence between appointments. Patients get a friendly check-in on Telegram at each dose time and reply in plain words ("yes", "took the 2pm one, missed 8am", "forgot"). An AI assistant records each dose as taken, late, missed or extra. A dose only counts as taken when the patient clearly says so. The clinic sees adherence per patient on a web dashboard (e.g. "2 of 5 · 40%") and can set up, pause, edit or stop reminders.

## Positioning

No new app for patients: Hermod lives in Telegram, which they already use, and understands plain-language replies.

## Capabilities and Constraints

- Reminders: medication, times per day, start date, duration (days, until a date, or until the next appointment).
- Safety: the assistant never gives dosing advice and refers patients to their doctor or pharmacist. Mentions of overdose or an emergency bypass the AI. The patient gets a fixed message pointing to 000 or Poisons Information (13 11 26), and the clinic gets an urgent flag.
- Status: prototype with fictional demo patients.

## Evidence on Hand

None. No customers, stats, logos or testimonials exist, and none may be invented. A product video will be supplied later.

## Product Principles

1. Plain words over app features.
2. Only count what the patient clearly said.
3. Safety is fixed, not generated.
4. Honest about being a prototype.

## Accessibility & Inclusion

WCAG AA contrast, keyboard focus, reduced-motion support.
