var THREE = require('three');

var Mouse = function() {

  this.position = new THREE.Vector2();
  this.raycaster = new THREE.Raycaster();
  this.pickPlane = new THREE.Plane(new THREE.Vector3(0,1,0));

  this.hoverObject = null;
};

Mouse.prototype.updateFromMouseMove = function(event) {

  this.position.set(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1
  );
};

Mouse.prototype.updateRaycaster = function(camera) {

  this.raycaster.setFromCamera(this.position, camera);
};

Mouse.prototype.getPositionAtY = function(y) {

  this.pickPlane.constant = y;

  return this.raycaster.ray.intersectPlane(this.pickPlane);
};

Mouse.prototype.checkHover = function(objects) {

  var intersects = this.raycaster.intersectObjects(objects);

  if (intersects.length > 0) {
    if (this.hoverObject !== intersects[0].object) {
      this.startHover(intersects[0].object)
    }
  } else {
    if (this.hoverObject !== null) {
      this.stopHover();
    }
  }
};

Mouse.prototype.startHover = function(object) {
  this.hoverObject = object;
  this.hoverObject.material.color.setHex(0xFF00FF);
};

Mouse.prototype.stopHover = function() {
  this.hoverObject.material.color.setHex(0xFFaa00);
  this.hoverObject = null;
};

module.exports = Mouse;