
var roomTools = require("../../../tools/roomTools");
var { rules } = require("../../rules")
var orderBy = require("lodash/orderBy");

var upgradeControllerRule = {
	coolOffCount: 50,
};

var energyTransferPercent = 100;

if (typeof rules.upgradeControllerEnergyTransferPercent === "number") {
	energyTransferPercent = rules.upgradeControllerEnergyTransferPercent;
}

upgradeControllerRule.buildCreepsSpawnRules = function(creepsSpawnRules, cachedRuleName) {

	var remoteRoomCreepsSpawnRules;

	if (rules.upgradeControllerSpawnRule) {

		switch (rules.upgradeControllerSpawnRule) {
			case "oneToEight":
				remoteRoomCreepsSpawnRules = buildOneToEightRules(creepsSpawnRules, cachedRuleName);
				break;

			default:
				debug.danger(`Unknown upgradeControllerSpawnRule: ${rules.upgradeControllerSpawnRule}`);
				break;
		}
	}

	return remoteRoomCreepsSpawnRules;
}

upgradeControllerRule.getControllerToUpgrade = function(creepsSpawnRules, cachedRuleName) {

	var controllerToUpgrade;

	if (rules.upgradeControllerControllerToUpgrade) {

		if (Game.rooms[rules.upgradeControllerControllerToUpgrade] && Game.rooms[rules.upgradeControllerControllerToUpgrade].controller.my) {
			controllerToUpgrade = Game.rooms[rules.upgradeControllerControllerToUpgrade].controller;
		}
	}

	if (!controllerToUpgrade) {

		var controllers = roomTools.getControllers();
		var oneToEightTogetherMinimum = rules.upgradeControllerOneToEightTogetherMinimum || 7;
		var filteredControllers = controllers.filter(controller => controller.level >= 1 && controller.level < oneToEightTogetherMinimum);

		if (filteredControllers.length === 0) {
			filteredControllers = controllers.filter(controller => controller.level >= 1 && controller.level <= 7);
		}

		if (filteredControllers.length > 0) {
			filteredControllers = orderBy(filteredControllers, ['level', 'progress'], ['desc', 'desc']);
			controllerToUpgrade = filteredControllers[0];
		}
	}

	return controllerToUpgrade;
}

function buildOneToEightRules(creepsSpawnRules, cachedRuleName) {

	var remoteRoomCreepsSpawnRules = {};
	var controllerToUpgrade = upgradeControllerRule.getControllerToUpgrade();

	if (controllerToUpgrade) {

		var roomName = controllerToUpgrade.room.name;
		var availableEnergy = 0;

		if (roomTools.hasMinimumStoredEnergy(roomName)) {

			availableEnergy = roomTools.getStoredEnergy(roomName);

		} else if (roomTools.hasMinimumDropFlagDroppedEnergy(roomName)) {

			availableEnergy = roomTools.getDropFlagDroppedEnergy(roomName);
		}

		availableEnergy = Math.floor(availableEnergy * energyTransferPercent / 100);

		// TODO: Need to calculate the the average growth of stored energy over time and subtract operating energy need and calculate from there
		var upgradeRoomMaxCreepsCount = Math.floor(availableEnergy / 100);

		if (upgradeRoomMaxCreepsCount < 4) {
			upgradeRoomMaxCreepsCount = 4;
		}

		if (rules.upgradeControllerUseTransferers) {

		}

		var maxCreepsCount = roomTools.getCountControllerUpgradePositionsTwoDeep(controllerToUpgrade);
		maxCreepsCount += Math.floor(maxCreepsCount * .25);

		if (rules.upgradeControllerUseTransferers) {
			maxCreepsCount = roomTools.getCountControllerUpgradePositionsOneDeep(controllerToUpgrade);
			maxCreepsCount += Math.floor(maxCreepsCount * .05);
		}

		if (upgradeRoomMaxCreepsCount > maxCreepsCount) {
			upgradeRoomMaxCreepsCount = maxCreepsCount;
		}

		var spawningRooms = [];

		for (roomName in Game.rooms) {

			var spawnsCount = roomTools.getSpawnsCount(roomName);

			if (spawnsCount > 0) {

				var spawningRoom = {
					roomName: roomName,
					creepsCount: 18 * spawnsCount,
				};

				spawningRooms.push(spawningRoom);
			}
		}

		if (!_.isEmpty(spawningRooms)) {

			var remainingCreepsCount = upgradeRoomMaxCreepsCount;

			for (var count = 1; count <= upgradeRoomMaxCreepsCount; count++) {
				for (var spawningRoom of spawningRooms) {

					if (spawningRoom.creepsCount > 0) {

						incrementRemoteRoomCreepsSpawnRule(remoteRoomCreepsSpawnRules, spawningRoom.roomName, controllerToUpgrade.room.name, cachedRuleName, controllerToUpgrade);
						spawningRoom.creepsCount--;
						remainingCreepsCount--;
					}
				}

				if (remainingCreepsCount <= 0) {
					break;
				}
			}
		}

		if (rules.upgradeControllerUseTransferers && !_.isEmpty(remoteRoomCreepsSpawnRules) &&
			upgradeRoomMaxCreepsCount > 0 && roomTools.hasSpawns(controllerToUpgrade.room.name)) {

			var spawnRoomName = controllerToUpgrade.room.name;
			var remoteRoomName = controllerToUpgrade.room.name;

			if (!_.some(remoteRoomCreepsSpawnRules[spawnRoomName].remoteRooms, { roomName: remoteRoomName })) {

				var partsPerMove = 2;
				var hasStoredEnergy = roomTools.hasMinimumStoredEnergy(remoteRoomName);
				var roads = Game.rooms[remoteRoomName].find(FIND_STRUCTURES, {
					filter: { structureType: STRUCTURE_ROAD }
				})

				if (roads.length === 0) {
					partsPerMove = 1;
				}

				var creepsSpawnRule = {
					roomName: remoteRoomName,
					spawnOrderMaxSpawnedCounts: [],
					canControllerEnergizersBuild: true,
					canEnergyCreepsPickup: !hasStoredEnergy,
					partsPerMove: partsPerMove,
				}

				remoteRoomCreepsSpawnRules[spawnRoomName].remoteRooms.push(creepsSpawnRule);
			}

			var remoteRoom = /** @type {RemoteRoomCreepsSpawnRule} */(_.find(remoteRoomCreepsSpawnRules[spawnRoomName].remoteRooms, { roomName: remoteRoomName }));
			var transfererCount = Math.round(upgradeRoomMaxCreepsCount / 6);
			var rangeToStorage;

			if (roomTools.hasStorage(controllerToUpgrade.room.name)) {

				var storage = controllerToUpgrade.pos.findClosestByRange(FIND_STRUCTURES, {
					filter: structure => structure.structureType === STRUCTURE_STORAGE ||
						structure.structureType === STRUCTURE_TERMINAL
				});

				rangeToStorage = controllerToUpgrade.pos.getRangeTo(storage);

			} else if (roomTools.hasDropFlag(controllerToUpgrade.room.name)) {

				var dropFlag = roomTools.getDropFlag(controllerToUpgrade.room.name);
				rangeToStorage = controllerToUpgrade.pos.getRangeTo(dropFlag);
			}

			if (rangeToStorage) {
				transfererCount = Math.round(transfererCount * rangeToStorage / 8);
			}

			remoteRoom.spawnOrderMaxSpawnedCounts.unshift({ controllerEnergizerTransferer: transfererCount });
		}
	}

	return remoteRoomCreepsSpawnRules;
}

function incrementRemoteRoomCreepsSpawnRule(remoteRoomCreepsSpawnRules, spawnRoomName, remoteRoomName, cachedRuleName, controllerToUpgrade) {

	if (!remoteRoomCreepsSpawnRules[spawnRoomName]) {
		remoteRoomCreepsSpawnRules[spawnRoomName] = { remoteRooms: [] };
	}

	if (!_.some(remoteRoomCreepsSpawnRules[spawnRoomName].remoteRooms, { roomName: remoteRoomName })) {

		var partsPerMove = 2;
		var hasStoredEnergy = roomTools.hasMinimumStoredEnergy(remoteRoomName);
		var roads = Game.rooms[remoteRoomName].find(FIND_STRUCTURES, {
			filter: { structureType: STRUCTURE_ROAD }
		})

		if (roads.length === 0) {
			partsPerMove = 1;
		}

		var creepsSpawnRule = {
			roomName: remoteRoomName,
			spawnOrderMaxSpawnedCounts: [
				{ controllerEnergizer: 0 },
			],
			canControllerEnergizersBuild: true,
			canEnergyCreepsPickup: !hasStoredEnergy,
			partsPerMove: partsPerMove,
		}

		remoteRoomCreepsSpawnRules[spawnRoomName].remoteRooms.push(creepsSpawnRule);
	}

	var remoteRoom = /** @type {RemoteRoomCreepsSpawnRule} */(_.find(remoteRoomCreepsSpawnRules[spawnRoomName].remoteRooms, { roomName: remoteRoomName }));
	remoteRoom.spawnOrderMaxSpawnedCounts[0]["controllerEnergizer"]++;
}


module.exports = upgradeControllerRule;