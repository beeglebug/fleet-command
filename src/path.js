var THREE = require('three');

function makePath(v1, v2) {

  var material = new THREE.LineDashedMaterial({color: 0xFFFFFF, dashSize: 1, gapSize: 1});
  var geometry = new THREE.Geometry();

  geometry.vertices = [v1, v2];

  geometry.dynamic = true;

  geometry.computeLineDistances();

  return new THREE.Line(geometry, material);
}

module.exports = makePath;
