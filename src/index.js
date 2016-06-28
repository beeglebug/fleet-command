var THREE = require('three');
var stats = require('./stats.js');
var renderer = require('./renderer.js');
var camera = require('./camera.js');
var controls = require('./controls.js')(camera);
var onWindowResize = require('./onWindowResize.js');
var StarField = require('./StarField.js');
var Mouse = require('./Mouse');
var MovementIndicator = require('./MovementIndicator.js');
var makeSquare = require('./mesh/makeSquare.js');
var makeOrbitalBody = require('./mesh/makeOrbitalBody.js');


var SolarSystem = require('./SolarSystem.js');

var mouse = new Mouse();
var scene = new THREE.Scene();

var solarSystem = new SolarSystem();
scene.add(solarSystem);

var movementIndicator = new MovementIndicator();
scene.add(movementIndicator);

var stars = new StarField();
scene.add(stars);

var axisHelper = new THREE.AxisHelper(10);
scene.add( axisHelper );

var sun = new THREE.Object3D();
scene.add(sun);

var planet = makeOrbitalBody(3, 30);
sun.add(planet.pivot);

var moon1 = makeOrbitalBody(0.6, 9);
planet.root.add(moon1.pivot);

var moon2 = makeOrbitalBody(0.6, 6);
planet.root.add(moon2.pivot);

scene.add(planet.body);
scene.add(moon1.body);
scene.add(moon2.body);

var square = makeSquare();
scene.add(square);
square.position.x = -35;
square.position.z = -35;

var square2 = makeSquare();
scene.add(square2);
square2.position.x = 55;
square2.position.z = 50;

var selectable = [square, square2];

var clock = new THREE.Clock();

var selected = null;

function click() {

  if(mouse.hoverObject) {
    selected = mouse.hoverObject;
    movementIndicator.visible = true;
    movementIndicator.snapTo(selected);
  } else {
    selected = null;
    movementIndicator.visible = false;
  }
}

var KEYBOARD = {
  ESCAPE: 27
};

function keyDown(key) {

  if (key === KEYBOARD.ESCAPE) {
    selected = null;
    movementIndicator.visible = false;
  }
}

function loop() {
  requestAnimationFrame(loop);
  stats.begin();
  var delta = clock.getDelta();
  update(delta);
  render(delta);
  stats.end();
}

function update(delta) {

  controls.update();

  planet.pivot.rotation.y += 0.1 * delta;
  moon1.pivot.rotation.y += 0.2 * delta;
  moon2.pivot.rotation.y += 0.3 * delta;

  planet.body.position.setFromMatrixPosition(planet.root.matrixWorld);
  moon1.body.position.setFromMatrixPosition(moon1.root.matrixWorld);
  moon2.body.position.setFromMatrixPosition(moon2.root.matrixWorld);

  square.lookAt(camera.position);

  planet.body.lookAt(camera.position);
  moon1.body.lookAt(camera.position);
  moon2.body.lookAt(camera.position);

  mouse.updateRaycaster(camera);
  mouse.checkHover(selectable);

  if (selected) {
    var pos = mouse.getPositionAtY(selected.position.y);
    movementIndicator.update(pos);
  }
}

function render(delta) {
  renderer.render( scene, camera );
}

requestAnimationFrame(loop);

window.addEventListener('resize', function() {
  onWindowResize(camera, renderer);
}, false);

document.addEventListener('mousemove', function(event) {
  mouse.updateFromMouseMove(event);
}, false);

document.addEventListener('click', function(event) {
  click();
}, false);

document.addEventListener('keydown', function(event) {
  keyDown(event.keyCode);
}, false);