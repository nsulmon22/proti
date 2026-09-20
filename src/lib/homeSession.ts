// Homepage state that lives for one browser session (sessionStorage): the
// random recipe order and the current search/filter/scroll state. Surviving
// navigation to a detail page and back — and a page refresh — but not a new
// session (new tab, browser restarted).

const ORDER_KEY = 'proti:home-order'
const VIEW_KEY = 'proti:home-view'

export function shuffled<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = sessionStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function writeJson(key: string, value: unknown) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value))
  } catch {
    // sessionStorage unavailable (private mode / quota) — session order just won't persist.
  }
}

// Returns `items` in this session's stable random order. The first call of a
// session shuffles and stores the order; later calls reuse it. Items that
// weren't known yet (new recipes) are shuffled onto the end.
export function orderForSession<T extends { id: string }>(items: T[]): T[] {
  const stored = readJson<string[]>(ORDER_KEY, [])
  const byId = new Map(items.map((item) => [item.id, item]))
  const known = stored.filter((id) => byId.has(id))
  const knownIds = new Set(known)
  const fresh = items.filter((item) => !knownIds.has(item.id))

  const ordered =
    known.length === 0 ? shuffled(items) : [...known.map((id) => byId.get(id)!), ...shuffled(fresh)]

  // Placeholder data (shown only while the real recipes load) must never be stored.
  if (!items.some((item) => item.id.startsWith('fallback-'))) {
    writeJson(ORDER_KEY, ordered.map((item) => item.id))
  }
  return ordered
}

export interface HomeView {
  query: string
  triedFilter: 'not_tried' | 'tried' | null
  categories: string[]
  diets: string[]
  visibleCount: number
  scrollY: number
}

export const DEFAULT_HOME_VIEW: HomeView = {
  query: '',
  triedFilter: null,
  categories: [],
  diets: [],
  visibleCount: 12,
  scrollY: 0,
}

export function loadHomeView(): HomeView {
  return { ...DEFAULT_HOME_VIEW, ...readJson<Partial<HomeView>>(VIEW_KEY, {}) }
}

export function saveHomeView(patch: Partial<HomeView>) {
  writeJson(VIEW_KEY, { ...loadHomeView(), ...patch })
}
