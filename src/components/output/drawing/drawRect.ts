export const drawRect = (
  getCtx: () => CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  fill?: string,
  stroke?: { color?: string, width?: number } | string,
) => {
  const ctx = getCtx();
  ctx.strokeStyle = typeof stroke === 'string' ? stroke : stroke?.color || '#000';
  ctx.lineWidth = typeof stroke === 'string' ? 1 : stroke?.width || 1;
  if (fill) {
    ctx.fillStyle = fill || '#000';
    ctx.fillRect(x, y, width, height);
  }
  if (stroke) {
    getCtx().strokeRect(x, y, width, height);
  }
};
