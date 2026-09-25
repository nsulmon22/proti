import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent } from 'react'
import { Link, useNavigate, useNavigationType } from 'react-router-dom'
import { Button, DietaryChips, Icon, RecipeCard } from '../design-system'
import { SearchBox, type Suggestion } from '../components/SearchBox'
import { UserButton } from '../components/UserButton'
import { useAuth } from '../context/AuthContext'
import type { IngredientIndex } from '../hooks/useIngredientIndex'
import { loadHomeView, orderForSession, saveHomeView } from '../lib/homeSession'
import type { Recipe } from '../lib/recipes'
import protiLogo from '../assets/proti-mark.png'
import protiBg from '../assets/logo.png'

interface HomePageProps {
  recipes: Recipe[]
  saved: string[]
  toggleSave: (id: string) => void
  tried: string[]
  userRecipesLoading: boolean
  ingredientIndex: IngredientIndex
}

type TriedFilter = 'not_tried' | 'tried' | null

const PAGE_SIZE = 12

const TRIED_OPTIONS = [
  { value: 'not_tried', label: '🕓 Nog niet gemaakt' },
  { value: 'tried', label: '✅ Al gemaakt' },
]

const CATEGORY_EMOJI: Record<string, string> = {
  Breakfast: '🍳',
  Main: '🍛',
  Salad: '🥗',
  'Snack/Dessert': '🍰',
  Soup: '🍲',
}

const DIET_EMOJI: Record<string, string> = {
  'Nut-free': '🥜',
  'Dairy-free': '🥛',
  'Gluten-free': '🌾',
  'Meat-free': '🥦',
  Vegan: '🌱',
  Vegetarian: '🥕',
}

const headingStyle: CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: 'var(--size-heading-m)',
  fontWeight: 600,
}

function SectionHeading({ children }: { children: string }) {
  return <h2 style={{ ...headingStyle, marginBottom: 24 }}>{children}</h2>
}

const FAVORITES_OPEN_KEY = 'proti:favorites-open'

function readFavoritesOpen() {
  try {
    return localStorage.getItem(FAVORITES_OPEN_KEY) !== 'false'
  } catch {
    return true
  }
}

// A section heading that folds its section open and closed. The choice is remembered on this device.
function CollapsibleHeading({
  children,
  count,
  open,
  onToggle,
  controls,
}: {
  children: string
  count: number
  open: boolean
  onToggle: () => void
  controls: string
}) {
  return (
    <h2 style={{ ...headingStyle, marginBottom: open ? 24 : 0 }}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={controls}
        onClick={onToggle}
        className="flex items-center gap-3"
        style={{ font: 'inherit', color: 'inherit', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
      >
        {children}
        <span
          style={{
            fontFamily: 'var(--font-text)',
            fontSize: 'var(--size-body-s)',
            fontWeight: 600,
            color: 'var(--text-muted)',
            background: 'var(--surface-sunken)',
            borderRadius: 'var(--radius-pill)',
            padding: '2px 10px',
          }}
        >
          {count}
        </span>
        <Icon
          name="chevron-down"
          size={20}
          className="collapse-chevron"
          style={{
            color: 'var(--text-muted)',
            transform: open ? 'none' : 'rotate(-90deg)',
          }}
        />
      </button>
    </h2>
  )
}

function startsWithFirst(a: string, b: string, q: string) {
  return Number(b.toLowerCase().startsWith(q)) - Number(a.toLowerCase().startsWith(q))
}

export function HomePage({
  recipes,
  saved,
  toggleSave,
  tried,
  userRecipesLoading,
  ingredientIndex,
}: HomePageProps) {
  const navigate = useNavigate()
  const navigationType = useNavigationType()
  const { user, initializing } = useAuth()

  // Search/filter/paging state survives leaving the page (e.g. to a recipe
  // detail) and coming back, for the length of the browser session.
  const [initialView] = useState(loadHomeView)
  const [query, setQuery] = useState(initialView.query)
  const [triedFilter, setTriedFilter] = useState<TriedFilter>(initialView.triedFilter)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialView.categories)
  const [selectedDiets, setSelectedDiets] = useState<string[]>(initialView.diets)
  const [visibleCount, setVisibleCount] = useState(initialView.visibleCount)
  const [favoritesOpen, setFavoritesOpen] = useState(readFavoritesOpen)

  const toggleFavorites = () => {
    const next = !favoritesOpen
    setFavoritesOpen(next)
    try {
      localStorage.setItem(FAVORITES_OPEN_KEY, String(next))
    } catch {
      // Storage unavailable: the section just opens again next time.
    }
  }

  const recipesLoaded = !recipes.some((r) => r.id.startsWith('fallback-'))

  useEffect(() => {
    saveHomeView({ query, triedFilter, categories: selectedCategories, diets: selectedDiets, visibleCount })
  }, [query, triedFilter, selectedCategories, selectedDiets, visibleCount])

  // "Not yet made" / "Already made" only make sense for a signed-in user.
  useEffect(() => {
    if (!initializing && !user) setTriedFilter(null)
  }, [initializing, user])

  // Coming back with the browser's back button: return to where you were.
  const restoredScroll = useRef(false)
  useLayoutEffect(() => {
    if (restoredScroll.current || navigationType !== 'POP' || !recipesLoaded) return
    restoredScroll.current = true
    window.scrollTo(0, initialView.scrollY)
    saveHomeView({ scrollY: 0 })
  }, [navigationType, recipesLoaded, initialView.scrollY])

  const openRecipe = (id: string) => {
    saveHomeView({ scrollY: window.scrollY })
    navigate(`/recipe/${id}`)
  }

  // The logo always leads back to the plain home page: no search, no filters, at the top.
  const goHome = (e: MouseEvent) => {
    e.preventDefault()
    setQuery('')
    setTriedFilter(null)
    setSelectedCategories([])
    setSelectedDiets([])
    setVisibleCount(PAGE_SIZE)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  // Every change to the query or a filter starts again at page one.
  const changeQuery = (value: string) => {
    setQuery(value)
    setVisibleCount(PAGE_SIZE)
  }
  const changeTried = (next: string[]) => {
    setTriedFilter((next.find((v) => v !== triedFilter) as TriedFilter | undefined) ?? null)
    setVisibleCount(PAGE_SIZE)
  }
  const changeCategories = (next: string[]) => {
    setSelectedCategories(next)
    setVisibleCount(PAGE_SIZE)
  }
  const changeDiets = (next: string[]) => {
    setSelectedDiets(next)
    setVisibleCount(PAGE_SIZE)
  }

  // `saved` is already ordered newest-favorited-first — keep that order.
  const favoriteRecipes = saved
    .map((id) => recipes.find((r) => r.id === id))
    .filter((r): r is Recipe => r != null)

  const categoryOptions = useMemo(
    () =>
      Array.from(new Set(recipes.map((r) => r.category).filter((c): c is string => !!c)))
        .sort()
        .map((c) => ({ value: c, label: `${CATEGORY_EMOJI[c] ?? '🍽️'} ${c}` })),
    [recipes],
  )

  // Only offer dietary filters for tags that actually occur in the data.
  const dietOptions = useMemo(
    () =>
      Array.from(new Set(recipes.flatMap((r) => r.tags)))
        .sort()
        .map((t) => ({ value: t, label: `${DIET_EMOJI[t] ?? '🍴'} ${t}` })),
    [recipes],
  )

  // Random order, fixed for the whole browser session (see homeSession.ts).
  const orderedRecipes = useMemo(() => orderForSession(recipes), [recipes])

  const searchText = useMemo(
    () =>
      new Map(
        recipes.map((r) => [
          r.id,
          [r.title, r.category ?? '', ...r.tags, ...(ingredientIndex[r.id] ?? [])].join(' ').toLowerCase(),
        ]),
      ),
    [recipes, ingredientIndex],
  )

  const ingredientNames = useMemo(() => {
    const unique = new Map<string, string>()
    for (const name of Object.values(ingredientIndex).flat()) {
      if (!unique.has(name.toLowerCase())) unique.set(name.toLowerCase(), name)
    }
    return [...unique.values()]
  }, [ingredientIndex])

  const q = query.trim().toLowerCase()
  const suggestions = useMemo<Suggestion[]>(() => {
    if (!q) return []
    const recipeMatches = recipes
      .map((r) => r.title)
      .filter((t) => t.toLowerCase().includes(q))
      .sort((a, b) => startsWithFirst(a, b, q))
      .slice(0, 5)
      .map((text) => ({ text, kind: 'Recipe' as const }))
    const ingredientMatches = ingredientNames
      .filter((n) => n.toLowerCase().includes(q))
      .sort((a, b) => startsWithFirst(a, b, q))
      .slice(0, 3)
      .map((text) => ({ text, kind: 'Ingredient' as const }))
    return [...recipeMatches, ...ingredientMatches]
  }, [q, recipes, ingredientNames])

  const tokens = q.split(/\s+/).filter(Boolean)
  const filteredRecipes = orderedRecipes.filter((r) => {
    if (triedFilter === 'not_tried' && tried.includes(r.id)) return false
    if (triedFilter === 'tried' && !tried.includes(r.id)) return false
    if (selectedCategories.length > 0 && !selectedCategories.includes(r.category ?? '')) return false
    if (selectedDiets.length > 0 && !selectedDiets.every((d) => r.tags.includes(d))) return false
    if (tokens.length > 0) {
      const haystack = searchText.get(r.id) ?? ''
      if (!tokens.every((t) => haystack.includes(t))) return false
    }
    return true
  })
  const shownRecipes = filteredRecipes.slice(0, visibleCount)
  const hasMore = filteredRecipes.length > visibleCount

  const searching = tokens.length > 0 || triedFilter !== null || selectedCategories.length > 0 || selectedDiets.length > 0

  return (
    <div className="relative min-h-screen">
      <div className="app-bg" style={{ backgroundImage: `url(${protiBg})` }} />
      <div className="relative mx-auto max-w-5xl px-6 py-10 md:px-10">
        <header className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link to="/" className="brand-link" onClick={goHome}>
            <img src={protiLogo} alt="" className="h-8 w-8 object-contain" />
            <span
              style={{ fontFamily: 'var(--font-display)', letterSpacing: 'var(--tracking-tight)' }}
              className="text-2xl font-semibold"
            >
              Proti
            </span>
          </Link>
          <UserButton />
        </header>

        <div className="mb-8">
          <SearchBox
            value={query}
            onChange={changeQuery}
            suggestions={suggestions}
            placeholder="Search recipes or ingredients…"
          />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {user && (
              <DietaryChips
                style={{ display: 'contents' }}
                options={TRIED_OPTIONS}
                value={triedFilter ? [triedFilter] : []}
                onChange={changeTried}
              />
            )}
            {categoryOptions.length > 0 && (
              <DietaryChips
                style={{ display: 'contents' }}
                options={categoryOptions}
                value={selectedCategories}
                onChange={changeCategories}
              />
            )}
            {dietOptions.length > 0 && (
              <DietaryChips
                style={{ display: 'contents' }}
                options={dietOptions}
                value={selectedDiets}
                onChange={changeDiets}
              />
            )}
          </div>
        </div>

        {user && userRecipesLoading && (
          <section className="mb-10" aria-busy="true" aria-label="Loading favorites">
            <SectionHeading>Favorites</SectionHeading>
            <div
              className="animate-pulse"
              style={{ height: 124, borderRadius: 'var(--radius-card)', background: 'var(--surface-sunken)' }}
            />
          </section>
        )}

        {user && !userRecipesLoading && favoriteRecipes.length > 0 && (
          <section className="mb-10">
            <CollapsibleHeading
              count={favoriteRecipes.length}
              open={favoritesOpen}
              onToggle={toggleFavorites}
              controls="favorites-list"
            >
              Favorites
            </CollapsibleHeading>
            <div id="favorites-list" className="flex flex-col gap-3" hidden={!favoritesOpen}>
              {favoriteRecipes.map((r) => (
                <RecipeCard
                  key={r.id}
                  layout="horizontal"
                  title={r.title}
                  image={r.image}
                  minutes={r.minutes}
                  protein={r.protein}
                  calories={r.calories}
                  servings={r.servings}
                  tint={r.tint}
                  tags={r.tags}
                  saved
                  onSave={() => toggleSave(r.id)}
                  onClick={() => openRecipe(r.id)}
                />
              ))}
            </div>
          </section>
        )}

        <section className="mb-8">
          <SectionHeading>{searching ? 'Search results' : 'Daily Inspiration'}</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {shownRecipes.map((r) => (
              <RecipeCard
                key={r.id}
                title={r.title}
                image={r.image}
                minutes={r.minutes}
                protein={r.protein}
                calories={r.calories}
                servings={r.servings}
                tint={r.tint}
                tags={r.tags}
                saved={saved.includes(r.id)}
                onSave={() => toggleSave(r.id)}
                onClick={() => openRecipe(r.id)}
              />
            ))}
            {shownRecipes.length === 0 && (
              <p className="col-span-full" style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                No recipes match your search.
              </p>
            )}
          </div>
          {hasMore && (
            <div className="flex justify-center mt-6">
              <Button variant="tertiary" onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}>
                Load more
              </Button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
