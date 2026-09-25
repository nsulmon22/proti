import * as React from "react";

/** Favorite heart in muted clay red: outlined, or filled when `filled`. */
export interface HeartIconProps extends React.SVGAttributes<SVGSVGElement> {
  filled?: boolean;
  size?: number;
}
export declare function HeartIcon(props: HeartIconProps): JSX.Element;
