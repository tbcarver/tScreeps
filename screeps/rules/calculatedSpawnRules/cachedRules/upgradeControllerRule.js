
var creepsSpawnRuleTools = require("../../creepsSpawnRuleTools");
var roomTools = require("../../../tools/roomTools");
var { rules } = require("../../rules")
var orderBy = require("lodash/orderBy");

var upgradeControllerRule = {
	coolOffCount: 50,
	oneToEightTogetherMinimum: rules.oneToEightTogetherMinimum || 7,
};

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

function buildOneToEightRules(creepsSpawnRules, cachedRuleName) {

	var energyTransferPercent = rules.upgradeControllerEnergyTransferPercent || 100;
	var spawningRooms = [];

	for (var roomName in Game.rooms) {

		var spawnsCount = roomTools.getSpawnsCount(roomName);
		var storageStats = roomTools.getStorageStats(roomName);
		var droppedEnergy = roomTools.getDroppedEnergy(roomName);
		var percentStoredEnergyRequiredMultiplier = 5;

		if (roomTools.hasDropFlag(roomName)) {
			droppedEnergy = roomTools.getDropFlagDroppedEnergy(roomName);
		}

		if (spawnsCount > 0) {

			var creepsCount = 2;

			if (storageStats.hasStorage && storageStats.percentageStoredEnergy >= percentStoredEnergyRequiredMultiplier * spawnsCount) {

				creepsCount = Math.floor(Math.ceil(storageStats.percentageStoredEnergy / 20) * spawnsCount);

			} else if (droppedEnergy > 0) {

				creepsCount = 4;

				if (droppedEnergy > 300) {
					creepsCount = Math.floor(droppedEnergy / 50);
				}
			}

			if (creepsCount > 0) {

				creepsCount = Math.floor(creepsCount * energyTransferPercent / 100);

				var spawningRoom = {
					roomName: roomName,
					creepsCount: creepsCount,
				};

				spawningRooms.push(spawningRoom);
			}
		}
	}

	var controllerToUpgrade;
	var controllers = _.map(Game.rooms, room => room.controller);
	var filteredControllers = controllers.filter(controller => controller.level >= 1 && controller.level <= this.oneToEightTogetherMinimum);

	if (filteredControllers.length === 0) {
		filteredControllers = controllers.filter(controller => controller.level >= 1 && controller.level <= 7);
	}

	if (filteredControllers.length > 0) {
		filteredControllers = orderBy(filteredControllers, "level", "desc");
		filteredControllers = orderBy(filteredControllers, "progress", "desc");
		controllerToUpgrade = filteredControllers[0];
	}

	var remoteRoomCreepsSpawnRules = {};

	if (spawningRooms.length > 0 && controllerToUpgrade) {

		var maxCreepsCount = roomTools.getCountControllerUpgradePositions(controllerToUpgrade);
		maxCreepsCount += Math.floor(maxCreepsCount * .25);

		for (var count = 1; count <= maxCreepsCount; count++) {
			for (var spawningRoom of spawningRooms) {

				if (spawningRoom.creepsCount > 0) {

					incrementRemoteRoomCreepsSpawnRule(remoteRoomCreepsSpawnRules, spawningRoom.roomName, controllerToUpgrade.room.name, cachedRuleName, controllerToUpgrade);
					spawningRoom.creepsCount--;
				}
			}
		}
	}

	return remoteRoomCreepsSpawnRules;
}

function incrementRemoteRoomCreepsSpawnRule(remoteRoomCreepsSpawnRules, spawnRoomName, remoteRoomName, cachedRuleName, controllerToUpgrade) {

	if (!remoteRoomCreepsSpawnRules[spawnRoomName]) {
		remoteRoomCreepsSpawnRules[spawnRoomName] = { remoteRooms: [] };
	}

	if (!_.some(remoteRoomCreepsSpawnRules[spawnRoomName].remoteRooms, { roomName: remoteRoomName })) {

		var creepsSpawnRuleKey = creepsSpawnRuleTools.buildCreepsSpawnRuleKey(spawnRoomName, remoteRoomName, "cached-" + cachedRuleName);
		var partsPerMove = 2;
		var hasStoredEnergy = roomTools.hasMinimumStoredEnergy(remoteRoomName);
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