import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Badge, Button, Card, Icon, IconButton, MacroBar, TimePill } from '../design-system'
import { UserButton } from '../components/UserButton'
import { NotFound } from '../components/NotFound'
import { PageSpinner } from '../components/Spinner'
import { supabase } from '../lib/supabase'
import {
  RECIPE_DETAIL_COLUMNS,
  RECIPE_INGREDIENT_COLUMNS,
  mapIngredient,
  mapRecipeDetail,
  type Ingredient,
  type RecipeDetail,
} from '../lib/recipes'

const TINTS = ['var(--sand-200)', 'var(--mint-200)', 'var(--leaf-300)']

interface RecipeDetailPageProps {
  saved: string[]
  toggleSave: (id: string) => void
  tried: string[]
  toggleTried: (id: string) => void
}

type Status = 'loading' | 'ready' | 'error'

// Most tutorials are Instagram reels, but a few point at YouTube.
function describeTutorial(url: string): { href: string; label: string; icon: string } {
  let host = ''
  try {
    host = new URL(url).hostname
  } catch {
    // Malformed URL — fall through to the generic label.
  }
  if (host.includes('instagram.com')) return { href: url, label: 'Watch on Instagram', icon: 'instagram' }
  if (host.includes('youtube.com') || host.includes('youtu.be'))
    return { href: url, label: 'Watch on YouTube', icon: 'youtube' }
  return { href: url, label: 'Watch tutorial', icon: 'play' }
}

export function RecipeDetailPage({ saved, toggleSave, tried, toggleTried }: RecipeDetailPageProps) {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null)
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [status, setStatus] = useState<Status>('loading')

  useEffect(() => {
    if (!id) {
      setStatus('error')
      return
    }
    let cancelled = false
    setStatus('loading')
    setRecipe(null)
    setIngredients([])

    Promise.all([
      supabase.from('recipes').select(RECIPE_DETAIL_COLUMNS).eq('id', id).maybeSingle(),
      supabase.from('recipe_ingredients').select(RECIPE_INGREDIENT_COLUMNS).eq('recipe_id', id).order('sort_order'),
    ]).then(([recipeRes, ingredientsRes]) => {
      if (cancelled) return
      if (recipeRes.error || !recipeRes.data) {
        setStatus('error')
        return
      }
      setRecipe(mapRecipeDetail(recipeRes.data))
      if (!ingredientsRes.error && ingredientsRes.data) {
        setIngredients(ingredientsRes.data.map(mapIngredient))
      }
      setStatus('ready')
    }).catch(() => {
      if (!cancelled) setStatus('error')
    })

    return () => {
      cancelled = true
    }
  }, [id])

  if (status === 'loading') return <PageSpinner label="Loading recipe" />

  if (status === 'error' || !recipe) {
    return (
      <NotFound
        title="Recipe not found"
        message="This recipe may have been removed, or the link is incorrect."
      />
    )
  }

  const isSaved = saved.includes(recipe.id)
  const isTried = tried.includes(recipe.id)
  const tutorial = recipe.tutorialUrl ? describeTutorial(recipe.tutorialUrl) : null
  const stats: { value: string | number; label: string; dotColor?: string }[] = [
    { value: recipe.calories, label: 'kcal' },
    { value: `${recipe.protein}g`, label: 'Protein', dotColor: 'var(--macro-protein)' },
    { value: `${recipe.carbs}g`, label: 'Carbs', dotColor: 'var(--macro-carb)' },
    { value: `${recipe.fat}g`, label: 'Fat', dotColor: 'var(--macro-fat)' },
  ]

  return (
    <div className="min-h-screen" style={{ background: 'var(--surface-page)' }}>
      <div
        className="relative flex items-center justify-center"
        style={{
          height: 280,
          background: recipe.image ? `url(${recipe.image}) center/cover` : TINTS[recipe.tint % TINTS.length],
        }}
      >
        {!recipe.image && <Icon name="utensils-crossed" size={34} color="rgba(28,32,25,.28)" />}
        <IconButton
          icon="arrow-left"
          variant="overlay"
          label="Back"
          onClick={() => navigate(-1)}
          style={{ position: 'absolute', top: 16, left: 16 }}
        />
        <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 8 }}>
          <IconButton
            icon="heart"
            variant="overlay"
            label={isSaved ? 'Remove from favorites' : 'Add to favorites'}
            active={isSaved}
            onClick={() => toggleSave(recipe.id)}
          />
          <UserButton variant="overlay" />
        </div>
      </div>

      <div className="relative mx-auto max-w-3xl px-6" style={{ marginTop: -46 }}>
        <Card padding="m" elevation="m" className="mb-6">
          <div className="flex justify-between gap-2 mb-5">
            {stats.map(({ value, label, dotColor }) => (
              <div key={label} className="text-center flex-1">
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: 'var(--text-heading)' }}>{value}</div>
                <div
                  className="flex items-center justify-center gap-1"
                  style={{
                    fontSize: 11,
                    letterSpacing: '.06em',
                    textTransform: 'uppercase',
                    color: 'var(--text-subtle)',
                    fontWeight: 600,
                    marginTop: 3,
                  }}
                >
                  {dotColor && (
                    <span
                      className="flex-none"
                      style={{ width: 6, height: 6, borderRadius: 'var(--radius-pill)', background: dotColor }}
                    />
                  )}
                  {label}
                </div>
              </div>
            ))}
          </div>
          <MacroBar protein={recipe.protein} carbs={recipe.carbs} fat={recipe.fat} height={10} showLegend={false} />
        </Card>
      </div>

      <div className="mx-auto max-w-3xl px-6 pb-16">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <TimePill minutes={recipe.minutes} />
          {recipe.category && <Badge tone="sand">{recipe.category}</Badge>}
          {recipe.tags.map((t) => (
            <Badge key={t} tone="neutral">{t}</Badge>
          ))}
        </div>

        <h1
          style={{
            marginBottom: 8,
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--size-display-m)',
            fontWeight: 600,
            letterSpacing: 'var(--tracking-snug)',
          }}
        >
          {recipe.title}
        </h1>
        <p style={{ color: 'var(--text-muted)' }} className="mb-4">
          {recipe.servings} {recipe.servings === 1 ? 'serving' : 'servings'}
          {recipe.vegetarianNote ? ` · ${recipe.vegetarianNote}` : ''}
        </p>

        <div className="flex flex-wrap items-center gap-3 mb-8">
          {tutorial && (
            <a
              href={tutorial.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
              style={{
                height: 'var(--control-height-m)',
                padding: '0 22px',
                borderRadius: 'var(--radius-control)',
                background: 'var(--mint-300)',
                color: 'var(--ink-0)',
                fontFamily: 'var(--font-text)',
                fontSize: 'var(--size-body-m)',
                fontWeight: 'var(--weight-semibold)',
                textDecoration: 'none',
              }}
            >
              <Icon name={tutorial.icon} size={18} />
              {tutorial.label}
            </a>
          )}
          <Button
            variant={isTried ? 'secondary' : 'outline'}
            iconLeft={isTried ? 'check' : 'circle-check'}
            onClick={() => toggleTried(recipe.id)}
          >
            {isTried ? 'Tried it' : 'Mark as tried'}
          </Button>
        </div>

        {ingredients.length > 0 && (
          <div className="mb-10">
            <h2
              style={{ marginBottom: 16, fontFamily: 'var(--font-display)', fontSize: 'var(--size-heading-m)', fontWeight: 600 }}
            >
              Ingredients
            </h2>
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
              {ingredients.map((ingredient) => (
                <li key={ingredient.id} className="flex items-center gap-3">
                  <span
                    className="flex-none"
                    style={{ width: 6, height: 6, borderRadius: 'var(--radius-pill)', background: 'var(--mint-400)' }}
                  />
                  <span style={{ fontSize: 'var(--size-body-l)' }}>{ingredient.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {recipe.method.length > 0 && (
          <div>
            <h2
              style={{ marginBottom: 16, fontFamily: 'var(--font-display)', fontSize: 'var(--size-heading-m)', fontWeight: 600 }}
            >
              Method
            </h2>
            <ol className="flex flex-col gap-4 list-none p-0 m-0">
              {recipe.method.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span
                    className="flex items-center justify-center flex-none"
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 'var(--radius-pill)',
                      background: 'var(--mint-200)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 13,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ fontSize: 'var(--size-body-l)', lineHeight: 'var(--leading-normal)' }}>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  )
}
