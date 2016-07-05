var MersenneTwister = require('mersenne-twister');

var seed = 1234;

MersenneTwister.prototype.randomBetween = function(min, max) {
  return this.random_incl() * (max - min + 1) + min;
};

module.exports = new MersenneTwister(seed);
