
var roomStrategiesRule = require("./roomStrategiesRules/roomStrategiesRule");
var storageTransferRule = require("./storageTransferRule");

var calculatedSpawnRules = {};

calculatedSpawnRules.addCalculatedRules = function(creepsSpawnRules) {

	roomStrategiesRule(creepsSpawnRules);
	storageTransferRule(creepsSpawnRules);
}


module.exports = calculatedSpawnRules;