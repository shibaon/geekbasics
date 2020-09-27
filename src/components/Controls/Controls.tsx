import React, { useEffect, useRef } from 'react';
import { Play } from '../../icons';
import { CodeMode } from '../../types';
import { Button } from './Button';
import { Select } from './Select';
import { useStyles } from './styles';

const Modes = [
  { title: 'Текст', value: 'text' },
  { title: 'Рисование', value: 'graphic' },
];

type Props = {
  mode: CodeMode;
  onExecute?: () => void;
  onModeSelect?: (value: CodeMode) => void;
};

export const Controls = ({ mode, onExecute, onModeSelect }: Props) => {
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
      <Select value={mode} options={Modes} width="100" onSelect={onModeSelect as any} />
      <Button title="Выполнить (Ctrl + S)" onClick={onExecute}>
        <Play size="20" />
      </Button>
    </div>
  );
};

export default Controls;
