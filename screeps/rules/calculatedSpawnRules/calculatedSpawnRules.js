
var cachedCalculatedSpawnRules = require("./cachedRules/cachedRules");
var roomStrategiesRules = require("./roomStrategiesRules/roomStrategiesRules");

var calculatedSpawnRules = {};

calculatedSpawnRules.addCalculatedRules = function(creepsSpawnRules, roomsCurrentSpawnedCounts) {

	// NOTE: Order is important. Because of prepended rules.

	roomStrategiesRules(creepsSpawnRules, roomsCurrentSpawnedCounts);
	cachedCalculatedSpawnRules(creepsSpawnRules);
}


module.exports = calculatedSpawnRules;