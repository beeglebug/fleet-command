var THREE = require('three');
var Stats = require('stats.js');
var renderer = require('./renderer.js');
var camera = require('./camera.js');
var controls = require('./controls.js')(camera);
var onWindowResize = require('./onWindowResize.js');
var StarField = require('./StarField.js');
var Mouse = require('./Mouse');
var MovementIndicator = require('./MovementIndicator.js');
var makeSquare = require('./mesh/makeSquare.js');
var makeOrbitalBody = require('./mesh/makeOrbitalBody.js');

var stats = new Stats();
stats.showPanel(0);

document.body.appendChild(stats.dom);


var mouse = new Mouse();
var scene = new THREE.Scene();

var movementIndicator = new MovementIndicator();
scene.add(movementIndicator);

var stars = new StarField(1000, 300);
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

var selectable = [square];

var clock = new THREE.Clock();

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

  if (1 === 2) {

    pickPlane.constant = Selection.current.position.y;

    raycaster.ray.intersectPlane(pickPlane, _v1);

    Selection.path.geometry.vertices[1].copy(_v1);
    Selection.path.geometry.verticesNeedUpdate = true;

    var distance = Selection.path.geometry.vertices[0].distanceTo(Selection.path.geometry.vertices[1]);
    Selection.circle.scale.set(distance, distance, distance);
  }
}

function render(delta) {
  renderer.render( scene, camera );
}

requestAnimationFrame(loop);

window.addEventListener( 'resize', function() {
  onWindowResize(camera, renderer); }
, false);

document.addEventListener('mousemove', function(event) {
  mouse.updateFromMouseMove(event);
}, false);