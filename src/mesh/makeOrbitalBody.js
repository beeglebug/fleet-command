var THREE = require('three');
var makeCircle = require('./makeCircle.js');

function makeOrbitalBody(bodySize, orbitalDistance) {

  var pivot = new THREE.Object3D();
  var root = new THREE.Object3D();

  var orbit = makeCircle(orbitalDistance, 0x333333, true);
  var body = makeCircle(bodySize, 0xAAAAAA);

  root.position.z = orbitalDistance;

  pivot.add(orbit);
  pivot.add(root);

  return {
    pivot, pivot,
    root, root,
    body, body,
    orbit, orbit
  };
}

module.exports = makeOrbitalBody;