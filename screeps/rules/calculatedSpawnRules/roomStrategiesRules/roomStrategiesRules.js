
var gameTools = require("../../../tools/gameTools");
var calculatedSpawnRulesTools = require("../calculatedSpawnRulesTools");
var creepsSpawnRuleTools = require("../../creepsSpawnRuleTools");
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

	for (var spawnCreepsSpawnRule of creepsSpawnRules) {

		if (spawnCreepsSpawnRule.remoteRooms) {
			for (var remoteRoomCreepsSpawnRule of spawnCreepsSpawnRule.remoteRooms) {

				if (remoteRoomCreepsSpawnRule.roomStrategy) {

					var spawnRoomName = spawnCreepsSpawnRule.roomName;
					var remoteRoomName = remoteRoomCreepsSpawnRule.roomName;
					var currentSpawnedCounts = (roomsCurrentSpawnedCounts && roomsCurrentSpawnedCounts[spawnRoomName] &&
						roomsCurrentSpawnedCounts[spawnRoomName].remoteRooms && roomsCurrentSpawnedCounts[spawnRoomName].remoteRooms[remoteRoomName]) ?
						roomsCurrentSpawnedCounts[spawnRoomName].remoteRooms[remoteRoomName] : {};

					var roomStrategyName = remoteRoomCreepsSpawnRule.roomStrategy;
					var creepsSpawnRuleKey = creepsSpawnRuleTools.buildCreepsSpawnRuleKey(spawnRoomName, remoteRoomName, "room-" + roomStrategyName);
					roomStrategyKeys[creepsSpawnRuleKey] = true;

					var roomStrategy = roomStrategies[roomStrategyName];
					var roomStrategyCreepsSpawnRule = Memory.state.roomStrategies[creepsSpawnRuleKey];

					if (roomStrategy.canApplyRule(spawnRoomName, remoteRoomName)) {

						if (!roomStrategyCreepsSpawnRule) {

							roomStrategyCreepsSpawnRule = roomStrategy.buildCreepsSpawnRule(spawnRoomName, remoteRoomName, spawnCreepsSpawnRule, creepsSpawnRuleKey);
							Memory.state.roomStrategies[creepsSpawnRuleKey] = roomStrategyCreepsSpawnRule;

						} else if (gameTools.hasCoolOffed(creepsSpawnRuleKey, roomStrategy.coolOffCount)) {

							roomStrategy.recalculateCreepsSpawnRule(spawnRoomName, remoteRoomCreepsSpawnRule, roomStrategyCreepsSpawnRule, currentSpawnedCounts);
						}

						if (roomStrategyCreepsSpawnRule) {

							if (!remoteRoomCreepsSpawnRules[spawnRoomName]) {
								remoteRoomCreepsSpawnRules[spawnRoomName] = { remoteRooms: [] };
							}

							remoteRoomCreepsSpawnRules[spawnRoomName].remoteRooms.push(roomStrategyCreepsSpawnRule);
							roomStrategy.measureCreepsSpawnRule(spawnRoomName, remoteRoomCreepsSpawnRule, roomStrategyCreepsSpawnRule, currentSpawnedCounts, creepsSpawnRuleKey);
						} else {
							debug.warning(`roomStrategiesRule rule not built for ${spawnRoomName} remote ${remoteRoomName} strategy ${roomStrategyName}`);
						}
					} else if (roomStrategyCreepsSpawnRule) {
						delete Memory.state.roomStrategies[creepsSpawnRuleKey];
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