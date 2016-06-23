var THREE = require('three');

var ShipGenerator = {

  generate: function () {

    var material = new THREE.LineBasicMaterial({ color: 0xffaa00, linewidth: 1 });
    var geometry = new THREE.Geometry();

    geometry.vertices = [
      new THREE.Vector3(0, -2, 0),
      new THREE.Vector3(1, 2, 0),
      new THREE.Vector3(0, 1.5, 0),
      new THREE.Vector3(-1, 2, 0),
      new THREE.Vector3(0, -2, 0)
    ];

    geometry.computeLineDistances();

    return new THREE.Line(geometry, material);
  }

};

module.exports = ShipGenerator;