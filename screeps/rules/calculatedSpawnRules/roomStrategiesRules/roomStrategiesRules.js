
var gameTools = require("../../../tools/gameTools");
var calculatedSpawnRulesTools = require("../calculatedSpawnRulesTools");
var dropPointStrategy = require("./dropPointStrategy");
var harvestToDropPointStrategy = require("./harvestToDropPointStrategy");
var mobDefenseStrategy = require("./mobDefenseStrategy");
var remoteSpawnedDropTransferStrategy = require("./remoteSpawnedDropTransferStrategy");

var roomStrategies = {
	dropPoint: dropPointStrategy,
	harvestToDropPoint: harvestToDropPointStrategy,
	mobDefense: mobDefenseStrategy,
	remoteSpawnedDropTransfer: remoteSpawnedDropTransferStrategy,
}

function addCalculatedSpawnRules(creepsSpawnRules, roomsCurrentSpawnedCounts) {

	if (!Memory.state.roomStrategies) {
		Memory.state.roomStrategies = {};
	}

	var remoteRoomCreepsSpawnRules = {};
	var roomStrategyKeys = {};

	for (var creepsSpawnRule of creepsSpawnRules) {

		if (creepsSpawnRule.remoteRooms) {
			for (var remoteRoomCreepsSpawnRule of creepsSpawnRule.remoteRooms) {

				if (remoteRoomCreepsSpawnRule.roomStrategy) {

					var spawnRoomName = creepsSpawnRule.roomName;
					var remoteRoomName = remoteRoomCreepsSpawnRule.roomName;
					var currentSpawnedCounts = (roomsCurrentSpawnedCounts && roomsCurrentSpawnedCounts[spawnRoomName] &&
						roomsCurrentSpawnedCounts[spawnRoomName].remoteRooms && roomsCurrentSpawnedCounts[spawnRoomName].remoteRooms[remoteRoomName]) ?
						roomsCurrentSpawnedCounts[spawnRoomName].remoteRooms[remoteRoomName] : {};

					var roomStrategyName = remoteRoomCreepsSpawnRule.roomStrategy;
					var roomStrategyKey = `${roomStrategyName}-${spawnRoomName}-${remoteRoomName}`;
					roomStrategyKeys[roomStrategyKey] = true;

					var roomStrategy = roomStrategies[roomStrategyName];
					var roomStrategyCreepsSpawnRule = Memory.state.roomStrategies[roomStrategyKey];

					if (roomStrategy.canApplyRule(spawnRoomName, remoteRoomName)) {

						if (!roomStrategyCreepsSpawnRule) {

							var roomStrategyCreepsSpawnRule = roomStrategy.buildCreepsSpawnRule(spawnRoomName, remoteRoomName, creepsSpawnRule);
							Memory.state.roomStrategies[roomStrategyKey] = roomStrategyCreepsSpawnRule;

						} else if (gameTools.hasCoolOffed(roomStrategyKey, roomStrategy.coolOffCount)) {

							roomStrategy.recalculateCreepsSpawnRule(spawnRoomName, roomStrategyCreepsSpawnRule, currentSpawnedCounts);
						}

						if (!remoteRoomCreepsSpawnRules[spawnRoomName]) {
							remoteRoomCreepsSpawnRules[spawnRoomName] = { remoteRooms: [] };
						}

						if (roomStrategyCreepsSpawnRule) {
							remoteRoomCreepsSpawnRules[spawnRoomName].remoteRooms.push(roomStrategyCreepsSpawnRule);
							roomStrategy.measureCreepsSpawnRule(spawnRoomName, roomStrategyCreepsSpawnRule, currentSpawnedCounts);
						} else {
							debug.warning(`roomStrategiesRule rule not built for ${spawnRoomName} remote ${remoteRoomName} strategy ${roomStrategyName}`);
						}
					} else if (roomStrategyCreepsSpawnRule) {
						delete Memory.state.roomStrategies[roomStrategyKey];
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


module.exports = addCalculatedSpawnRules;