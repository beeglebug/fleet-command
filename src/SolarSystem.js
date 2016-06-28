var THREE = require('three');

var SolarSystem = function() {

  THREE.Object3D.call(this);

  var geometry = new THREE.SphereGeometry(5, 32, 32);
  var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  var sphere = new THREE.Mesh(geometry, material);

  this.add(sphere);
};

SolarSystem.prototype = Object.create(THREE.Object3D.prototype);
SolarSystem.prototype.constructor = SolarSystem.prototype;

module.exports = SolarSystem;