
var SpawnOrderMaxSpawnedCount = require("./spawnOrderMaxSpawnedCount");

var creepsSpawnRuleTools = {};

creepsSpawnRuleTools.buildCreepsSpawnRuleKey = function(spawnRoomName, remoteRoomName, ruleName) {

	return `${spawnRoomName}-${remoteRoomName}-${ruleName}`;
}

/** @param {CreepsSpawnRule[]} creepsSpawnRules */
creepsSpawnRuleTools.storeCreepsSpawnRules = function(creepsSpawnRules) {

	if (!Memory.state) {
		Memory.state = {};
	}

	var ruleKeyCreepsSpawnRules = {};

	for (var creepsSpawnRule of creepsSpawnRules) {

		var spawnCreepsSpawnRule = _.clone(creepsSpawnRule);
		delete spawnCreepsSpawnRule.remoteRooms;

		ruleKeyCreepsSpawnRules[spawnCreepsSpawnRule.roomName] = spawnCreepsSpawnRule;

		for (var remoteRoom of creepsSpawnRule.remoteRooms) {

			if (remoteRoom.creepsSpawnRuleKey) {

				ruleKeyCreepsSpawnRules[remoteRoom.creepsSpawnRuleKey] = remoteRoom;

			} else {

				var creepsSpawnRuleKey = creepsSpawnRuleTools.buildCreepsSpawnRuleKey(spawnCreepsSpawnRule.roomName, remoteRoom.roomName, "remote-room");
				ruleKeyCreepsSpawnRules[creepsSpawnRuleKey] = remoteRoom;
			}
		}
	}

	Memory.state.ruleKeyCreepsSpawnRules = ruleKeyCreepsSpawnRules;

	var creepsToSpawnTotal = 0;
	var spawnedRoomsCreepsToSpawnTotal = {};

	for (var creepsSpawnRule of creepsSpawnRules) {
		spawnedRoomsCreepsToSpawnTotal[creepsSpawnRule.roomName] = 0;

		if (creepsSpawnRule.spawnOrderMaxSpawnedCounts) {
			for (var spawnOrderMaxSpawnedCount of creepsSpawnRule.spawnOrderMaxSpawnedCounts) {

				var creepType = SpawnOrderMaxSpawnedCount.getCreepType(spawnOrderMaxSpawnedCount);
				creepsToSpawnTotal += spawnOrderMaxSpawnedCount[creepType];
				spawnedRoomsCreepsToSpawnTotal[creepsSpawnRule.roomName] += spawnOrderMaxSpawnedCount[creepType];
			}
		}

		if (creepsSpawnRule.remoteRooms) {
			for (var remoteRoom of creepsSpawnRule.remoteRooms) {
				if (remoteRoom.spawnOrderMaxSpawnedCounts) {
					for (var remoteSpawnOrderMaxSpawnedCount of remoteRoom.spawnOrderMaxSpawnedCounts) {

						creepType = SpawnOrderMaxSpawnedCount.getCreepType(remoteSpawnOrderMaxSpawnedCount);
						creepsToSpawnTotal += remoteSpawnOrderMaxSpawnedCount[creepType];
						spawnedRoomsCreepsToSpawnTotal[creepsSpawnRule.roomName] += remoteSpawnOrderMaxSpawnedCount[creepType];
					}
				}
			}
		}
	}

	Memory.state.creepsToSpawnTotal = creepsToSpawnTotal;
	Memory.state.spawnedRoomsCreepsToSpawnTotal = spawnedRoomsCreepsToSpawnTotal;
}


module.exports = creepsSpawnRuleTools;