/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx';
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useStyles } from './styles';
import TextOutput from './TextOutput';
import { execute, Executor, Functions } from '../../executor';
import { drawRect, drawEllipse, drawCircle } from './drawing';

type Props = { className?: string; program?: { code: string } };

export const Output = memo(({ className, program }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const classes = useStyles();
  const isGraphic = useMemo(() => {
    return program?.code ? !!['drawRect', 'drawEllipse', 'drawCircle', 'drawClear']
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
      }

      return execute(program.code, writeLine, writeError, functions);
    });
  }, [program, isGraphic]);

  if (!program) return <TextOutput className={className} />
  if (!isGraphic) return <TextOutput className={className} output={output} />

  return (
    <div className={clsx(classes.canvasLayout, className)}>
      <div className={classes.canvasWrapper}>
        <canvas ref={canvasRef} className={classes.canvas} />
      </div>
      <TextOutput className={classes.canvasLayoutTextView} output={output} />
    </div>
  );
});

export default Output;
