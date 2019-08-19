
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

		var spawningRooms = {};
		var buildingCountControllerEnergizers = getCountBuildingControllerEnergizers();

		for (var roomName in Game.rooms) {

			var storageStats = roomTools.getStorageStats(roomName);
			var droppedEnergy = roomTools.getDroppedEnergy(roomName);
			var spawnsCount = roomTools.getSpawnsCount(roomName);

			if (spawnsCount > 0) {

				var creepsCount = 0;
				var remoteCreepsCount = 0;
				var availableEnergy = 0;

				if (roomTools.hasMinimumStoredEnergy(roomName)) {

					availableEnergy = roomTools.getStoredEnergy(roomName);

				} else if (roomTools.hasMinimumDropFlagDroppedEnergy(roomName)) {

					availableEnergy = roomTools.getDropFlagDroppedEnergy(roomName);
				}

				creepsCount = Math.floor(availableEnergy / 50);

				if (creepsCount <= 6) {
					remoteCreepsCount = creepsCount;
				}

				var countBuildingCountControllerEnergizers = buildingCountControllerEnergizers[roomName] || 0;
				creepsCount = creepsCount - countBuildingCountControllerEnergizers;

				let spawningRoom = {
					roomName: roomName,
					creepsCount: {
						controllerEnergizer: countBuildingCountControllerEnergizers,
						builderWithEnergy: creepsCount,
						builderWithHarvesting: 12,
						remoteBuilder: remoteCreepsCount,
					},
				};

				spawningRooms[spawningRoom.roomName] = spawningRoom;
			}
		}

		buildingRooms = orderBy(buildingRooms, "constructionCost", "desc");

		for (var buildingRoom of buildingRooms) {
			if (!_.isEmpty(spawningRooms)) {

				var maxCreepsCount = Math.floor(buildingRoom.constructionCost / 5000);

				if (maxCreepsCount < 6) {
					maxCreepsCount = 6;
				}

				if (buildingRoom.constructionCost < 5000) {
					maxCreepsCount = 3;
				}

				if (spawningRooms[buildingRoom.roomName]) {
					maxCreepsCount = maxCreepsCount - spawningRooms[buildingRoom.roomName].creepsCount.controllerEnergizer;
				}

				var lastCreepType = "builder";
				var remainingCreepsCount = maxCreepsCount;

				for (var count = 1; count <= maxCreepsCount; count++) {
					for (var spawningRoomName in spawningRooms) {
						var spawningRoom = spawningRooms[spawningRoomName];

						if (spawningRoom.roomName === buildingRoom.roomName) {

							if (spawningRoom.creepsCount["builderWithEnergy"] > 0) {

								incrementRemoteRoomCreepsSpawnRule(remoteRoomCreepsSpawnRules, spawningRoom.roomName, buildingRoom.roomName, cachedRuleName, "builder");
								spawningRoom.creepsCount["builderWithEnergy"]--;
								remainingCreepsCount--;

							} else if (spawningRoom.creepsCount["builderWithHarvesting"] > 0) {

								incrementRemoteRoomCreepsSpawnRule(remoteRoomCreepsSpawnRules, spawningRoom.roomName, buildingRoom.roomName, cachedRuleName, "builder");
								spawningRoom.creepsCount["builderWithHarvesting"]--;
								remainingCreepsCount--;
							}
						} else {

							var incremented = false;

							if (lastCreepType === "builder") {

								if (spawningRoom.creepsCount["remoteBuilder"] > 0) {

									incrementRemoteRoomCreepsSpawnRule(remoteRoomCreepsSpawnRules, spawningRoom.roomName, buildingRoom.roomName, cachedRuleName, "remoteBuilder");
									spawningRoom.creepsCount["remoteBuilder"]--;
									remainingCreepsCount--;
									lastCreepType = "remoteBuilder";
									incremented = true;
								}
							} else {

								if (spawningRoom.creepsCount["builderWithHarvesting"] > 0) {

									incrementRemoteRoomCreepsSpawnRule(remoteRoomCreepsSpawnRules, spawningRoom.roomName, buildingRoom.roomName, cachedRuleName, "builder");
									spawningRoom.creepsCount["builderWithHarvesting"]--;
									remainingCreepsCount--;
									lastCreepType = "builder";
									incremented = true;
								}
							}

							if (!incremented) {

								if (spawningRoom.creepsCount["remoteBuilder"] > 0) {

									incrementRemoteRoomCreepsSpawnRule(remoteRoomCreepsSpawnRules, spawningRoom.roomName, buildingRoom.roomName, cachedRuleName, "remoteBuilder");
									spawningRoom.creepsCount["remoteBuilder"]--;
									remainingCreepsCount--;
								}

								if (spawningRoom.creepsCount["builderWithHarvesting"] > 0) {

									incrementRemoteRoomCreepsSpawnRule(remoteRoomCreepsSpawnRules, spawningRoom.roomName, buildingRoom.roomName, cachedRuleName, "builder");
									spawningRoom.creepsCount["builderWithHarvesting"]--;
									remainingCreepsCount--;
								}
							}
						}
					}

					if (remainingCreepsCount <= 0) {
						break;
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
		var remoteRoads = Game.rooms[remoteRoomName].find(FIND_STRUCTURES, {
			filter: { structureType: STRUCTURE_ROAD }
		})

		if (remoteRoads.length === 0) {
			partsPerMove = 1;
		}

		if (creepType === "remoteBuilder" && spawnRoomName !== remoteRoomName) {

			partsPerMove = 2;

			var spawnRoads = Game.rooms[spawnRoomName].find(FIND_STRUCTURES, {
				filter: { structureType: STRUCTURE_ROAD }
			})

			if (spawnRoads.length === 0 || remoteRoads.length === 0) {
				partsPerMove = 1;
			}
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