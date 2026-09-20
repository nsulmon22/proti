import * as React from "react";

/** Transient confirmation pill, bottom-centre on mobile, bottom-right on desktop. */
export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: "neutral" | "success" | "warning" | "danger";
  message?: string;
  /** Optional single action label, e.g. "Undo". */
  action?: string;
  onAction?: () => void;
  onDismiss?: () => void;
}
export declare function Toast(props: ToastProps): JSX.Element;
