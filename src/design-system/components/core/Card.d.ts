import * as React from "react";

/** Rounded surface container. */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: "default" | "sunken" | "accent" | "sand" | "leaf" | "inverse";
  padding?: "none" | "s" | "m" | "l";
  elevation?: "none" | "xs" | "s" | "m" | "l";
  /** Adds hover lift + pointer. */
  interactive?: boolean;
  children?: React.ReactNode;
}
export declare function Card(props: CardProps): JSX.Element;
