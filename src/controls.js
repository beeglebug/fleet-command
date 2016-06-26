var THREE = require('three');
var OrbitControls = require('three-orbit-controls')(THREE);

module.exports = function(camera) {

  var controls = new OrbitControls(camera);

  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = false;

  var quarterPI = Math.PI / 4;

  controls.minPolarAngle = quarterPI;
  controls.maxPolarAngle = 3*quarterPI;

  return controls;
};

