var THREE = require('three');
var renderer = require('./renderer.js');
var camera = require('./camera.js');
var ShipGenerator = require('./ShipGenerator.js');

var scene = new THREE.Scene();

var ship = ShipGenerator.generate();

scene.add(ship);

var pathMaterial = new THREE.LineDashedMaterial({ color: 0x555555, dashSize: 1, gapSize: 1 });
var pathGeometry = new THREE.Geometry();
pathGeometry.vertices.push(new THREE.Vector3(0, -100, 0));
pathGeometry.vertices.push(new THREE.Vector3(0, 100, 0));
pathGeometry.computeLineDistances();
var pathMesh = new THREE.Line(pathGeometry, pathMaterial);

scene.add(pathMesh);

var geometry;

geometry = new THREE.CircleGeometry(20, 64);
geometry.vertices.shift();
var orbit = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0x555555 }));

geometry = new THREE.CircleGeometry(5, 32);
geometry.vertices.shift();
var planetMesh = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0xEA4C2A }));

scene.add(orbit);
scene.add(planetMesh);


var sun = new Body();
var planet = new Body();

var world = [sun, planet];

sun.mass = 10;
planet.position.y = 20;
planet.velocity.y = 0;

var GRAVITY = 6.6742e-11;

function updateOrbit(planet, sun, delta) {

    var distance = planet.position.sub(sun.position);

    var force = distance.multiplyScalar(delta * (GRAVITY * invSumCube(distance)));

    // update velocity with gravitational acceleration
    planet.velocity.add(force);

    // update position with velocity
    planet.position.x += planet.velocity.x * delta;
    planet.position.y += planet.velocity.y * delta;
    planet.position.z += planet.velocity.z * delta;
}

var temp = new THREE.Vector3();

function integrate(body1, body2) {

  var epsilon = 1000;
  var threshold = 1000;

  var distanceSquared = body1.distanceToSquared(body2);

  if (body1.mass * body2.mass / distanceSquared < epsilon) {
    return;
  }

  if (body1.mass > body2.mass + threshold) {
    return;
  }

  var strength = GRAVITY * body1.mass * body2.mass / distanceSquared;
  var force = temp.copy(body1).sub(body2).normalize().multiply(strength);

  body1.addForce(force);
}

function invSumCube(vector) {
  return Math.pow(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z, -1.5);
}

var clock = new THREE.Clock();

function loop() {
  requestAnimationFrame(loop);
  var delta = clock.getDelta();
  update(delta);
  render(delta);
}

function update(delta) {
  updateOrbit(planet, sun, delta);
  planetMesh.position.copy(planet.position);
}

function render(delta) {
  renderer.render( scene, camera );
}

requestAnimationFrame(loop);