var THREE = require('three');
var OrbitControls = require('three-orbit-controls')(THREE);

var Controls = function(camera) {

  OrbitControls.call(this, camera);

  var quarterPI = Math.PI / 4;

  this.enableDamping = true;
  this.dampingFactor = 0.25;
  this.enableZoom = true;
  this.minPolarAngle = quarterPI;
  this.maxPolarAngle = 3 * quarterPI;
  this.minDistance = 10;
  this.maxDistance = 25000;
};

Controls.prototype = Object.create(OrbitControls.prototype);
Controls.prototype.constructor = Controls.prototype;

module.exports = Controls;