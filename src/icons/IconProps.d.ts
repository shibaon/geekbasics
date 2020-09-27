import { MouseEvent } from 'react';

export type IconProps = {
  size?: string | number;
  className?: string;
  fill?: string;
  onClick?: (e: MouseEvent<SVGElement>) => void;
};
