import { drawEllipse } from './drawEllipse';

export const drawCircle = (
  getCtx: () => CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  fill?: string,
  stroke?: { color?: string, width?: number } | string,
) => drawEllipse(getCtx, x, y, radius, radius, fill, stroke);
