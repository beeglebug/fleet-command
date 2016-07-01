var THREE = require('three');

function makeCircle(size, color, rotate, segments) {

  if(rotate === undefined) { rotate = false; }
  if(segments === undefined) { segments = 32; }

  var geometry;

  geometry = new THREE.CircleGeometry(size, segments);

  geometry.vertices.shift();

  var mesh = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: color }));

  if (rotate) {
    geometry.rotateX(Math.PI / 2);
  }

  return mesh;
}

module.exports = makeCircle;