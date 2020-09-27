import React, { PropsWithChildren } from 'react';
import { IconProps } from './IconProps';

type Props = PropsWithChildren<IconProps & { viewbox?: string }>;

export const IconWrapper = function IconWrapper({
  size = 32,
  className,
  fill = 'currentColor',
  children,
  viewbox = '0 0 32 32',
  ...props
}: Props) {
  return (
    <svg
      className={className}
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      width={size}
      height={size}
      viewBox={viewbox}
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
};

export default IconWrapper;
