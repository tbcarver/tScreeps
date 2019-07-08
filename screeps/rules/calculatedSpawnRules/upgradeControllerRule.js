var roomTools = require("../../tools/roomTools");
var rules = require("../../rules/rules")
var calculatedSpawnRulesTools = require("./calculatedSpawnRulesTools");
var orderBy = require("lodash/orderBy");

function addCalculatedSpawnRule(creepsSpawnRules) {

	if (rules.upgradeControllerSpawnRule) {

		if (rules.upgradeControllerSpawnRule === "oneToEight") {
			addOneToEightCalculatedSpawnRule(creepsSpawnRules);
		} else if (rules.upgradeControllerSpawnRule === "togetherToEight") {
			addTogetherToEightCalculatedSpawnRule(creepsSpawnRules);
		} else {
			debug.danger(`Unknown upgradeControllerSpawnRule: ${upgradeControllerSpawnRule}`)
		}
	}
}

function addOneToEightCalculatedSpawnRule(creepsSpawnRules) {

	transferringRooms = [];
	receivingRooms = [];

	for (var roomName in Game.rooms) {

		var storageStats = roomTools.getStorageStats(roomName);
		var spawnsCount = roomTools.getSpawnsCount(roomName);
		var percentStoredEnergyRequiredMultiplier = 5;

		if (storageStats.hasStorage && storageStats.percentageStoredEnergy >= percentStoredEnergyRequiredMultiplier * spawnsCount) {

			var transferringRoom = {
				roomName: roomName,
				creepsCount: Math.floor(Math.ceil((storageStats.percentageStoredEnergy - breakPoint) / 10) * spawnsCount),
			};

			transferringRooms.push(transferringRoom);

		}
	}

	var controllerToUpgrade;
	var controllers = _.map(Game.rooms, room => room.controller);
	var filteredControllers = controllers.filter(controller => controller.level >= 1 && controller.level <= 4);

	if (filteredControllers.length > 0) {

	} else {

		var filteredControllers = controllers.filter(controller => controller.level >= 1 && controller.level <= 7);
		if (filteredControllers.length > 0) {
			filteredControllers = orderBy(filteredControllers, "level", "desc");
			filteredControllers = orderBy(filteredControllers, "progress", "desc");
			controllerToUpgrade = filteredControllers[0];
		}
	}
}


function addTogetherToEightCalculatedSpawnRule(creepsSpawnRules) {

}


module.exports = addCalculatedSpawnRule;