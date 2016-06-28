var THREE = require('three');

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100000);

camera.position.set(0, 50, 100);

var target = new THREE.Vector3(0, 0, 0);

camera.lookAt(target);

module.exports = camera;
