import React, { memo, useEffect, useRef } from 'react';
import { Play } from '../../icons';
import { Button } from './Button';
import { useStyles } from './styles';

type Props = {
  onExecute?: () => void;
};

export const Controls = memo(({ onExecute }: Props) => {
  const onExecuteRef = useRef<() => void>();
  const classes = useStyles();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === 'KeyS' && e.ctrlKey) {
        e.preventDefault();
        onExecuteRef.current && onExecuteRef.current();
      }
    };
    window.addEventListener('keydown', handler);

    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    onExecuteRef.current = onExecute
  }, [onExecute]);

  return (
    <div className={classes.root}>
      <Button title="Выполнить (Ctrl + S)" onClick={onExecute}>
        <Play size="20" />
      </Button>
    </div>
  );
});

export default Controls;
