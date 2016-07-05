var THREE = require('three');

var MapMesh = function(map) {

  THREE.Object3D.call(this);

  var ends = makePointCloud([
    map.start.clone(),
    map.end.clone()
  ], 0xFFFFFF, 3);

  this.add(ends);

  var points = makePointCloud(
    map.points,
    0xFF00FF,
    2
  );

  this.add(points);

  //var material = new THREE.LineDashedMaterial({color: 0xFFFFFF, dashSize: 1, gapSize: 1});
  //var geometry = new THREE.Geometry();
  //
  //geometry.vertices = [v1, v2];
  //
  //geometry.dynamic = true;
  //
  //geometry.computeLineDistances();
  //
  //return new THREE.Line(geometry, material);

};

MapMesh.prototype = Object.create(THREE.Object3D.prototype);
MapMesh.prototype.constructor = MapMesh.prototype;

function makePointCloud(points, color, size) {

  var material = new THREE.PointsMaterial({
    color: color,
    size: size,
    sizeAttenuation: false
  });

  var particles = new THREE.Geometry();

  particles.vertices = points;

  return new THREE.Points(
    particles, material
  );

}

module.exports = MapMesh;
