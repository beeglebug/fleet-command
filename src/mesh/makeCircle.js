var THREE = require('three');

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

module.exports = makeCircle;