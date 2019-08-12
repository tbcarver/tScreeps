
var SpawnOrderMaxSpawnedCount = require("../../rules/spawnOrderMaxSpawnedCount");
var reverse = require("lodash/reverse");

var calculatedSpawnRulesTools = {};

/** @param {CreepsSpawnRule[]} creepsSpawnRules */
calculatedSpawnRulesTools.prependRemoteRoomCreepsSpawnRules = function(creepsSpawnRules, spawnRoomsRemoteRoomCreepsSpawnRules) {

	for (var spawnRoomName in spawnRoomsRemoteRoomCreepsSpawnRules) {

		var spawnRoom = _.find(creepsSpawnRules, { roomName: spawnRoomName });
		if (spawnRoom) {

			var remoteRooms = reverse(spawnRoomsRemoteRoomCreepsSpawnRules[spawnRoomName].remoteRooms);
			for (var remoteRoom of remoteRooms) {

				spawnRoom.remoteRooms.unshift(remoteRoom);
			}
		} else {
			debug.warning(`A creepsSpawnRule was not found for spawn room ${spawnRoomName}`);
		}
	}
}

/** @param {CreepsSpawnRule[]} creepsSpawnRules */
calculatedSpawnRulesTools.appendRemoteRoomCreepsSpawnRules = function(creepsSpawnRules, spawnRoomsRemoteRoomCreepsSpawnRules) {

	for (var spawnRoomName in spawnRoomsRemoteRoomCreepsSpawnRules) {

		var spawnRoom = _.find(creepsSpawnRules, { roomName: spawnRoomName });

		if (spawnRoom) {

			for (var remoteRoom of spawnRoomsRemoteRoomCreepsSpawnRules[spawnRoomName].remoteRooms) {

				spawnRoom.remoteRooms.push(remoteRoom);
			}
		} else {
			debug.warning(`A creepsSpawnRule was not found for spawn room ${spawnRoomName}`);
		}
	}
}

calculatedSpawnRulesTools.hasRemoteRoomCurrentSpawnedCounts = function(creepsSpawnRules, roomsCurrentSpawnedCounts) {

	var hasCurrentSpawnedCounts = false;

	for (var spawnRoomName in creepsSpawnRules) {

		var remoteRooms = creepsSpawnRules[spawnRoomName].remoteRooms;

		if (roomsCurrentSpawnedCounts[spawnRoomName] && remoteRooms && remoteRooms.length > 0) {

			for (var remoteCreepsSpawnRule of remoteRooms) {

				if (roomsCurrentSpawnedCounts[spawnRoomName].remoteRooms && roomsCurrentSpawnedCounts[spawnRoomName].remoteRooms[remoteCreepsSpawnRule.roomName]) {

					hasCurrentSpawnedCounts = true;
					break;
				}
			}
		}

		if (hasCurrentSpawnedCounts) {
			break;
		}
	}

	return hasCurrentSpawnedCounts;
}

calculatedSpawnRulesTools.zeroRemoteRoomSpawnOrderMaxSpawnedCounts = function(creepsSpawnRules) {

	for (var spawnRoomName in creepsSpawnRules) {

		var remoteRooms = creepsSpawnRules[spawnRoomName].remoteRooms;

		if (remoteRooms && remoteRooms.length > 0) {

			for (var remoteCreepsSpawnRule of remoteRooms) {

				if (remoteCreepsSpawnRule.spawnOrderMaxSpawnedCounts) {
					for (var spawnOrderMaxSpawnedCount of remoteCreepsSpawnRule.spawnOrderMaxSpawnedCounts) {

						var creepType = SpawnOrderMaxSpawnedCount.getCreepType(spawnOrderMaxSpawnedCount);
						spawnOrderMaxSpawnedCount[creepType] = 0;
					}
				}
			}
		}
	}
}



module.exports = calculatedSpawnRulesTools;