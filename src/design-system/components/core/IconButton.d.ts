import * as React from "react";

/** Circular single-glyph control. */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Lucide slug. */
  icon?: string;
  variant?: "soft" | "accent" | "plain" | "overlay";
  size?: "s" | "m" | "l";
  /** Accessible name — always required in practice. */
  label?: string;
  /** Toggled state (e.g. saved recipe). */
  active?: boolean;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;
