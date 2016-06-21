var THREE = require('three');

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 100);
camera.lookAt(new THREE.Vector3(0, 0, 0));

var scene = new THREE.Scene();

var shipMaterial = new THREE.LineBasicMaterial({ color: 0xffaa00, linewidth : 1 });
var shipGeometry = new THREE.Geometry();
shipGeometry.vertices.push(new THREE.Vector3(0, -2, 0));
shipGeometry.vertices.push(new THREE.Vector3(1, 2, 0));
shipGeometry.vertices.push(new THREE.Vector3(0, 1.5, 0));
shipGeometry.vertices.push(new THREE.Vector3(-1, 2, 0));
shipGeometry.vertices.push(new THREE.Vector3(0, -2, 0));

shipGeometry.computeLineDistances();

var shipMesh = new THREE.Line(shipGeometry, shipMaterial);
scene.add(shipMesh);

var pathMaterial = new THREE.LineDashedMaterial( { color: 0x555555, dashSize: 1, gapSize: 1 } );
var pathGeometry = new THREE.Geometry();
pathGeometry.vertices.push(new THREE.Vector3(0, -100, 0));
pathGeometry.vertices.push(new THREE.Vector3(0, 100, 0));

pathGeometry.computeLineDistances();

var pathMesh = new THREE.Line(pathGeometry, pathMaterial);
scene.add(pathMesh);

var curveMaterial = new THREE.LineBasicMaterial( { color: 0x54878F, linewidth: 1 } );
var curve = new THREE.QuadraticBezierCurve3(
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(-2, -18, 0),
  new THREE.Vector3(-40, -40, 0)
);
var curvePath = new THREE.CurvePath();
curvePath.add(curve);

var curveMesh = new THREE.Line(curvePath.createPointsGeometry(20), curveMaterial);
scene.add(curveMesh);


function animate() {
  requestAnimationFrame( animate );

  camera.rotation.z += 0.005;

  render();
}

function render() {
  renderer.render( scene, camera );
}

animate();