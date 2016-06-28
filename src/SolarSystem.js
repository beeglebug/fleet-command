var THREE = require('three');
var makeCircle = require('./mesh/makeCircle.js');

var SolarSystem = function() {

  THREE.Object3D.call(this);


  var bodies = {
    sun: new Planet('Sun', 696000, 1.989e30, 0),
    mercury: new Planet('Mercury', 2439, 3.302e23, 57909175),
    venus: new Planet('Venus', 6051, 4.8690e24, 108208930),
    earth: new Planet('Earth', 6378, 5.9742e24, 149597890),
    mars: new Planet('Mars', 3397, 6.4191e23, 227936640),
    jupiter: new Planet('Jupiter', 71492, 1.8987e27, 778412010),
    saturn: new Planet('Saturn', 60267, 5.6851e26, 1426725400),
    uranus: new Planet('Uranus', 25557, 8.6849e25, 2870972200),
    neptune: new Planet('Neptune', 24766, 1.0244e26, 4498252900)
  };

  var SCALE = 500000;

  var key, body, sphere, orbit;

  for(key in bodies) {
    body = bodies[key];
    sphere = makeSphere(body.radius / SCALE);
    sphere.position.x = body.distance / SCALE;

    orbit = makeCircle(body.distance / SCALE, 0x333333, true);

    this.add(sphere);
    this.add(orbit);
  }

};

SolarSystem.prototype = Object.create(THREE.Object3D.prototype);
SolarSystem.prototype.constructor = SolarSystem.prototype;


var Planet = function(name, radius, mass, distance) {

  this.name = name;
  this.radius = radius;
  this.mass = mass;
  this.distance = distance;

};

function makeSphere(radius) {

  var geometry = new THREE.SphereGeometry(radius, 32, 32);
  var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });

  return new THREE.Mesh(geometry, material);
}

module.exports = SolarSystem;