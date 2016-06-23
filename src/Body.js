var THREE = require('three');

var Body = function() {

  this.position = new THREE.Vector3();
  this.velocity = new THREE.Vector3();
  this.mass = 1;
};

Body.prototype = {

  distanceToSquared: function(body) {
    return this.position.distanceToSquared(body.position);
  },

  addForce: function(force) {
    
  }

};

module.exports = Body;