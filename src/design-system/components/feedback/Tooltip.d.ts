import * as React from "react";

/** Hover/focus label for icon-only controls and abbreviations. */
export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  content?: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  children?: React.ReactNode;
}
export declare function Tooltip(props: TooltipProps): JSX.Element;
