var THREE = require('three');

function makeKite() {

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

module.exports = makeKite;