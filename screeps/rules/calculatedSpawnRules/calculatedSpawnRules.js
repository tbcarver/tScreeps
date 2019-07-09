
var cachedCalculatedSpawnRules = require("./cachedCalculatedSpawnRules");
var roomStrategiesRules = require("./roomStrategiesRules/roomStrategiesRules");

var calculatedSpawnRules = {};

calculatedSpawnRules.addCalculatedRules = function(creepsSpawnRules) {

	cachedCalculatedSpawnRules(creepsSpawnRules);
	roomStrategiesRules(creepsSpawnRules);
}


module.exports = calculatedSpawnRules;