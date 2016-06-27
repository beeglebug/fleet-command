var THREE = require('three');
var OrbitControls = require('three-orbit-controls')(THREE);

module.exports = function(camera) {

  var controls = new OrbitControls(camera);

  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = true;

  var quarterPI = Math.PI / 4;

  controls.minPolarAngle = quarterPI;
  controls.maxPolarAngle = 3*quarterPI;

  controls.minDistance = 50;
  controls.maxDistance = 300;

  return controls;
};

