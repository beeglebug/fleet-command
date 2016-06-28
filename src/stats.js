var Stats = require('stats.js');

var stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

module.exports = stats;