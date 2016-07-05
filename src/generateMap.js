var THREE = require('three');

var generateMap = function(rng) {

  var length = 100;
  var steps = 20;
  var perStep = 10;
  var radius = 3;
  var spreadMax = 5;
  var spreadCurrent = 0;
  var spreadInc = spreadMax / (steps/2);

  var start = new THREE.Vector3(0, 0, -length/2);
  var end = new THREE.Vector3(0, 0, length/2);
  var step = new THREE.Vector3(0, 0, length / steps);

  var points = [],
    i, j, point, count,
    current = start.clone();

  for(i = 1; i < steps; i++) {
    current.add(step);
    if (i <= steps/2) {
      spreadCurrent += spreadInc;
    } else {
      spreadCurrent -= spreadInc;
    }
    count = parseInt(perStep * spreadCurrent);
    for (j = 0; j < count; j++) {
      point = current.clone();
      point.y += rng.randomBetween(-radius * spreadCurrent, radius * spreadCurrent);
      point.x += rng.randomBetween(-radius * spreadCurrent, radius * spreadCurrent);
      point.z += rng.randomBetween(-radius * spreadCurrent, radius * spreadCurrent);
      points.push(point);
    }
  }

  return {
    start: start,
    end: end,
    points: points
  };
};

module.exports = generateMap;