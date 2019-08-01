var roomTools = require("../../../tools/roomTools");
var orderBy = require("lodash/orderBy");

var builderRule = {
	coolOffCount: 25,
};

builderRule.buildCreepsSpawnRules = function(creepsSpawnRules) {

	var remoteRoomCreepsSpawnRules = {};
	var buildingRooms = [];

	for (var roomName in Game.rooms) {

		var room = Game.rooms[roomName];
		if (room.controller && room.controller.my) {

			var storageStats = roomTools.getStorageStats(roomName);
			var droppedEnergy = roomTools.getDroppedEnergy(roomName);

			var constructionCost = room.find(FIND_CONSTRUCTION_SITES).reduce((cost, constructionSite) =>
				cost += constructionSite.progressTotal - constructionSite.progress, 0);

			if (constructionCost > 0) {
				buildingRooms.push({
					roomName: roomName,
					constructionCost: constructionCost,
					storedEnergy: storageStats.storedEnergy + droppedEnergy,
				});
			}
		}
	}

	if (buildingRooms.length > 0) {

		var spawningRooms = [];

		for (var roomName in Game.rooms) {

			var storageStats = roomTools.getStorageStats(roomName);
			var droppedEnergy = roomTools.getDroppedEnergy(roomName);
			var spawnsCount = roomTools.getSpawnsCount(roomName);
			var percentStoredEnergyRequiredMultiplier = 5;

			if (spawnsCount > 0) {

				var creepsCount = 0;

				if (storageStats.hasStorage && storageStats.percentageStoredEnergy >= percentStoredEnergyRequiredMultiplier * spawnsCount) {

					creepsCount = Math.floor(Math.ceil(storageStats.percentageStoredEnergy / 20) * spawnsCount);

				} else if (droppedEnergy > 0) {

					creepsCount = 6;

					if (droppedEnergy > 300) {
						creepsCount = Math.floor(droppedEnergy / 50);
					}
				}

				if (creepsCount > 0) {

					var spawningRoom = {
						roomName: roomName,
						creepsCount: creepsCount,
					};

					spawningRooms.push(spawningRoom);
				}
			}
		}

		buildingRooms = orderBy(buildingRooms, "constructionCost", "desc");

		for (var buildingRoom of buildingRooms) {
			if (spawningRooms.length > 0) {

				var creepType = "builder";
				var maxCreepsCount = Math.floor(buildingRoom.constructionCost / 5000);

				if (buildingRoom.storedEnergy < maxCreepsCount * 1000) {
					maxCreepsCount = Math.floor(maxCreepsCount / 2);
				}

				if (buildingRoom.storedEnergy + roomTools.getDropFlagDroppedEnergy(buildingRoom.roomName) === 0) {
					creepType = "remoteBuilder";
				}

				for (var count = 1; count <= maxCreepsCount; count++) {
					for (var spawningRoom of spawningRooms) {

						if (spawningRoom.creepsCount > 0) {

							incrementRemoteRoomCreepsSpawnRule(remoteRoomCreepsSpawnRules, spawningRoom.roomName, buildingRoom.roomName, creepType);
							spawningRoom.creepsCount--;
						}
					}
				}
			}
		}
	}

	return remoteRoomCreepsSpawnRules;
}

function incrementRemoteRoomCreepsSpawnRule(remoteRoomCreepsSpawnRules, spawnRoomName, remoteRoomName, creepType) {

	if (!remoteRoomCreepsSpawnRules[spawnRoomName]) {
		remoteRoomCreepsSpawnRules[spawnRoomName] = { remoteRooms: [] };
	}

	if (!_.some(remoteRoomCreepsSpawnRules[spawnRoomName].remoteRooms, { roomName: remoteRoomName })) {

		var partsPerMove = 2;
		var roads = Game.rooms[remoteRoomName].find(FIND_STRUCTURES, {
			filter: { structureType: STRUCTURE_ROAD }
		})

		if (roads.length === 0) {
			partsPerMove = 1;
		}

		var creepsSpawnRule = {
			roomName: remoteRoomName,
			spawnOrderMaxSpawnedCounts: [
				{ builder: 0 },
				{ removeBuilder: 0 },
			],
			canEnergyCreepsHarvest: true,
			canEnergyCreepsPickup: true,
			partsPerMove: partsPerMove,
		}

		remoteRoomCreepsSpawnRules[spawnRoomName].remoteRooms.push(creepsSpawnRule);
	}

	var remoteRoom = /** @type {RemoteRoomCreepsSpawnRule} */(_.find(remoteRoomCreepsSpawnRules[spawnRoomName].remoteRooms, { roomName: remoteRoomName }));

	remoteRoom.spawnOrderMaxSpawnedCounts[0][creepType]++;
}


module.exports = builderRule;