var PIXI = require('pixi.js');

var renderer = new PIXI.WebGLRenderer(860, 540);

document.body.appendChild(renderer.view);

var stage = new PIXI.Container();

var ShipGenerator = require('./ShipGenerator.js');

var ship = ShipGenerator.generate();

ship.position.set(100,100);

stage.addChild(ship);


var orbit = new PIXI.Graphics();

var gray = 0x555555;

orbit.lineStyle(2, gray);

orbit.drawCircle(0,0, 100);

stage.addChild(orbit);





function animate() {

//  requestAnimationFrame(animate);

//  ship.rotation += 0.01;

  renderer.render(stage);
}

animate();