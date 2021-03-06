import React from 'react';
import { IconProps } from './IconProps';
import IconWrapper from './IconWrapper';

export const Play = (props: IconProps) => {
  return (
    <IconWrapper {...props}>
      <path d="M7,28a1,1,0,0,1-1-1V5a1,1,0,0,1,1.501-.8652l19,11a1,1,0,0,1,0,1.73l-19,11A.9975.9975,0,0,1,7,28Z"></path>
    </IconWrapper>
  );
};
