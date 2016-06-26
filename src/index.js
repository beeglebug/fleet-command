var THREE = require('three');
var renderer = require('./renderer.js');
var camera = require('./camera.js');
var controls = require('./controls.js')(camera);
var onWindowResize = require('./onWindowResize.js');
var StarField = require('./StarField.js');

var scene = new THREE.Scene();

var stars = new StarField(1000, 300);

scene.add(stars);

var COLOR = {
  orbit: 0x333333,
  body: 0xAAAAAA
};

function makeOrbitalBody(bodySize, orbitalDistance) {

  var pivot = new THREE.Object3D();
  var root = new THREE.Object3D();

  var orbit = makeCircle(orbitalDistance, COLOR.orbit, true);
  var body = makeCircle(bodySize, COLOR.body);

  root.position.z = orbitalDistance;

  pivot.add(orbit);
  pivot.add(root);

  return {
    pivot, pivot,
    root, root,
    body, body,
    orbit, orbit
  };
}

function makeDot() {

  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3(0, 0, 0));

  var material = new THREE.PointCloudMaterial( { size: 1, sizeAttenuation: false } );

  var dot = new THREE.PointCloud( geometry, dotMaterial );
  scene.add( dot );

}

function makeShip() {

  var material = new THREE.LineBasicMaterial({ color: 0xffaa00 });
  var geometry = new THREE.Geometry();

  geometry.vertices = [
    new THREE.Vector3(0, -2, 0),
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(0, 2, 0),
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(0, -2, 0)
  ];


  return new THREE.Line(geometry, material);
}

function makeCircle(size, color, rotate) {

  if(rotate === undefined) { rotate = false; }

  var geometry;

  geometry = new THREE.CircleGeometry(size, 32);

  geometry.vertices.shift();

  var mesh = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: color }));

  if (rotate) {
    geometry.rotateX(Math.PI / 2);
  }

  return mesh;
}

var sun = new THREE.Object3D();
scene.add(sun);

var planet = makeOrbitalBody(3, 30);
sun.add(planet.pivot);

var moon1 = makeOrbitalBody(0.6, 9);
planet.root.add(moon1.pivot);

var moon2 = makeOrbitalBody(0.6, 6);
planet.root.add(moon2.pivot);

var container = new THREE.Object3D();
scene.add(container);

container.add(planet.body);
container.add(moon1.body);
container.add(moon2.body);


var ship = makeShip();

container.add(ship);

ship.position.x = 42;

var axisHelper = new THREE.AxisHelper(10);
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

  //planet.pivot.rotation.y += 0.1 * delta;
  //moon1.pivot.rotation.y += 0.2 * delta;
  //moon2.pivot.rotation.y += 0.3 * delta;

  planet.body.position.setFromMatrixPosition(planet.root.matrixWorld);
  moon1.body.position.setFromMatrixPosition(moon1.root.matrixWorld);
  moon2.body.position.setFromMatrixPosition(moon2.root.matrixWorld);

  ship.lookAt(camera.position);
  planet.body.lookAt(camera.position);
  moon1.body.lookAt(camera.position);
  moon2.body.lookAt(camera.position);
}

function render(delta) {
  renderer.render( scene, camera );
}

requestAnimationFrame(loop);

window.addEventListener( 'resize', function() {
  onWindowResize(camera, renderer); }
, false);
