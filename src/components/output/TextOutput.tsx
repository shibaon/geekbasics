import clsx from 'clsx';
import React, { memo} from 'react';
import { useStyles } from './styles';

type Props = { className?: string; output?: string };

export const TextOutput = memo(({ className, output }: Props) => {
  const classes = useStyles();

  return (
    <div className={clsx(className, classes.textView)}>
      {output !== undefined
        ? <div className={classes.pre} dangerouslySetInnerHTML={{ __html: output }} />
        : <div className={classes.pre}>{'>'} Нажмите «Выполнить (Ctrl + S) для выполнения программы»</div>
      }
    </div>
  );
});

export default TextOutput;
