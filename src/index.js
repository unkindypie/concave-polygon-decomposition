import createNdarray from 'ndarray-pack';
import decompose from 'bitmap-to-boxes';
import * as PIXI from 'pixi.js';
import { makeNoise2D } from 'open-simplex-noise';

import app from './pixi/pixiapp';
import loader, { loadResourses } from './pixi/loader';

const tileSize = 16;

class Box extends PIXI.Container {
  constructor(x1, y1, x2, y2) {
    super();
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
  }
  draw(alpha = 1, color = 0xf2fbfc) {
    if (!this.g) {
      this.g = new PIXI.Graphics();
      this.addChild(this.g);
    }
    this.g.setTransform(this.x1, this.y1, 1, 1);
    this.g.beginFill(color, alpha);

    this.g.drawRect(0, 0, this.x2 - this.x1, this.y2 - this.y1);
    this.g.endFill();
  }
}

class TileMap extends PIXI.Container {
  constructor(matrix) {
    super();
    this.tilemap = [];
    this.ndarray = createNdarray(matrix);
    console.log(this.ndarray);
    for (let i = 0; i < matrix.length; i++) {
      this.tilemap[i] = new Array(matrix[i].length);
      for (let j = 0; j < matrix[i].length; j++) {
        this.tilemap[i][j] = { type: matrix[i][j] };
        if (matrix[i][j] === 1) {
          const box = new Box(
            j * tileSize,
            i * tileSize,
            j * tileSize + tileSize,
            i * tileSize + tileSize
          );
          this.tilemap[i][j].box = box;
          box.draw();
          this.addChild(box);
        }
      }
    }
  }
  partToBoxBody(part) {
    //debugger;
    const x1 = part[0][0];
    const y1 = part[0][1];

    const x2 = part[1][0];
    const y2 = part[1][1];

    const startBox = this.tilemap[y1][x1].box;
    const endBox = this.tilemap[y2 - 1][x2 - 1].box;
    const box = new Box(startBox.x1, startBox.y1, endBox.x2, endBox.y2);
    return box;
  }
  decompose() {
    const parts = decompose(this.ndarray, true);
    for (let i = 0; i < parts.length; i++) {
      const box = this.partToBoxBody(parts[i]);
      box.draw(1, i * 1000000 + 1000);
      this.addChild(box);
    }
  }
}

loadResourses(() => {
  const noise = new makeNoise2D(Math.random() * 10000);
  const width = 50;
  const height = 50;
  const incr = 0.1;
  const matrix = [];
  for (let i = 0; i < height; i++) {
    matrix[i] = [];
    for (let j = 0; j < width; j++) {
      const value = noise(j * incr, i * incr);
      if (value > 0) {
        matrix[i][j] = 1;
      } else matrix[i][j] = 0;
    }
  }
  const tilemap = new TileMap(matrix);
  //   const tilemap = new TileMap([
  //     [1, 1, 1, 1, 1, 1],
  //     [1, 1, 1, 1, 1, 1],
  //     [1, 1, 1, 1, 1, 0],
  //     [1, 1, 1, 1, 1, 0],
  //     [1, 1, 1, 1, 1, 0],
  //     [1, 1, 0, 0, 1, 1],
  //   ]);

  app.stage.addChild(tilemap);
  window.decompose = tilemap.decompose.bind(tilemap);

  //tilemap.decompose();
});
