
function addCalculatedSpawnRule(creepsSpawnRules) {

	var transferringRooms = [];
	var receivingRooms = [];

	for (var roomName in Game.rooms) {

		var storageStats = roomTools.getStorageStats(roomName);

		if (storageStats.hasStorage) {

			if (storageStats.storedEnergy >= 50) {

				transferringRooms.push({
					roomName: roomName,
					creepsCount: 1,
				});

			} else {

				receivingRooms.push({
					roomName: roomName,
					creepsCount: 1,
				});

			}
		}
	}

	// Adjacent rooms first
	for (var transferringRoom of transferringRooms) {

		var adjacentRoomNames = roomTools.getAdjacentRoomNames();

		for (var receivingRoom of receivingRooms) {
			if (adjacentRoomNames.includes(receivingRoom)) {


			}
		}
	}
}

module.exports = addCalculatedSpawnRule;