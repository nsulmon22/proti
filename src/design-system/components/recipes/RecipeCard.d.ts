import * as React from "react";

/**
 * The product's signature tile: photo, title, and a single metadata line of
 * calories, protein and servings. Cook time sits on the photo as a TimePill,
 * coloured by duration tier.
 * @startingPoint section="Recipes" subtitle="Recipe tile, vertical and list layouts" viewport="700x300"
 */
export interface RecipeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  /** Image URL. Without one, a brand tint block with a utensils glyph is shown. */
  image?: string;
  /** Which brand tint to use for the fallback block (0 sand, 1 mint, 2 leaf). */
  tint?: number;
  /** Cook time in minutes, rendered as the coloured "X min" pill. */
  minutes?: number;
  /** Grams of protein per serving. */
  protein?: number;
  calories?: number;
  servings?: number;
  /** Short metadata labels, e.g. ["One pan","Meal prep"]. */
  tags?: string[];
  saved?: boolean;
  onSave?: () => void;
  layout?: "vertical" | "horizontal";
}
export declare function RecipeCard(props: RecipeCardProps): JSX.Element;
