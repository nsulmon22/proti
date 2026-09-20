import * as React from "react";

/**
 * Protein / carbs / fat split as a single segmented pill.
 * @startingPoint section="Recipes" subtitle="Macro split bar with legend" viewport="700x160"
 */
export interface MacroBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Grams. */
  protein?: number;
  carbs?: number;
  fat?: number;
  showLegend?: boolean;
  /** Bar thickness in px. 6 for card footers, 10 default, 14 on detail pages. */
  height?: number;
}
export declare function MacroBar(props: MacroBarProps): JSX.Element;
