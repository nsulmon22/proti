import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useAuthGate } from '../context/AuthGateContext'
import { supabase } from '../lib/supabase'

interface UserRecipeRow {
  recipe_id: string
  favorited_at: string | null
  tried_at: string | null
}

type TimestampColumn = 'favorited_at' | 'tried_at'

// Tracks favorited/tried status per recipe for the signed-in user, backed by
// a single `user_recipes` row per (user_id, recipe_id) with two nullable
// timestamp columns. Not signed in -> the login/signup modal opens (via
// AuthGateProvider) and the toggle runs automatically after a successful sign in.
export function useUserRecipes() {
  const { user } = useAuth()
  const { requireAuth } = useAuthGate()
  const [rows, setRows] = useState<Record<string, UserRecipeRow>>({})
  // Id of the user whose rows have finished loading (successfully or not) —
  // `loading` is derived from it, so there's no gap between sign-in and the fetch starting.
  const [loadedFor, setLoadedFor] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      setRows({})
      setLoadedFor(null)
      return
    }
    let cancelled = false
    supabase
      .from('user_recipes')
      .select('recipe_id,favorited_at,tried_at')
      .eq('user_id', user.id)
      .then(({ data, error }) => {
        if (cancelled) return
        if (error) {
          console.warn('Failed to load user_recipes:', error.message)
        } else {
          const next: Record<string, UserRecipeRow> = {}
          for (const row of data as UserRecipeRow[]) next[row.recipe_id] = row
          setRows(next)
        }
        setLoadedFor(user.id)
      })
    return () => {
      cancelled = true
    }
  }, [user])

  const loading = user !== null && loadedFor !== user.id

  const setTimestamp = useCallback(
    (recipeId: string, column: TimestampColumn, value: string | null) => {
      if (!user) return
      const previous = rows[recipeId]?.[column] ?? null

      setRows((prev) => ({
        ...prev,
        [recipeId]: {
          recipe_id: recipeId,
          favorited_at: prev[recipeId]?.favorited_at ?? null,
          tried_at: prev[recipeId]?.tried_at ?? null,
          [column]: value,
        },
      }))

      supabase
        .from('user_recipes')
        .upsert({ user_id: user.id, recipe_id: recipeId, [column]: value }, { onConflict: 'user_id,recipe_id' })
        .then(({ error }) => {
          if (!error) return
          console.warn(`Failed to update ${column}:`, error.message)
          setRows((prev) => ({
            ...prev,
            [recipeId]: { ...prev[recipeId], recipe_id: recipeId, [column]: previous },
          }))
        })
    },
    [user, rows],
  )

  const toggleFavorite = useCallback(
    (recipeId: string) => {
      requireAuth(() => {
        const isFavorited = !!rows[recipeId]?.favorited_at
        setTimestamp(recipeId, 'favorited_at', isFavorited ? null : new Date().toISOString())
      })
    },
    [requireAuth, rows, setTimestamp],
  )

  const toggleTried = useCallback(
    (recipeId: string) => {
      requireAuth(() => {
        const isTried = !!rows[recipeId]?.tried_at
        setTimestamp(recipeId, 'tried_at', isTried ? null : new Date().toISOString())
      })
    },
    [requireAuth, rows, setTimestamp],
  )

  const favoritedIds = useMemo(
    () =>
      Object.values(rows)
        .filter((r) => r.favorited_at)
        .sort((a, b) => (b.favorited_at! < a.favorited_at! ? -1 : 1))
        .map((r) => r.recipe_id),
    [rows],
  )
  const triedIds = useMemo(
    () => Object.values(rows).filter((r) => r.tried_at).map((r) => r.recipe_id),
    [rows],
  )

  return { favoritedIds, triedIds, toggleFavorite, toggleTried, loading }
}
