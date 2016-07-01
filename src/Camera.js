var THREE = require('three');

var Camera = function() {

  THREE.PerspectiveCamera.call(this, 45, window.innerWidth / window.innerHeight, 0.1, 400000000);

  this.baseOffset = new THREE.Vector3(50, 50, 100);

  this.lookAt(new THREE.Vector3());

  this.controls = null;
};

Camera.prototype = Object.create(THREE.PerspectiveCamera.prototype);
Camera.prototype.constructor = Camera.prototype;

Camera.prototype.moveToAndLookAt = function(target) {

  var size = target.geometry.boundingSphere.radius;

  var fov = this.fov * ( Math.PI / 180 );
  var distance = Math.abs( size / Math.sin( fov / 2 ) );

  var offset = this.baseOffset.clone().setLength(distance);

  this.position.copy(target.position).add(offset);

  this.lookAt(target);

  this.controls.target.copy(target.position);

  this.controls.minDistance = target.geometry.boundingSphere.radius * 2;
};


module.exports = Camera;
