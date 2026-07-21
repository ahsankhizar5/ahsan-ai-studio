# Whole-branch review fixes report

Base: `59e1107`

Branch: `codex/unified-homepage-redesign`

## Outcome

All four Important integration findings and both Minor cleanup findings from the final whole-branch review are fixed. The approved content, palette, fonts, hierarchy, responsive visual intent, homepage portrait exclusion, About portrait treatment, and existing project/video/process presentation remain unchanged.

## Files changed

- `app/components/SiteHeader.tsx`
- `app/components/ProjectStage.tsx`
- `app/components/MotionController.tsx`
- `app/globals.css`
- `app/page.tsx`
- `tests/browser-audit.mjs`
- `tests/rendered-html.test.mjs`
- `.superpowers/sdd/final-review-fixes-report.md`

## Finding-to-fix mapping

### 1. Preserve all projects without JavaScript

`ProjectStage` now server-renders with its complete stacked project sequence as the CSS default at every width. A component-local `data-enhanced` hydration marker is applied only after a client animation frame; the desktop/tablet tabs replace the stack only under the `min-width: 768px` enhanced selector. Reduced-motion behavior and the existing keyboard-operable tab behavior are preserved.

Regression coverage disables JavaScript at 375px, 768px, and 1024px and verifies that all four factual project articles are visible. Hydrated 768px and 1024px coverage continues to verify four tabs and keyboard selection.

### 2. Keep hero glass until the hero is left

The header no longer uses a 12px scroll threshold. Home now observes `.cinematic-hero` with `IntersectionObserver` and derives the solid state from the hero's measured bottom boundary. If the observer or hero is unavailable, passive scroll/resize listeners use the same measured-bounds calculation. Animation frames, observer, and fallback listeners are all cleaned up. About initializes with the solid state on the server and remains solid from first render.

Browser coverage verifies glass while 100px of the hero remains and solid immediately after the hero bottom passes the viewport boundary. Both About viewports assert the initial solid class.

### 3. Complete enhanced mobile navigation and focus behavior

The hydrated open state expands the header/menu surface to a full `100dvh` panel while the pre-enhancement/no-JS menu retains its existing usable dropdown presentation. The page is not body-locked, so no persistent scroll trap is introduced. Opening moves focus to the first navigation link. Escape handled from inside the panel closes it and restores focus to the menu trigger; normal link navigation closes without stealing destination focus. Existing labels, `aria-expanded`, `aria-controls`, 44px targets, focus styles, and route targets remain intact.

Mobile browser coverage verifies viewport-height panel geometry, first-link focus, Escape from that link, restored trigger focus, and open/close accessible-name and expanded-state transitions.

### 4. Correct the credibility rail

The rail is now derived from `profile.education`, the roles in `experience`, and both `recognition[0]` and `recognition[1]`. The certification substitution and unused `certifications` import were removed. The server-render contract scopes its assertions to the rail, verifies four entries and both competition signals, and rejects the former certification entry.

### 5. Consolidate mobile cinematic-hero rules

The overlapping cinematic rules formerly split between `max-width: 760px` and `max-width: 767px` are consolidated into the authoritative `max-width: 767px` block. The effective 767px height, minimum height, copy offset, and title sizing are unchanged; the mobile image position, vignette, supporting copy, action widths, and capability-rail rules were moved into the same block. Source coverage rejects a cinematic hero inside a 760px block and verifies the authoritative values.

### 6. Make optional motion imports rejection-safe

`MotionController` catches rejected GSAP/ScrollTrigger setup and emits only a nonfatal warning while preserving observer/unmount cleanup. `ProjectStage` catches rejected GSAP imports while preserving its active flag and context reversion. Since animation styles are applied only after successful imports, failed enhancement leaves the static pipeline and active project visible.

Source coverage requires both catch paths. Browser coverage aborts GSAP/ScrollTrigger asset requests, then verifies there is no unhandled `pageerror`, the selected PIGEON panel remains usable, and the pipeline heading remains visible.

## Validation evidence

- `npm run lint` — passed.
- `npm test` — passed production build and 7/7 rendered/source tests.
- `npm run test:all` — passed lint, production build, rendered/source tests, all browser audits, and all axe audits.
- Browser widths — homepage 375, 390, 768, 1024, and 1440; About 390 and 1440; no horizontal overflow or unlabeled controls.
- Focused resilience — no-JS 375/768/1024, hero boundary, About initial header, full-height mobile menu, first-link focus, Escape focus restoration, reduced motion, deferred motion, and rejected optional imports all passed.
- Axe — home desktop 41 checks, home mobile 35 checks, About desktop 38 checks, About mobile 38 checks; zero violations.
- Exact Task 8 Impeccable detector command returned `[]`.
- Visual review — generated 375px and 768px full-page artifacts retained the approved hierarchy, typography, palette, and no-overflow layout.
- `git diff --check` — passed.

## Self-review

- Confirmed all six review findings have implementation and regression coverage.
- Confirmed no hero/support copy, project facts, recognition facts, palette tokens, font choices, portrait placement, or one-person hierarchy were redesigned.
- Confirmed no dependency, deployment, publishing, Sites-history change, or parent-checkout change was made.
- Confirmed motion remains optional and reduced-motion visitors still avoid GSAP downloads.
- Confirmed the task diff is limited to the listed integration source/tests plus this report.

## Concerns

None unresolved.
