
var cachedCalculatedSpawnRules = require("./cachedCalculatedSpawnRules");
var roomStrategiesRules = require("./roomStrategiesRules/roomStrategiesRules");

var calculatedSpawnRules = {};

calculatedSpawnRules.addCalculatedRules = function(creepsSpawnRules, roomsCurrentSpawnedCounts) {

	cachedCalculatedSpawnRules(creepsSpawnRules, roomsCurrentSpawnedCounts);
	roomStrategiesRules(creepsSpawnRules, roomsCurrentSpawnedCounts);
}


module.exports = calculatedSpawnRules;