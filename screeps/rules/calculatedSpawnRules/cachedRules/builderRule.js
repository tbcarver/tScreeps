
var creepsSpawnRuleTools = require("../../creepsSpawnRuleTools");
var roomTools = require("../../../tools/roomTools");
var orderBy = require("lodash/orderBy");

var builderRule = {
	coolOffCount: 10,
};

builderRule.buildCreepsSpawnRules = function(creepsSpawnRules, cachedRuleName) {

	var remoteRoomCreepsSpawnRules = {};
	var buildingRooms = [];

	for (var roomName in Game.rooms) {

		var room = Game.rooms[roomName];
		if (room.controller && room.controller.my && roomTools.hasConstructionSites(roomName)) {

			var constructionSitesStats = roomTools.getConstructionSitesStats(roomName);
			var storageStats = roomTools.getStorageStats(roomName);
			var droppedEnergy = roomTools.getDroppedEnergy(roomName);

			if (constructionSitesStats.constructionCost > 0) {
				buildingRooms.push({
					roomName: roomName,
					constructionCost: constructionSitesStats.constructionCost,
					storedEnergy: storageStats.storedEnergy + droppedEnergy,
				});
			}
		}
	}

	if (buildingRooms.length > 0) {

		var spawningRooms = [];
		var buildingCountControllerEnergizers = getBuildingCountControllerEnergizers();

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

				var countBuildingCountControllerEnergizers = buildingCountControllerEnergizers[roomName] || 0;
				creepsCount = Math.abs(countBuildingCountControllerEnergizers - creepsCount);
				debug.temp(creepsCount)
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

				if (maxCreepsCount < 4) {
					maxCreepsCount = 4;
				}

				if (buildingRoom.storedEnergy + roomTools.getDropFlagDroppedEnergy(buildingRoom.roomName) === 0) {
					creepType = "remoteBuilder";
				}

				for (var count = 1; count <= maxCreepsCount; count++) {
					for (var spawningRoom of spawningRooms) {

						if (spawningRoom.creepsCount > 0) {

							incrementRemoteRoomCreepsSpawnRule(remoteRoomCreepsSpawnRules, spawningRoom.roomName, buildingRoom.roomName, cachedRuleName, creepType);
							spawningRoom.creepsCount--;
						}
					}
				}
			}
		}
	}

	return remoteRoomCreepsSpawnRules;
}

function incrementRemoteRoomCreepsSpawnRule(remoteRoomCreepsSpawnRules, spawnRoomName, remoteRoomName, cachedRuleName, creepType) {

	if (!remoteRoomCreepsSpawnRules[spawnRoomName]) {
		remoteRoomCreepsSpawnRules[spawnRoomName] = { remoteRooms: [] };
	}

	if (!_.some(remoteRoomCreepsSpawnRules[spawnRoomName].remoteRooms, { roomName: remoteRoomName })) {

		var creepsSpawnRuleKey = creepsSpawnRuleTools.buildCreepsSpawnRuleKey(spawnRoomName, remoteRoomName, "cached-" + cachedRuleName);
		var partsPerMove = 2;
		var roads = Game.rooms[remoteRoomName].find(FIND_STRUCTURES, {
			filter: { structureType: STRUCTURE_ROAD }
		})

		if (roads.length === 0) {
			partsPerMove = 1;
		}

		var creepsSpawnRule = {
			creepsSpawnRuleKey: creepsSpawnRuleKey,
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

function getBuildingCountControllerEnergizers() {

	var result = _.reduce(Memory.creeps, (roomsCountControllerEnergizers, creepMemory, creepName) => {

		if (creepMemory.type === "controllerEnergizer") {

			var creep = Game.creeps[creepName];
			var creepsSpawnRule;

			if (Memory.state.ruleKeyCreepsSpawnRules && creepMemory.creepsSpawnRuleKey) {
				creepsSpawnRule = Memory.state.ruleKeyCreepsSpawnRules[creepMemory.creepsSpawnRuleKey];
			}

			var canControllerEnergizersBuild = creepsSpawnRule ? creepsSpawnRule.canControllerEnergizersBuild : false;

			if (canControllerEnergizersBuild) {

				if (!roomsCountControllerEnergizers[creep.room.name]) {
					roomsCountControllerEnergizers[creep.room.name] = 0;
				}

				roomsCountControllerEnergizers[creep.room.name]++;
			}
		}

		return roomsCountControllerEnergizers;
	}, {});

	return result;
}


module.exports = builderRule;