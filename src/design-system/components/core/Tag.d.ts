import * as React from "react";

/** Interactive filter chip. */
export interface TagProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  removable?: boolean;
  /** Light filled background when unselected — for chips that sit on imagery. */
  filled?: boolean;
  onRemove?: () => void;
  children?: React.ReactNode;
}
export declare function Tag(props: TagProps): JSX.Element;
