
var calculatedSpawnRulesTools = {};

calculatedSpawnRulesTools.prependRemoteRoomCreepsSpawnRules = function(creepsSpawnRules, spawnRoomsRemoteRoomCreepsSpawnRules) {

	for (var spawnRoomName in spawnRoomsRemoteRoomCreepsSpawnRules) {

		var spawnRoom = _.find(creepsSpawnRules, { roomName: spawnRoomName });

		for (var remoteRoom of spawnRoomsRemoteRoomCreepsSpawnRules[spawnRoomName].remoteRooms) {

			spawnRoom.remoteRooms.unshift(remoteRoom);
		}
	}
}


module.exports = calculatedSpawnRulesTools;