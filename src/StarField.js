var THREE = require('three');

var StarField = function() {

  THREE.Object3D.call(this);

  this.size = 200000000;

  this.addStars(0xFFFFFF, 1000);
  this.addStars(0xCCFFAA, 1000);
  this.addStars(0xAAAADD, 1000);
};

StarField.prototype = Object.create(THREE.Object3D.prototype);
StarField.prototype.constructor = StarField.prototype;

StarField.prototype.addStars = function (color, count) {

  var material = new THREE.PointsMaterial({
    color: color,
    size: 1,
    sizeAttenuation: false
  });

  var particles = new THREE.Geometry();

  for (var i = 0; i < count; i++) {

    var x = -1 + Math.random() * 2;
    var y = -1 + Math.random() * 2;
    var z = -1 + Math.random() * 2;

    var d = 1 / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));

    x *= d * this.size;
    y *= d * this.size;
    z *= d * this.size;

    var particle = new THREE.Vector3(x, y, z);

    particles.vertices.push(particle);
  }

  var points = new THREE.Points(
    particles, material
  );

  this.add(points);
};

module.exports = StarField;