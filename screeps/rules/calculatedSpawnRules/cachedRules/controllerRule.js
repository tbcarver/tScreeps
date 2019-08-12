
var creepsSpawnRuleTools = require("../../creepsSpawnRuleTools");
var roomTools = require("../../../tools/roomTools");

var controllerRule = {
	coolOffCount: 300,
	prepend: true,
};

controllerRule.buildCreepsSpawnRules = function(creepsSpawnRules, cachedRuleName) {

	var remoteRoomCreepsSpawnRules = {};

	for (var roomName in Game.rooms) {
		var room = Game.rooms[roomName];

		if (room.controller && room.controller.my) {

			remoteRoomCreepsSpawnRules[room.name] = { remoteRooms: [] };

			var creepsSpawnRuleKey = creepsSpawnRuleTools.buildCreepsSpawnRuleKey(room.name, room.name, "cached-" + cachedRuleName);
			var partsPerMove = 2;
			var hasDropFlagDroppedResources = roomTools.getDropFlagDroppedEnergy(room.name) > 200;
			var hasStorage = roomTools.hasStorage(room.name);
			var roads = Game.rooms[room.name].find(FIND_STRUCTURES, {
				filter: { structureType: STRUCTURE_ROAD }
			})

			if (roads.length === 0) {
				partsPerMove = 1;
			}

			remoteRoomCreepsSpawnRules[room.name].remoteRooms.push({
				creepsSpawnRuleKey: creepsSpawnRuleKey,
				roomName: room.name,
				spawnOrderMaxSpawnedCounts: [
					{ controllerEnergizer: 1 },
				],
				canEnergyCreepsHarvest: !(hasStorage || hasDropFlagDroppedResources),
				canEnergyCreepsPickup: !hasStorage,
				partsPerMove: partsPerMove,
			});
		}
	}

	return remoteRoomCreepsSpawnRules;
}


module.exports = controllerRule;