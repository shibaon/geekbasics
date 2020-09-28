export const drawEllipse = (
  getCtx: () => CanvasRenderingContext2D,
  x: number,
  y: number,
  radiusX: number,
  radiusY: number,
  fill?: string,
  stroke?: { color?: string, width?: number } | string,
) => {
  const ctx = getCtx();
  ctx.strokeStyle = typeof stroke === 'string' ? stroke : stroke?.color || '#000';
  ctx.lineWidth = typeof stroke === 'string' ? 1 : stroke?.width || 1;
  if (fill) {
    ctx.fillStyle = fill || '#000';
    ctx.beginPath();
    ctx.ellipse(x, y, radiusX, radiusY, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  if (stroke) {
    ctx.ellipse(x, y, radiusX, radiusY, 0, 0, Math.PI * 2);
  }
};
