var THREE = require('three');

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000000);

camera.position.set(25, 25, 50);

var target = new THREE.Vector3(0, 0, 0);

camera.lookAt(target);

module.exports = camera;
