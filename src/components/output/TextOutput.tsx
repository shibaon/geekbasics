import clsx from 'clsx';
import React, { memo, Ref} from 'react';
import { useStyles } from './styles';

type Props = { preRef?: Ref<HTMLDivElement>; className?: string; output?: string };

export const TextOutput = memo(({ preRef, className, output }: Props) => {
  const classes = useStyles();

  return (
    <div className={clsx(className, classes.textView)}>
      <div
        ref={preRef}
        className={classes.pre}
        dangerouslySetInnerHTML={{ __html: output || '> Нажмите «Выполнить» (Ctrl + S) для выполнения программы' }}
      />
    </div>
  );
});

export default TextOutput;
