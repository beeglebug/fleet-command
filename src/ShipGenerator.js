var PIXI = require('pixi.js');

function generate() {

  var sprite = new PIXI.Graphics();

  var yellow = 0xf1c40f;

  sprite.beginFill(yellow);

  sprite.drawPolygon([
    0, 0,
    12, 32,
    0, 28,
    -12, 32,
  ]);

  sprite.endFill();

  return sprite;
}

module.exports = {
  generate: generate
};