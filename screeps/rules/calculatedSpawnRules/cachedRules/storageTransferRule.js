
var creepsSpawnRuleTools = require("../../creepsSpawnRuleTools");
var roomTools = require("../../../tools/roomTools");
var { rules } = require("../../rules");
var upgradeControllerRule = require("./upgradeControllerRule");

var storageTransferRule = {
	coolOffCount: 300,
	prepend: true,
};

storageTransferRule.buildCreepsSpawnRules = function(creepsSpawnRules, cachedRuleName) {


	var remoteRoomCreepsSpawnRules;

	if (rules.storageTransferSpawnRule) {

		switch (rules.storageTransferSpawnRule) {
			case "oneToEight":
				remoteRoomCreepsSpawnRules = buildOneToEightRules(creepsSpawnRules, cachedRuleName);
				break;

			case "balanced":
				remoteRoomCreepsSpawnRules = buildBalancedRules(creepsSpawnRules, cachedRuleName);
				break;

			default:
				debug.danger(`Unknown storageTransferSpawnRule: ${rules.storageTransferSpawnRule}`);
				break;
		}
	}

	return remoteRoomCreepsSpawnRules;
}

function buildOneToEightRules(creepsSpawnRules, cachedRuleName) {

	var controllerToUpgrade = upgradeControllerRule.getControllerToUpgrade();
	if (controllerToUpgrade) {

		var breakPointPercent = 1;
		var slowDownBreakPointPercent = 5;
		var transferringRooms = [];
		var storageStats = roomTools.getStorageStats(controllerToUpgrade.room.name);
		var receivingRoom = {
			roomName: controllerToUpgrade.room.name,
			creepsCount: Math.floor(Math.ceil(((99 - storageStats.percentageStoredEnergy) / 10)) * 4),
		};

		if (receivingRoom.creepsCount > 0) {

			for (var roomName in Game.rooms) {

				var storageStats = roomTools.getStorageStats(roomName);

				if (storageStats.hasStorage && controllerToUpgrade.room.name != roomName) {

					if (storageStats.percentageStoredEnergy > breakPointPercent) {

						var creepsCountMultiplier = 1;

						if (roomTools.getSpawnsCount(roomName) >= 2) {
							creepsCountMultiplier = 2;
						}

						transferringRoom = {
							roomName: roomName,
							creepsCount: Math.floor(Math.ceil(((storageStats.percentageStoredEnergy - breakPointPercent) / 10)) * creepsCountMultiplier),
						};

						if (storageStats.percentageStoredEnergy <= slowDownBreakPointPercent && transferringRoom.creepsCount > 0) {
							transferringRoom.creepsCount = Math.floor(transferringRoom.creepsCount / 2);
						}

						transferringRooms.push(transferringRoom);
					}
				}
			}

			var remoteRoomCreepsSpawnRules = {};
			var maxTransferringCreepsCount = transferringRooms.reduce((max, transferringRoom) =>
				transferringRoom.creepsCount > max ? transferringRoom.creepsCount : max, 0);

			// Adjacent rooms first
			for (var count = 1; count <= maxTransferringCreepsCount; count++) {
				for (var transferringRoom of transferringRooms) {

					var adjacentRoomNames = roomTools.getAdjacentRoomNames(transferringRoom.roomName);

					if (adjacentRoomNames.includes(receivingRoom.roomName)) {
						if (transferringRoom.creepsCount > 0 && receivingRoom.creepsCount > 0) {

							incrementRemoteRoomCreepsSpawnRule(remoteRoomCreepsSpawnRules, transferringRoom.roomName, receivingRoom.roomName, cachedRuleName);
							transferringRoom.creepsCount--;
							receivingRoom.creepsCount--;
						}
					}
				}
			}

			if (receivingRoom.creepsCount > 0) {

				var maxTransferringCreepsCount = transferringRooms.reduce((max, transferringRoom) =>
					transferringRoom.creepsCount > max ? transferringRoom.creepsCount : max, 0);

				for (var count = 1; count <= maxTransferringCreepsCount; count++) {
					for (var transferringRoom of transferringRooms) {

						if (transferringRoom.creepsCount > 0 && receivingRoom.creepsCount > 0) {

							incrementRemoteRoomCreepsSpawnRule(remoteRoomCreepsSpawnRules, transferringRoom.roomName, receivingRoom.roomName, cachedRuleName);
							transferringRoom.creepsCount--;
							receivingRoom.creepsCount--;
						}
					}
				}
			}
		}
	}

	return remoteRoomCreepsSpawnRules;
}

function buildBalancedRules(creepsSpawnRules, cachedRuleName) {

	var breakPointMultiplier = 50;
	var transferringRooms;
	var receivingRooms;
	var overflowTransferringRooms;
	var overflowReceivingRooms;

	for (var breakPointCount = 1; breakPointCount <= 3; breakPointCount++) {

		var breakPointPercent = Math.floor(breakPointMultiplier / breakPointCount);
		var totalRooms = 0;
		transferringRooms = [];
		receivingRooms = [];
		overflowTransferringRooms = [];
		overflowReceivingRooms = [];

		for (var roomName in Game.rooms) {

			var storageStats = roomTools.getStorageStats(roomName);

			if (storageStats.hasStorage) {

				totalRooms++;

				if (storageStats.percentageStoredEnergy > breakPointPercent) {

					var creepsCountMultiplier = 1;

					if (roomTools.getSpawnsCount(roomName) >= 2) {
						creepsCountMultiplier = 2;
					}

					transferringRoom = {
						roomName: roomName,
						creepsCount: Math.floor(Math.ceil(((storageStats.percentageStoredEnergy - breakPointPercent) / 10)) * creepsCountMultiplier),
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
						creepsCount: Math.floor(Math.ceil(((breakPointPercent - storageStats.percentageStoredEnergy) / 10)) * 4),
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

						incrementRemoteRoomCreepsSpawnRule(remoteRoomCreepsSpawnRules, transferringRoom.roomName, receivingRoom.roomName, cachedRuleName);
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

					incrementRemoteRoomCreepsSpawnRule(remoteRoomCreepsSpawnRules, transferringRoom.roomName, receivingRoom.roomName, cachedRuleName);
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

					incrementRemoteRoomCreepsSpawnRule(remoteRoomCreepsSpawnRules, transferringRoom.roomName, receivingRoom.roomName, cachedRuleName);
					transferringRoom.creepsCount--;
					receivingRoom.creepsCount--;
				}
			}
		}
	}

	return remoteRoomCreepsSpawnRules;
}

function incrementRemoteRoomCreepsSpawnRule(remoteRoomCreepsSpawnRules, spawnRoomName, remoteRoomName, cachedRuleName) {

	if (!remoteRoomCreepsSpawnRules[spawnRoomName]) {
		remoteRoomCreepsSpawnRules[spawnRoomName] = { remoteRooms: [] };
	}

	if (!_.some(remoteRoomCreepsSpawnRules[spawnRoomName].remoteRooms, { roomName: remoteRoomName })) {

		var creepsSpawnRuleKey = creepsSpawnRuleTools.buildCreepsSpawnRuleKey(spawnRoomName, remoteRoomName, "cached-" + cachedRuleName);
		var partsPerMove = 1;
		var spawnedRoads = Game.rooms[spawnRoomName].find(FIND_STRUCTURES, {
			filter: { structureType: STRUCTURE_ROAD }
		})
		var remoteRoads = Game.rooms[remoteRoomName].find(FIND_STRUCTURES, {
			filter: { structureType: STRUCTURE_ROAD }
		})

		if (spawnedRoads.length > 0 && remoteRoads.length > 0) {
			partsPerMove = 2;
		}
		
		remoteRoomCreepsSpawnRules[spawnRoomName].remoteRooms.push({
			creepsSpawnRuleKey: creepsSpawnRuleKey,
			roomName: remoteRoomName,
			spawnOrderMaxSpawnedCounts: [
				{ remoteStorageTransferer: 0 },
			],
			partsPerMove: partsPerMove,
		});
	}

	var remoteRoom = /** @type {RemoteRoomCreepsSpawnRule} */ (_.find(remoteRoomCreepsSpawnRules[spawnRoomName].remoteRooms, { roomName: remoteRoomName }));

	remoteRoom.spawnOrderMaxSpawnedCounts[0]["remoteStorageTransferer"]++;
}


module.exports = storageTransferRule;