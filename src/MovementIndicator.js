var THREE = require('three');
var makePath = require('./mesh/makePath.js');
var makeCircle = require('./mesh/makeCircle.js');

var MovementIndicator = function() {

  THREE.Object3D.call(this);

  this.path = makePath(
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, 0)
  );

  this.circle = makeCircle(1, 0x444444, true);

  this.add(this.circle);
  this.add(this.path);

  this.visible = false;
};

MovementIndicator.prototype = Object.create(THREE.Object3D.prototype);
MovementIndicator.prototype.constructor = MovementIndicator.prototype;

MovementIndicator.prototype.snapTo = function(object) {

  this.circle.position.copy(object.position);

  this.path.geometry.vertices[0].copy(object.position);
  this.path.geometry.vertices[1].copy(object.position);

  this.path.geometry.verticesNeedUpdate = true;
};

MovementIndicator.prototype.update = function(position) {

  this.path.geometry.vertices[1].copy(position);
  this.path.geometry.verticesNeedUpdate = true;

  var distance = this.path.geometry.vertices[0].distanceTo(this.path.geometry.vertices[1]);
  this.circle.scale.set(distance, distance, distance);
};

module.exports = MovementIndicator;