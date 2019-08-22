
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
		var spawnRoomOrderKey = `${creepsSpawnRule.roomName}`;
		spawnOrders[spawnRoomOrderKey] = [];
		let spawnOrder;

		if (creepsSpawnRule.spawnOrderMaxSpawnedCounts) {
			for (var spawnOrderMaxSpawnedCount of creepsSpawnRule.spawnOrderMaxSpawnedCounts) {

				if (!spawnOrder) {
					spawnOrder = {[spawnRoomOrderKey]: ""};
					spawnOrders[spawnRoomOrderKey].push(spawnOrder);
				}

				var creepType = SpawnOrderMaxSpawnedCount.getCreepType(spawnOrderMaxSpawnedCount);
				creepsToSpawnTotal += spawnOrderMaxSpawnedCount[creepType];
				spawnedRoomsCreepsToSpawnTotal[creepsSpawnRule.roomName] += spawnOrderMaxSpawnedCount[creepType];
				spawnOrder[spawnRoomOrderKey] += `${creepType}: ${spawnOrderMaxSpawnedCount[creepType]}, `;
			}
		}

		var currentRemoteRoomOrderKey;
		if (creepsSpawnRule.remoteRooms) {
			for (var remoteRoom of creepsSpawnRule.remoteRooms) {
				if (remoteRoom.spawnOrderMaxSpawnedCounts) {

					var remoteRoomOrderKey = `${creepsSpawnRule.roomName}-${remoteRoom.roomName}`;

					if (remoteRoomOrderKey !== currentRemoteRoomOrderKey) {
						currentRemoteRoomOrderKey = remoteRoomOrderKey;
						spawnOrder = {[currentRemoteRoomOrderKey]: ""};
						spawnOrders[spawnRoomOrderKey].push(spawnOrder);
					}

					for (var remoteSpawnOrderMaxSpawnedCount of remoteRoom.spawnOrderMaxSpawnedCounts) {

						creepType = SpawnOrderMaxSpawnedCount.getCreepType(remoteSpawnOrderMaxSpawnedCount);
						creepsToSpawnTotal += remoteSpawnOrderMaxSpawnedCount[creepType];
						spawnedRoomsCreepsToSpawnTotal[creepsSpawnRule.roomName] += remoteSpawnOrderMaxSpawnedCount[creepType];
						spawnOrder[currentRemoteRoomOrderKey] += `${creepType}: ${remoteSpawnOrderMaxSpawnedCount[creepType]}, `;
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