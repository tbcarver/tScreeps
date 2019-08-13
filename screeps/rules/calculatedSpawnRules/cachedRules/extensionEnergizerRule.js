
var creepsSpawnRuleTools = require("../../creepsSpawnRuleTools");
var roomTools = require("../../../tools/roomTools");

var extensionEnergizerRule = {
	coolOffCount: 300,
	prepend: true,
};

extensionEnergizerRule.buildCreepsSpawnRules = function(creepsSpawnRules, cachedRuleName) {

	var remoteRoomCreepsSpawnRules = {};

	for (var roomName in Game.rooms) {
		var room = Game.rooms[roomName];

		if (room.controller && room.controller.my) {

			var extensions = room.find(FIND_STRUCTURES, {
				filter: { structureType: STRUCTURE_EXTENSION }
			});

			if (extensions.length > 0) {

				var maxExtensionsPerEnergizer = extensions.length >= 16 ? 8 : 4;
				var countExtensionEnergizers = Math.floor(extensions.length / maxExtensionsPerEnergizer);

				remoteRoomCreepsSpawnRules[room.name] = { remoteRooms: [] };

				var creepsSpawnRuleKey = creepsSpawnRuleTools.buildCreepsSpawnRuleKey(room.name, room.name, "cached-" + cachedRuleName);
				var partsPerMove = 2;
				var hasDropFlagDroppedResources = roomTools.hasMinimumDropFlagDroppedEnergy(room.name);
				var hasStoredEnergy = roomTools.hasMinimumStoredEnergy(room.name);
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
						{ extensionEnergizer: countExtensionEnergizers },
					],
					canEnergyCreepsHarvest: !(hasStoredEnergy || hasDropFlagDroppedResources),
					canEnergyCreepsPickup: !hasStoredEnergy,
					maxExtensionsPerEnergizer: maxExtensionsPerEnergizer,
					partsPerMove: partsPerMove,
				});
			}
		}
	}

	return remoteRoomCreepsSpawnRules;
}


module.exports = extensionEnergizerRule;