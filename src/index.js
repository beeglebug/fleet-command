var PIXI = require('pixi.js');

var renderer = new PIXI.WebGLRenderer(860, 540);

document.body.appendChild(renderer.view);

var stage = new PIXI.Container();

var test = new PIXI.Graphics();

test.beginFill(0xf1c40f);

test.drawPolygon([
  0, 0,
  12, 32,
  0, 28,
  -12, 32,
]);

test.endFill();

test.position.set(100,100);

stage.addChild(test);

console.log(test);

function animate() {

  requestAnimationFrame(animate);

  test.rotation += 0.01;

  renderer.render(stage);
}

animate();