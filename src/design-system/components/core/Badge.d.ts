import * as React from "react";

/** Small non-interactive status or metadata pill. */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "neutral" | "mint" | "sand" | "leaf" | "success" | "warning" | "danger";
  /** Lucide slug shown before the label. */
  icon?: string;
  children?: React.ReactNode;
}
export declare function Badge(props: BadgeProps): JSX.Element;
