var THREE = require('three');
var stats = require('./stats.js');
var renderer = require('./renderer.js');
var Camera = require('./Camera.js');
var Controls = require('./controls.js');
var onWindowResize = require('./onWindowResize.js');
var StarField = require('./StarField.js');
var Mouse = require('./Mouse');
var KEYBOARD = require('./Keyboard.js');
var MovementIndicator = require('./MovementIndicator.js');
var makeSquare = require('./mesh/makeSquare.js');
var SolarSystem = require('./SolarSystem.js');

var camera = new Camera();
var controls = new Controls(camera);
camera.controls = controls;

camera.position.set(180,150,100);

var mouse = new Mouse();
var scene = new THREE.Scene();

var generateMap = require('./generateMap.js');
var MapMesh = require('./MapMesh.js');
var map = generateMap();
var mapMesh = new MapMesh(map);

scene.add(mapMesh);

//var solarSystem = new SolarSystem();
//scene.add(solarSystem);
//var movementIndicator = new MovementIndicator();
//scene.add(movementIndicator);
//var stars = new StarField();
//scene.add(stars);

var axisHelper = new THREE.AxisHelper(10);
scene.add( axisHelper );

//var square = makeSquare();
//scene.add(square);
//square.position.x = -35;
//square.position.z = -35;
//
//var square2 = makeSquare();
//scene.add(square2);
//square2.position.x = 55;
//square2.position.z = 50;

//var selectable = [square, square2];

var clock = new THREE.Clock();

var selected = null;

//window.solarSystem = solarSystem;
window.camera = camera;

//camera.moveToAndLookAt(solarSystem.bodies.Sun);

function click() {

  if(mouse.hoverObject) {
    selected = mouse.hoverObject;
    //movementIndicator.visible = true;
    //movementIndicator.snapTo(selected);
  } else {
    selected = null;
    //movementIndicator.visible = false;
  }
}

function keyDown(key) {
  if (key === KEYBOARD.ESCAPE) {
    selected = null;
    //movementIndicator.visible = false;
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

  //square.lookAt(camera.position);

  mouse.updateRaycaster(camera);
  //mouse.checkHover(selectable);

  if (selected) {
    //var pos = mouse.getPositionAtY(selected.position.y);
    //movementIndicator.update(pos);
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