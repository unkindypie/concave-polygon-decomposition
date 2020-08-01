import * as PIXI from 'pixi.js';

document.body.style.width = '90vw';
document.body.style.height = '90vh';
document.body.style.margin = '0';

const app = new PIXI.Application({
  width: document.body.clientHeight,
  height: document.body.clientHeight,
  resolution: window.devicePixelRatio,
  backgroundColor: 0x2d2d2d,
});
document.body.appendChild(app.view);

export default app;
