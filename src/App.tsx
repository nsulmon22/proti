import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoadingScreen } from './components/LoadingScreen'
import { NotFound } from './components/NotFound'
import { HomePage } from './pages/HomePage'
import { RecipeDetailPage } from './pages/RecipeDetailPage'
import { LoginPage } from './pages/LoginPage'
import { ProfilePage } from './pages/ProfilePage'
import { supabase } from './lib/supabase'
import { FALLBACK_RECIPES, RECIPE_LIST_COLUMNS, mapRecipe, type Recipe } from './lib/recipes'
import { useAuth } from './context/AuthContext'
import { useUserRecipes } from './hooks/useUserRecipes'
import { useIngredientIndex } from './hooks/useIngredientIndex'

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>(FALLBACK_RECIPES)
  const [recipesLoading, setRecipesLoading] = useState(true)
  const { initializing: authInitializing } = useAuth()
  const ingredientIndex = useIngredientIndex()
  const { favoritedIds, toggleFavorite, triedIds, toggleTried, loading: userRecipesLoading } = useUserRecipes()

  useEffect(() => {
    let cancelled = false
    async function loadRecipes() {
      try {
        const { data, error } = await supabase.from('recipes').select(RECIPE_LIST_COLUMNS)
        if (cancelled) return
        if (!error && data && data.length > 0) {
          setRecipes(data.map(mapRecipe))
        } else if (error) {
          console.warn('Supabase recipes fetch failed, using fallback data:', error.message)
        }
      } finally {
        if (!cancelled) setRecipesLoading(false)
      }
    }
    loadRecipes()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <LoadingScreen active={recipesLoading || authInitializing} />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              recipes={recipes}
              saved={favoritedIds}
              toggleSave={toggleFavorite}
              tried={triedIds}
              userRecipesLoading={userRecipesLoading}
              ingredientIndex={ingredientIndex}
            />
          }
        />
        <Route
          path="/recipe/:id"
          element={
            <RecipeDetailPage
              saved={favoritedIds}
              toggleSave={toggleFavorite}
              tried={triedIds}
              toggleTried={toggleTried}
            />
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="*"
          element={<NotFound title="Page not found" message="The page you're looking for doesn't exist." />}
        />
      </Routes>
    </>
  )
}

export default App
