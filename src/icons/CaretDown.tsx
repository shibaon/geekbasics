import React from 'react';
import { IconProps } from './IconProps';
import IconWrapper from './IconWrapper';

export const CaretDown = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <path d="M24 12L16 22 8 12z"></path>
    </IconWrapper>
  );
};
