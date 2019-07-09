
var reverse = require("lodash/reverse");

var calculatedSpawnRulesTools = {};

calculatedSpawnRulesTools.prependRemoteRoomCreepsSpawnRules = function(creepsSpawnRules, spawnRoomsRemoteRoomCreepsSpawnRules) {

	for (var spawnRoomName in spawnRoomsRemoteRoomCreepsSpawnRules) {

		var spawnRoom = _.find(creepsSpawnRules, { roomName: spawnRoomName });
		var remoteRooms = reverse(spawnRoomsRemoteRoomCreepsSpawnRules[spawnRoomName].remoteRooms);
		
		for (var remoteRoom of remoteRooms) {

			spawnRoom.remoteRooms.unshift(remoteRoom);
		}
	}
}

calculatedSpawnRulesTools.appendRemoteRoomCreepsSpawnRules = function(creepsSpawnRules, spawnRoomsRemoteRoomCreepsSpawnRules) {

	for (var spawnRoomName in spawnRoomsRemoteRoomCreepsSpawnRules) {

		var spawnRoom = _.find(creepsSpawnRules, { roomName: spawnRoomName });
		
		for (var remoteRoom of spawnRoomsRemoteRoomCreepsSpawnRules[spawnRoomName].remoteRooms) {

			spawnRoom.remoteRooms.push(remoteRoom);
		}
	}
}


module.exports = calculatedSpawnRulesTools;