import * as React from "react";

/**
 * Clickable dietary filters, built on the same pill Tag used for ingredient
 * and cuisine chips so filtering reads identically everywhere.
 * @startingPoint section="Recipes" subtitle="Selectable dietary filter chips" viewport="560x160"
 */
export interface DietaryChipOption {
  value: string;
  label: string;
}
export interface DietaryChipsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Defaults to nut-free, dairy-free, gluten-free, meat-free. Plain strings are used as both value and label. */
  options?: Array<string | DietaryChipOption>;
  /** Currently selected option values. */
  value?: string[];
  onChange?: (next: string[]) => void;
}
export declare function DietaryChips(props: DietaryChipsProps): JSX.Element;
export declare const DIETARY_LABELS: string[];
