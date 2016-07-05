var THREE = require('three');

var MapMesh = function(map) {

  THREE.Object3D.call(this);

  var material = new THREE.PointsMaterial({
    color: 0xFFFFFF,
    size: 3,
    sizeAttenuation: false
  });

  var particles = new THREE.Geometry();

  particles.vertices.push(map.start.clone());
  particles.vertices.push(map.end.clone());

  var points = new THREE.Points(
    particles, material
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

module.exports = MapMesh;
