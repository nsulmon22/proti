import * as React from "react";

/** Segmented switch between sibling views. */
export interface TabItem { value: string; label: string }
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: Array<string | TabItem>;
  value?: string;
  onChange?: (value: string) => void;
  /** pill = segmented control on cream; underline = page-level sections. */
  variant?: "pill" | "underline";
}
export declare function Tabs(props: TabsProps): JSX.Element;
