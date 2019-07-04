
var tools = require("../../tools/tools");

function addCalculatedSpawnRule(creepsSpawnRules) {

	var transferringRooms = [];
	var receivingRooms = [];

	for (var roomName in Game.rooms) {

		var storageStats = tools.roomTools.getStorageStats(roomName);

		if (storageStats.hasStorage) {

			if (storageStats.percentageStoredEnergy > 50) {

				transferringRooms.push({
					roomName: roomName,
					creepsCount: Math.floor(Math.ceil(((storageStats.percentageStoredEnergy - 50) / 10)) * 2),
				});

			} else {

				receivingRooms.push({
					roomName: roomName,
					creepsCount: Math.floor(Math.ceil(((50 - storageStats.percentageStoredEnergy) / 10)) * 4),
				});

			}
		}
	}

	// Adjacent rooms first
	for (var transferringRoom of transferringRooms) {

		var adjacentRoomNames = tools.roomTools.getAdjacentRoomNames(transferringRoom.roomName);

		for (var receivingRoom of receivingRooms) {
			if (adjacentRoomNames.includes(receivingRoom.roomName)) {


			}
		}
	}
}

module.exports = addCalculatedSpawnRule;