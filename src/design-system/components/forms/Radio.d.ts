import * as React from "react";

/** Single-select control within a named group. */
export interface RadioProps {
  checked?: boolean;
  onChange?: (value?: string) => void;
  label?: string;
  description?: string;
  name?: string;
  value?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}
export declare function Radio(props: RadioProps): JSX.Element;
