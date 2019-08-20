
var SpawnOrderMaxSpawnedCount = require("./spawnOrderMaxSpawnedCount");

var creepsSpawnRuleTools = {};

creepsSpawnRuleTools.buildCreepsSpawnRuleKey = function(spawnRoomName, remoteRoomName, ruleName) {

	return `${spawnRoomName}-${remoteRoomName}-${ruleName}`;
}

/** @param {CreepsSpawnRule[]} creepsSpawnRules */
creepsSpawnRuleTools.updateCreepsToSpawnStats = function(creepsSpawnRules) {

	if (!Memory.state) {
		Memory.state = {};
	}

	var creepsToSpawnTotal = 0;
	var spawnedRoomsCreepsToSpawnTotal = {};
	var spawnOrders = {};

	for (var creepsSpawnRule of creepsSpawnRules) {
		spawnedRoomsCreepsToSpawnTotal[creepsSpawnRule.roomName] = 0;

		if (creepsSpawnRule.spawnOrderMaxSpawnedCounts) {
			for (var spawnOrderMaxSpawnedCount of creepsSpawnRule.spawnOrderMaxSpawnedCounts) {

				var spawnOrderKey = `${creepsSpawnRule.roomName}`;

				if (!spawnOrders[spawnOrderKey]) {
					spawnOrders[spawnOrderKey] = "";
				}

				var creepType = SpawnOrderMaxSpawnedCount.getCreepType(spawnOrderMaxSpawnedCount);
				creepsToSpawnTotal += spawnOrderMaxSpawnedCount[creepType];
				spawnedRoomsCreepsToSpawnTotal[creepsSpawnRule.roomName] += spawnOrderMaxSpawnedCount[creepType];
				spawnOrders[spawnOrderKey] += `${creepType}: ${spawnOrderMaxSpawnedCount[creepType]}, `;
			}

			spawnOrders[creepsSpawnRule.roomName] = creepsSpawnRule.spawnOrderMaxSpawnedCounts;
		}

		if (creepsSpawnRule.remoteRooms) {
			for (var remoteRoom of creepsSpawnRule.remoteRooms) {
				if (remoteRoom.spawnOrderMaxSpawnedCounts) {

					spawnOrderKey = `${creepsSpawnRule.roomName}-${remoteRoom.roomName}`;

					if (!spawnOrders[spawnOrderKey]) {
						spawnOrders[spawnOrderKey] = "";
					}

					for (var remoteSpawnOrderMaxSpawnedCount of remoteRoom.spawnOrderMaxSpawnedCounts) {

						creepType = SpawnOrderMaxSpawnedCount.getCreepType(remoteSpawnOrderMaxSpawnedCount);
						creepsToSpawnTotal += remoteSpawnOrderMaxSpawnedCount[creepType];
						spawnedRoomsCreepsToSpawnTotal[creepsSpawnRule.roomName] += remoteSpawnOrderMaxSpawnedCount[creepType];
						spawnOrders[spawnOrderKey] += `${creepType}: ${remoteSpawnOrderMaxSpawnedCount[creepType]}, `;
					}
				}
			}
		}
	}

	Memory.state.creepsToSpawnTotal = creepsToSpawnTotal;
	Memory.state.spawnedRoomsCreepsToSpawnTotal = spawnedRoomsCreepsToSpawnTotal;
	Memory.state.spawnOrders = spawnOrders;
}


module.exports = creepsSpawnRuleTools;