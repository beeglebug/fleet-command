var THREE = require('three');

var generateMap = function() {

  var length = 100;
  var steps = 10;

  var start = new THREE.Vector3(0, 0, -length);
  var end = new THREE.Vector3(0, 0, length);

  var step = new THREE.Vector3(0, 0, length / steps);

  return {
    start: start,
    end: end,
  };
};

module.exports = generateMap;