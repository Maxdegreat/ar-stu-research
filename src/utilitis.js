// Triangle drawing method
const drawPath = (ctx, x, y, width, height) => {
  ctx.beginPath();
  // ctx.rect(x, y, width, height);
  ctx.rect(90, 70, 100, 100);
  ctx.stroke();
  
  ctx.strokeStyle = "green";
};

// Drawing Mesh
export const drawMesh = (ctx, x, y, width, height) => {
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  // ctx.rect(90, 70, 100, 100);
  ctx.strokeStyle = "green";
  ctx.lineWidth = "3.5";
  ctx.stroke();
  
};