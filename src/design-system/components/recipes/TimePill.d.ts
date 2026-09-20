import * as React from "react";

/**
 * Cook-time label. The fill encodes how long a recipe takes: mint for quick
 * (≤15 min), light paprika for moderate (16–30 min), deep paprika for long
 * (>30 min). Always reads as "X min" — the one notation used system-wide.
 * @startingPoint section="Recipes" subtitle="Cook-time chip with three duration tiers" viewport="420x120"
 */
export interface TimePillProps extends React.HTMLAttributes<HTMLSpanElement> {
  minutes?: number;
  size?: "s" | "m";
}
export declare function TimePill(props: TimePillProps): JSX.Element;

/** Returns "quick" | "moderate" | "long" for a duration in minutes. */
export declare function timeTier(minutes?: number): "quick" | "moderate" | "long" | null;
