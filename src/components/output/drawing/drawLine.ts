export const drawLine = (
  getCtx: () => CanvasRenderingContext2D,
  xFrom: number,
  yFrom: number,
  xTo: number,
  yTo: number,
  color = 'black',
  width = 1,
) => {
  const ctx = getCtx();
  ctx.beginPath();
  ctx.moveTo(xFrom, yFrom);
  ctx.lineTo(xTo, yTo);
  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  ctx.stroke();
};
