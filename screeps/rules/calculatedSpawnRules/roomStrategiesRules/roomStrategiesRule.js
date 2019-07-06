
var gameTools = require("../../../tools/gameTools");
var calculatedSpawnRulesTools = require("../calculatedSpawnRulesTools");
var dropPointStrategy = require("./dropPointStrategy");
var harvestToDropPointStrategy = require("./harvestToDropPointStrategy");
var mobDefenseStrategy = require("./mobDefenseStrategy");

var roomStrategies = {
	"dropPoint": dropPointStrategy,
	"harvestToDropPoint": harvestToDropPointStrategy,
	"mobDefense": mobDefenseStrategy,
}

function addCalculatedSpawnRule(creepsSpawnRules) {

	if (!Memory.state.roomStrategies) {
		Memory.state.roomStrategies = {};
	}

	var remoteRoomCreepsSpawnRules = {};
	var roomStrategyKeys = {};

	for (var creepsSpawnRule of creepsSpawnRules) {

		if (creepsSpawnRule.remoteRooms) {
			for (remoteRoomCreepsSpawnRule of creepsSpawnRule.remoteRooms) {

				if (remoteRoomCreepsSpawnRule.roomStrategy) {

					var spawnRoomName = creepsSpawnRule.roomName;
					var remoteRoomName = remoteRoomCreepsSpawnRule.roomName;
					var roomStrategyName = remoteRoomCreepsSpawnRule.roomStrategy;

					var roomStrategyKey = `${roomStrategyName}-${spawnRoomName}-${remoteRoomName}`;
					roomStrategyKeys[roomStrategyKey] = true;

					var roomStrategy = roomStrategies[roomStrategyName];
					var roomStrategyCreepsSpawnRule = Memory.state.roomStrategies[roomStrategyKey];

					if (!roomStrategyCreepsSpawnRule) {

						var roomStrategyCreepsSpawnRule = roomStrategy.buildCreepsSpawnRule(creepsSpawnRule.roomName, remoteRoomName);
						Memory.state.roomStrategies[roomStrategyKey] = roomStrategyCreepsSpawnRule;

					} else if (gameTools.hasCoolOffed(roomStrategyKey, roomStrategy.coolOffCount)) {

						roomStrategy.recalculateCreepsSpawnRule(creepsSpawnRule.roomName, roomStrategyCreepsSpawnRule);
					}

					if (!remoteRoomCreepsSpawnRules[spawnRoomName]) {
						remoteRoomCreepsSpawnRules[spawnRoomName] = { remoteRooms: [] };
					}

					if (roomStrategyCreepsSpawnRule) {
						remoteRoomCreepsSpawnRules[spawnRoomName].remoteRooms.push(roomStrategyCreepsSpawnRule);
						roomStrategy.measureCreepsSpawnRule(creepsSpawnRule.roomName, roomStrategyCreepsSpawnRule);
					} else {
						debug.warning(`roomStrategiesRule rule not built for ${spawnRoomName} remote ${remoteRoomName} strategy ${roomStrategyName}`);
					}
				}
			}
		}
	}

	calculatedSpawnRulesTools.prependRemoteRoomCreepsSpawnRules(creepsSpawnRules, remoteRoomCreepsSpawnRules);

	cleanUpRoomStrategies(roomStrategyKeys);
}

function cleanUpRoomStrategies(roomStrategyKeys) {

	for (var key in Memory.state.roomStrategies) {

		if (!roomStrategyKeys[key]) {

			delete Memory.state.roomStrategies[key];
		}
	}
}


module.exports = addCalculatedSpawnRule;