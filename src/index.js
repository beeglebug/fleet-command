var THREE = require('three');
var renderer = require('./renderer.js');
var camera = require('./camera.js');
var OrbitControls = require('three-orbit-controls')(THREE);
var onWindowResize = require('./onWindowResize.js');

var controls = new OrbitControls(camera);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = false;

var scene = new THREE.Scene();

var geometry;

var COLOR = {
  orbit: 0x333333,
  body: 0xAAAAAA
};

function makeSystem(bodySize, orbitalDistance) {

  var pivot = new THREE.Object3D();

  var orbit = makeCircle(orbitalDistance, COLOR.orbit);
  var body = makeCircle(bodySize, COLOR.body);

  body.position.z = orbitalDistance;

  pivot.add(body);
  pivot.add(orbit);

  return {
    pivot, pivot,
    body, body,
    orbit, orbit
  };
}

function makeCircle(size, color) {

  var geometry;

  geometry = new THREE.CircleGeometry(size, 32);

  geometry.vertices.shift();

  var mesh = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: color }));

  geometry.rotateX( Math.PI/2 );

  return mesh;
}

var planetSystem = makeSystem(3, 30);
var moon1System = makeSystem(0.6, 9);
var moon2System = makeSystem(0.6, 6);


scene.add(planetSystem.pivot);
planetSystem.body.add(moon1System.pivot);
planetSystem.body.add(moon2System.pivot);

var axisHelper = new THREE.AxisHelper( 5 );
scene.add( axisHelper );

var clock = new THREE.Clock();

function loop() {
  requestAnimationFrame(loop);
  var delta = clock.getDelta();
  update(delta);
  render(delta);
}

function update(delta) {
  controls.update();
  planetSystem.pivot.rotation.y += 0.05 * delta;
  moon1System.pivot.rotation.y += 0.12 * delta;
  moon2System.pivot.rotation.y += 0.18 * delta;
  //moon1System.body.lookAt(camera.position);
}

function render(delta) {
  renderer.render( scene, camera );
}

requestAnimationFrame(loop);

window.addEventListener( 'resize', function() {
  onWindowResize(camera, renderer); }
, false);
