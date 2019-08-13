
var creepsSpawnRuleTools = require("../../creepsSpawnRuleTools");
var SpawnOrderMaxSpawnedCount = require("../../spawnOrderMaxSpawnedCount");
var roomTools = require("../../../tools/roomTools");
var orderBy = require("lodash/orderBy");

var builderRule = {
	coolOffCount: 0,
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
		var buildingCountControllerEnergizers = getCountBuildingControllerEnergizers();

		for (var roomName in Game.rooms) {

			var storageStats = roomTools.getStorageStats(roomName);
			var droppedEnergy = roomTools.getDroppedEnergy(roomName);
			var spawnsCount = roomTools.getSpawnsCount(roomName);

			if (spawnsCount > 0) {

				var creepsCount = 0;
				var availableEnergy = 0;

				if (roomTools.hasMinimumStoredEnergy(roomName)) {

					availableEnergy = roomTools.getStoredEnergy(roomName);

				} else if (roomTools.hasMinimumDropFlagDroppedEnergy(roomName)) {

					availableEnergy = roomTools.getDropFlagDroppedEnergy(roomName);
				}

				creepsCount = Math.floor(availableEnergy / 50);

				var remoteCreepsCount = creepsCount;
				var countBuildingCountControllerEnergizers = buildingCountControllerEnergizers[roomName] || 0;
				creepsCount = creepsCount - countBuildingCountControllerEnergizers;

				if (creepsCount > 0) {

					var spawningRoom = {
						roomName: roomName,
						creepsCount: {
							builder: creepsCount,
							remoteBuilder: remoteCreepsCount,
						},
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

				if (buildingRoom.storedEnergy + roomTools.getDropFlagDroppedEnergy(buildingRoom.roomName) === 0) {
					creepType = "remoteBuilder";
				} else if (buildingRoom.storedEnergy < maxCreepsCount * 1000) {
					maxCreepsCount = Math.floor(maxCreepsCount / 2);
				}

				if (maxCreepsCount < 4) {
					maxCreepsCount = 4;
				}

				for (var count = 1; count <= maxCreepsCount; count++) {
					for (var spawningRoom of spawningRooms) {

						if (spawningRoom.creepsCount[creepType] > 0) {

							incrementRemoteRoomCreepsSpawnRule(remoteRoomCreepsSpawnRules, spawningRoom.roomName, buildingRoom.roomName, cachedRuleName, creepType);
							spawningRoom.creepsCount[creepType]--;
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
				{ remoteBuilder: 0 },
			],
			canEnergyCreepsHarvest: true,
			canEnergyCreepsPickup: true,
			partsPerMove: partsPerMove,
		}

		remoteRoomCreepsSpawnRules[spawnRoomName].remoteRooms.push(creepsSpawnRule);
		
	}

	var remoteRoom = /** @type {RemoteRoomCreepsSpawnRule} */(_.find(remoteRoomCreepsSpawnRules[spawnRoomName].remoteRooms, { roomName: remoteRoomName }));
	var spawnOrderMaxSpawnedCount = SpawnOrderMaxSpawnedCount.find(remoteRoom.spawnOrderMaxSpawnedCounts, creepType);

	spawnOrderMaxSpawnedCount[creepType]++;
}

function getCountBuildingControllerEnergizers() {

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