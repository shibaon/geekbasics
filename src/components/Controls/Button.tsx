import React, { PropsWithChildren } from 'react';
import { useStyles } from './styles';

type Props = PropsWithChildren<{
  title?: string;
  onClick?: () => void;
}>;

export const Button = ({ children, title, onClick }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.button} title={title} onClick={onClick}>
      {children}
    </div>
  );
};
