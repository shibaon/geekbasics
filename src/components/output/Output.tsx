/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx';
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useStyles } from './styles';
import TextOutput from './TextOutput';
import { execute, Executor, Functions } from '../../executor';
import { drawRect, drawEllipse, drawCircle, drawLine } from './drawing';

type Props = { className?: string; program?: { code: string } };

export const Output = memo(({ className, program }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const classes = useStyles();
  const isGraphic = useMemo(() => {
    return program?.code ? !!['drawRect', 'drawEllipse', 'drawCircle', 'drawClear', 'drawLine']
        .find((method) => program.code.includes(method)) : false;
  }, [program]);
  const [output, setOutput] = useState('');
  const writeLine = useCallback((line: string) => setOutput((current) => `${current}> ${line}<br>`), []);
  const writeError = useCallback((error: string) => writeLine(`<span class="error">${error}</span>`), []);
  const [, setTextExecutor] = useState<Executor>();

  useEffect(() => {
    if (!program?.code) return;
    setTextExecutor((prev) => {
      prev?.kill();
      setOutput('');

      const functions: Functions = {};

      if (isGraphic) {
        let ctx: CanvasRenderingContext2D | undefined | null = undefined;
        const getCtx = () => {
          if (ctx) return ctx;
          if (!canvasRef.current) throw new Error('canvas not found');
          const dpr = window.devicePixelRatio;
          canvasRef.current.width = canvasRef.current.offsetWidth * dpr;
          canvasRef.current.height = canvasRef.current.offsetHeight * dpr;
          ctx = canvasRef.current.getContext('2d');
          if (!ctx) throw new Error('Cannot initiate 2d context');
          ctx.scale(dpr, dpr);
          ctx.clearRect(0, 0, canvasRef.current.offsetWidth, canvasRef.current.offsetHeight);
          return ctx;
        };
        const clear = () => {
          if (!canvasRef.current) return;
          getCtx().clearRect(0, 0, canvasRef.current.offsetWidth, canvasRef.current.offsetHeight);
        };
        functions.drawRect = drawRect.bind(null, getCtx);
        functions.drawEllipse = drawEllipse.bind(null, getCtx);
        functions.drawCircle = drawCircle.bind(null, getCtx);
        functions.drawClear = clear;
        functions.drawLine = drawLine.bind(null, getCtx);
      }

      return execute(program.code, writeLine, writeError, functions);
    });
  }, [program, isGraphic]);

  return (
    <div className={clsx(className, { [classes.canvasLayout]: isGraphic })}>
      {isGraphic && (
        <div className={classes.canvasWrapper}>
          <canvas ref={canvasRef} className={classes.canvas} />
        </div>
      )}
      <TextOutput
        className={clsx({ [classes.canvasLayoutTextView]: isGraphic })}
        output={program ? output : undefined} preRef={outputRef}
      />
    </div>
  );
});

export default Output;
