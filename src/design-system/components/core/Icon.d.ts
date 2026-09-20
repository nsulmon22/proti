import * as React from "react";

/**
 * Lucide glyph rendered as a CSS mask so it inherits currentColor.
 */
export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Lucide icon slug, e.g. "flame", "timer", "leaf". */
  name?: string;
  /** Pixel box. Brand sizes: 16, 20, 24. */
  size?: number;
  /** Any CSS colour; defaults to currentColor. */
  color?: string;
}
export declare function Icon(props: IconProps): JSX.Element;
