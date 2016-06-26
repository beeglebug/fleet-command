var THREE = require('three');

function makePath(v1, v2) {

  var material = new THREE.LineDashedMaterial({color: 0x555555, dashSize: 1, gapSize: 1});
  var geometry = new THREE.Geometry();

  geometry.vertices = [v1, v2];

  geometry.computeLineDistances();

  var mesh = new THREE.Line(geometry, material);

  return mesh;
}

module.exports = makePath;
