
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


module.exports = calculatedSpawnRulesTools;