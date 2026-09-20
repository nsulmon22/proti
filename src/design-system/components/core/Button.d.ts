import * as React from "react";

/**
 * Primary action control.
 * @startingPoint section="Core" subtitle="Buttons in every tone and size" viewport="700x260"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** mint = primary, sand = secondary, pale leaf = tertiary. */
  variant?: "primary" | "secondary" | "tertiary" | "outline" | "ghost" | "inverse";
  size?: "s" | "m" | "l";
  /** Lucide slug rendered before the label. */
  iconLeft?: string;
  /** Lucide slug rendered after the label. */
  iconRight?: string;
  fullWidth?: boolean;
  children?: React.ReactNode;
}
export declare function Button(props: ButtonProps): JSX.Element;
