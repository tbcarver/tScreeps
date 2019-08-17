
var creepsSpawnRuleTools = require("../../creepsSpawnRuleTools");
var roomTools = require("../../../tools/roomTools");

var spawnEnergizerRule = {
	coolOffCount: 50,
	prepend: true,
};

spawnEnergizerRule.buildCreepsSpawnRules = function(creepsSpawnRules, cachedRuleName) {

	var remoteRoomCreepsSpawnRules = {};

	for (var roomName in Game.rooms) {
		var room = Game.rooms[roomName];

		if (room.controller && room.controller.my && roomTools.hasSpawns(roomName)) {

			var countSpawnEnergizers = 2;

			if (room.controller.level < 2) {
				countSpawnEnergizers = 3;
			} else if (room.controller.level <= 4) {

				var extensions = room.find(FIND_STRUCTURES, {
					filter: { structureType: STRUCTURE_EXTENSION }
				});

				if (extensions.length < 8) {
					countSpawnEnergizers = 3;
				}
			}

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
					{ spawnEnergizer: countSpawnEnergizers },
				],
				canEnergyCreepsHarvest: !(hasStoredEnergy || hasDropFlagDroppedResources),
				canEnergyCreepsPickup: !hasStoredEnergy,
				partsPerMove: partsPerMove,
			});
		}
	}

	return remoteRoomCreepsSpawnRules;
}


module.exports = spawnEnergizerRule;