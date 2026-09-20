import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

// recipe id -> ingredient names, used to make search match ingredients too.
export type IngredientIndex = Record<string, string[]>

interface IngredientRow {
  recipe_id: string
  ingredient_name: string | null
}

// Supabase returns at most 1000 rows per request, and there are more
// ingredient rows than that — so page through them.
const PAGE = 1000

export function useIngredientIndex(): IngredientIndex {
  const [index, setIndex] = useState<IngredientIndex>({})

  useEffect(() => {
    let cancelled = false
    async function load() {
      const next: IngredientIndex = {}
      for (let from = 0; ; from += PAGE) {
        const { data, error } = await supabase
          .from('recipe_ingredients')
          .select('recipe_id,ingredient_name')
          .order('id')
          .range(from, from + PAGE - 1)
        if (error) {
          console.warn('Ingredient search index failed to load:', error.message)
          break
        }
        for (const row of data as IngredientRow[]) {
          if (row.ingredient_name) (next[row.recipe_id] ??= []).push(row.ingredient_name)
        }
        if (data.length < PAGE) break
      }
      if (!cancelled) setIndex(next)
    }
    load().catch((err) => console.warn('Ingredient search index failed to load:', err))
    return () => {
      cancelled = true
    }
  }, [])

  return index
}
