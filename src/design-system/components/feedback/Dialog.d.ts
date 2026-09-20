import * as React from "react";

/** Centred modal over a blurred scrim. */
export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  title?: string;
  description?: string;
  onClose?: () => void;
  /** Action row, right-aligned. */
  footer?: React.ReactNode;
  width?: number;
  children?: React.ReactNode;
}
export declare function Dialog(props: DialogProps): JSX.Element | null;
