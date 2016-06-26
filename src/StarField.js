var THREE = require('three');

var StarField = function(count, size) {

    THREE.Object3D.call(this);

    var material = new THREE.ParticleBasicMaterial({
      color: 0xFFFFFF,
      size: 1
    });

    var particles = new THREE.Geometry();

    for(var i = 0; i < count; i++) {

      var x = -1 + Math.random() * 2;
      var y = -1 + Math.random() * 2;
      var z = -1 + Math.random() * 2;

      var d = 1 / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));

      x *= d;
      y *= d;
      z *= d;

      var particle = new THREE.Vector3(
        x * size,
        y * size,
        z * size
      );

      particles.vertices.push(particle);
    }

    var particleSystem = new THREE.ParticleSystem(
      particles, material
    );

    this.add(particleSystem);
};

StarField.prototype = Object.create(THREE.Object3D.prototype);
StarField.prototype.constructor = StarField;

module.exports = StarField;