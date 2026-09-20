import * as React from "react";

/** Single-line text field with optional label, hint and leading icon. */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  /** Error message; replaces the hint and reddens the border. */
  error?: string;
  /** Lucide slug shown inside the field. */
  iconLeft?: string;
  size?: "s" | "m" | "l";
}
export declare function Input(props: InputProps): JSX.Element;
