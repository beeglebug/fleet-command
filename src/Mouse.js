var THREE = require('three');

var Mouse = {

  position: new THREE.Vector2(),

  update: function(event) {

    this.position.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );
  }
};

module.exports = Mouse;