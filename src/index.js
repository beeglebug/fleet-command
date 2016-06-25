var THREE = require('three');
var renderer = require('./renderer.js');
var camera = require('./camera.js');
var OrbitControls = require('three-orbit-controls')(THREE);

var controls = new OrbitControls(camera);

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

  body.position.y = orbitalDistance;

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

  return new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: color }));
}

var planetSystem = makeSystem(3, 30);
var moon1System = makeSystem(0.6, 9);
var moon2System = makeSystem(0.6, 6);


scene.add(planetSystem.pivot);
planetSystem.body.add(moon1System.pivot);
planetSystem.body.add(moon2System.pivot);


var clock = new THREE.Clock();

function loop() {
  requestAnimationFrame(loop);
  var delta = clock.getDelta();
  update(delta);
  render(delta);
}

function update(delta) {
  planetSystem.pivot.rotation.z += 0.05 * delta;
  moon1System.pivot.rotation.z += 0.12 * delta;
  moon2System.pivot.rotation.z += 0.18 * delta;
}

function render(delta) {
  renderer.render( scene, camera );
}

requestAnimationFrame(loop);