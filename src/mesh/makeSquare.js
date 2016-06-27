var THREE = require('three');

function makeSquare() {

  var material = new THREE.LineBasicMaterial({ color: 0xffaa00 });
  var geometry = new THREE.Geometry();

  geometry.vertices = [
    new THREE.Vector3(-1, -1, 0),
    new THREE.Vector3(1, -1, 0),
    new THREE.Vector3(1, 1, 0),
    new THREE.Vector3(-1, 1, 0),
    new THREE.Vector3(-1, -1, 0)
  ];

  return new THREE.Line(geometry, material);
}

module.exports = makeSquare;