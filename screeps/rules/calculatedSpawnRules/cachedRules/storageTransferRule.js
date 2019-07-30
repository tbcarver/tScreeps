
var roomTools = require("../../../tools/roomTools");

var storageTransferRule = {
	coolOffCount: 300,
	prepend: true,
};

storageTransferRule.buildCreepsSpawnRules = function(creepsSpawnRules) {

	var breakPointMultiplier = 50;
	var transferringRooms;
	var receivingRooms;
	var overflowTransferringRooms;
	var overflowReceivingRooms;

	for (var breakPointCount = 1; breakPointCount <= 3; breakPointCount++) {

		var breakPoint = Math.floor(breakPointMultiplier / breakPointCount);
		var totalRooms = 0;
		transferringRooms = [];
		receivingRooms = [];
		overflowTransferringRooms = [];
		overflowReceivingRooms = [];

		for (var roomName in Game.rooms) {

			var storageStats = roomTools.getStorageStats(roomName);

			if (storageStats.hasStorage) {

				totalRooms++;

				if (storageStats.percentageStoredEnergy > breakPoint) {

					var creepsCountMultiplier = 1;

					if (roomTools.getSpawnsCount(roomName) >= 2) {
						creepsCountMultiplier = 2;
					}

					transferringRoom = {
						roomName: roomName,
						creepsCount: Math.floor(Math.ceil(((storageStats.percentageStoredEnergy - breakPoint) / 10)) * creepsCountMultiplier),
					};

					transferringRooms.push(transferringRoom);

					if (storageStats.percentageStoredEnergy >= 90) {

						overflowTransferringRooms.push(transferringRoom);
					} else {

						overflowReceivingRooms.push({
							roomName: roomName,
							creepsCount: Math.floor(Math.ceil(((100 - storageStats.percentageStoredEnergy) / 10)) * 1),
						});
					}
				} else {

					receivingRooms.push({
						roomName: roomName,
						creepsCount: Math.floor(Math.ceil(((breakPoint - storageStats.percentageStoredEnergy) / 10)) * 4),
					});
				}
			}
		}

		if (Math.floor(transferringRooms.length / totalRooms * 100) > 33 || breakPointCount === 3) {
			break;
		}
	}

	var remoteRoomCreepsSpawnRules = {};
	var maxTransferringCreepsCount = transferringRooms.reduce((max, transferringRoom) =>
		transferringRoom.creepsCount > max ? transferringRoom.creepsCount : max, 0);

	// Adjacent rooms first
	for (var count = 1; count <= maxTransferringCreepsCount; count++) {
		for (var transferringRoom of transferringRooms) {

			var adjacentRoomNames = roomTools.getAdjacentRoomNames(transferringRoom.roomName);

			for (let receivingRoom of receivingRooms) {
				if (adjacentRoomNames.includes(receivingRoom.roomName)) {
					if (transferringRoom.creepsCount > 0 && receivingRoom.creepsCount > 0) {

						incrementRemoteRoomCreepsSpawnRule(remoteRoomCreepsSpawnRules, transferringRoom.roomName, receivingRoom.roomName);
						transferringRoom.creepsCount--;
						receivingRoom.creepsCount--;
					}
				}
			}
		}
	}

	var maxTransferringCreepsCount = transferringRooms.reduce((max, transferringRoom) =>
		transferringRoom.creepsCount > max ? transferringRoom.creepsCount : max, 0);

	for (var count = 1; count <= maxTransferringCreepsCount; count++) {
		for (var transferringRoom of transferringRooms) {

			for (let receivingRoom of receivingRooms) {
				if (transferringRoom.creepsCount > 0 && receivingRoom.creepsCount > 0) {

					incrementRemoteRoomCreepsSpawnRule(remoteRoomCreepsSpawnRules, transferringRoom.roomName, receivingRoom.roomName);
					transferringRoom.creepsCount--;
					receivingRoom.creepsCount--;
				}
			}
		}
	}

	var maxTransferringCreepsCount = overflowTransferringRooms.reduce((max, transferringRoom) =>
		transferringRoom.creepsCount > max ? transferringRoom.creepsCount : max, 0);

	for (var count = 1; count <= maxTransferringCreepsCount; count++) {
		for (var transferringRoom of overflowTransferringRooms) {

			for (let receivingRoom of overflowReceivingRooms) {
				if (transferringRoom.creepsCount > 0 && receivingRoom.creepsCount > 0) {

					incrementRemoteRoomCreepsSpawnRule(remoteRoomCreepsSpawnRules, transferringRoom.roomName, receivingRoom.roomName);
					transferringRoom.creepsCount--;
					receivingRoom.creepsCount--;
				}
			}
		}
	}

	return remoteRoomCreepsSpawnRules;
}

function incrementRemoteRoomCreepsSpawnRule(remoteRoomCreepsSpawnRules, spawnRoomName, remoteRoomName) {

	if (!remoteRoomCreepsSpawnRules[spawnRoomName]) {
		remoteRoomCreepsSpawnRules[spawnRoomName] = { remoteRooms: [] };
	}

	if (!_.some(remoteRoomCreepsSpawnRules[spawnRoomName].remoteRooms, { roomName: remoteRoomName })) {
		remoteRoomCreepsSpawnRules[spawnRoomName].remoteRooms.push({
			roomName: remoteRoomName,
			spawnOrderMaxSpawnedCounts: [
				{ remoteStorageTransferer: 0 },
			],
			canTransferersTransferToStorageOnly: true,
		});
	}

	var remoteRoom = /** @type {RemoteRoomCreepsSpawnRule} */(_.find(remoteRoomCreepsSpawnRules[spawnRoomName].remoteRooms, { roomName: remoteRoomName }));

	remoteRoom.spawnOrderMaxSpawnedCounts[0]["remoteStorageTransferer"]++;
}


module.exports = storageTransferRule;