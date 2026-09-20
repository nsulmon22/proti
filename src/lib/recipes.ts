export interface Recipe {
  id: string
  title: string
  category: string | null
  minutes: number
  protein: number
  calories: number
  servings: number
  tint: number
  tags: string[]
  image?: string
}

export interface RecipeDetail extends Recipe {
  carbs: number
  fat: number
  fiber: number | null
  vegetarian: boolean
  vegetarianNote: string | null
  method: string[]
  tutorialUrl: string | null
}

// Columns used by the recipe grid (HomePage).
export const RECIPE_LIST_COLUMNS =
  'id,title,category,prep_time,cook_time,servings,calories,protein_g,dietary_tags,image_url'

// Columns used by the detail view (RecipeDetailPage) — everything the list needs, plus macros and method.
export const RECIPE_DETAIL_COLUMNS =
  'id,title,category,prep_time,cook_time,servings,calories,protein_g,carbs_g,fats_g,fiber_g,vegetarian,vegetarian_note,dietary_tags,method,instagram_tutorial_url,image_url'

interface SupabaseRecipeRow {
  id: string
  title: string
  category: string | null
  prep_time: string | null
  cook_time: string | null
  servings: string | null
  calories: number | null
  protein_g: number | null
  dietary_tags: string[] | null
  image_url: string | null
}

interface SupabaseRecipeDetailRow extends SupabaseRecipeRow {
  carbs_g: number | null
  fats_g: number | null
  fiber_g: number | null
  vegetarian: boolean | null
  vegetarian_note: string | null
  method: string[] | null
  instagram_tutorial_url: string | null
}

const DIETARY_TAG_LABELS: Record<string, string> = {
  vegan: 'Vegan',
  vegetarian: 'Vegetarian',
  nut_free: 'Nut-free',
  dairy_free: 'Dairy-free',
  gluten_free: 'Gluten-free',
  meat_free: 'Meat-free',
}

export function formatDietaryTag(tag: string): string {
  return (
    DIETARY_TAG_LABELS[tag] ??
    tag
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('-')
  )
}

// "5 minutes" -> 5. Returns 0 for null/unparsable values.
export function parseMinutes(text: string | null): number {
  if (!text) return 0
  const match = text.match(/\d+/)
  return match ? parseInt(match[0], 10) : 0
}

// The method column stores steps as "1. Do the thing." — strip the leading
// number since the detail page renders its own numbered step markers.
export function stripStepNumber(step: string): string {
  return step.replace(/^\s*\d+\.\s*/, '')
}

export function mapRecipe(row: SupabaseRecipeRow, index: number): Recipe {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    minutes: parseMinutes(row.prep_time) + parseMinutes(row.cook_time),
    protein: row.protein_g ?? 0,
    calories: row.calories ?? 0,
    servings: row.servings ? parseInt(row.servings, 10) || 1 : 1,
    tint: index % 3,
    tags: (row.dietary_tags ?? []).map(formatDietaryTag),
    image: row.image_url ?? undefined,
  }
}

// Only ever link out to real web URLs (never e.g. javascript: from bad data).
function safeTutorialUrl(url: string | null): string | null {
  return url && /^https?:\/\//i.test(url.trim()) ? url.trim() : null
}

export function mapRecipeDetail(row: SupabaseRecipeDetailRow): RecipeDetail {
  return {
    ...mapRecipe(row, 0),
    carbs: row.carbs_g ?? 0,
    fat: row.fats_g ?? 0,
    fiber: row.fiber_g,
    vegetarian: row.vegetarian ?? false,
    vegetarianNote: row.vegetarian_note,
    method: (row.method ?? []).map(stripStepNumber),
    tutorialUrl: safeTutorialUrl(row.instagram_tutorial_url),
  }
}

export interface Ingredient {
  id: string
  text: string
}

interface SupabaseIngredientRow {
  id: string
  sort_order: number | null
  raw_text: string
}

export const RECIPE_INGREDIENT_COLUMNS = 'id,sort_order,raw_text'

export function mapIngredient(row: SupabaseIngredientRow): Ingredient {
  return { id: row.id, text: row.raw_text }
}

export const FALLBACK_RECIPES: Recipe[] = [
  { id: 'fallback-1', title: 'Sheet-pan chicken thighs', category: 'Main', minutes: 25, protein: 42, calories: 480, servings: 2, tint: 0, tags: ['One pan'] },
  { id: 'fallback-2', title: 'Greek yoghurt power bowl', category: 'Breakfast', minutes: 10, protein: 34, calories: 390, servings: 1, tint: 1, tags: ['No cook'] },
  { id: 'fallback-3', title: 'Slow-baked salmon & greens', category: 'Main', minutes: 35, protein: 46, calories: 520, servings: 2, tint: 2, tags: ['Meal prep'] },
]
