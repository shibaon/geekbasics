import clsx from 'clsx';
import React, { memo, useEffect, useState } from 'react';
import { useStyles } from './styles';
import { executeTextMode, TextExecutor } from '../../executor';
import { CodeMode } from '../../types';

type Props = { className?: string; program?: { mode: CodeMode, code: string } };

export const Output = memo(({ className, program }: Props) => {
  const classes = useStyles();
  const [output, setOutput] = useState('');
  const [_, setTextExecutor] = useState<TextExecutor>();

  useEffect(() => {
    if (!program?.code) return;
    setTextExecutor((prev) => {
      prev?.kill();
      setOutput('');
      return executeTextMode(
        program.code || '',
        (line) => setOutput((current) => `${current}> ${line}<br>`),
        (line) => setOutput((current) => `${current}> <span class="error">${line}</span><br>`),
      ); 
    });
  }, [program]);

  return (
    <div className={clsx(className, classes.root)}>
      {program
        ? <div className={classes.pre} dangerouslySetInnerHTML={{ __html: output }} />
        : <div className={classes.pre}>{'>'} Нажмите «Выполнить (Ctrl + S) для выполнения программы»</div>
      }
    </div>
  );
});

export default Output;
