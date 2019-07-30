
var cachedCalculatedSpawnRules = require("./cachedRules/cachedRules");
var roomStrategiesRules = require("./roomStrategiesRules/roomStrategiesRules");
var controllerRule = require("./controllerRule");

var calculatedSpawnRules = {};

calculatedSpawnRules.addCalculatedRules = function(creepsSpawnRules, roomsCurrentSpawnedCounts) {

	// NOTE: Order is important. Because of prepended rules.

	roomStrategiesRules(creepsSpawnRules, roomsCurrentSpawnedCounts);
	cachedCalculatedSpawnRules(creepsSpawnRules);
	controllerRule(creepsSpawnRules);
}


module.exports = calculatedSpawnRules;