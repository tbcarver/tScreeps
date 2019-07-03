// TODO: error handling for bad creep type

var rules = {
	creepsTickToLiveSpawnBuffer: 50,
	evacuateRemoteRooms: true,
	logRoomsCurrentSpawnedCounts: false,
	logSpawnStats: false,
	routeRoomsPriority: { W10N9: 3, W9N8: 2, W7N12: 2, W10N6: 2, W6N10: 2, W9N12: 2 },
	routeIgnoreRooms: [],
	maximumAttackerSpawnCapacity: 700,
	maximumHealerSpawnCapacity: 700,
	maximumRangedAttackerSpawnCapacity: 700,
	mobAttackRoomCoolDownCount: 15,
	observingRooms: ["W10N9", "W9N9", "W6N9", "W10N10", "W9N10", "W6N10", "W10N11", "W9N11", "W8N11", "W7N11", "W6N11", "W8N12", "W7N12", "W6N12", "W10N8", "W9N8", "W6N8", "W10N7", "W9N7", "W8N7", "W7N7", "W6N7", "W9N6", "W8N6", "W7N6"],
}

var creepsSpawnRules = [];
// NOTE: Order is important
creepsSpawnRules.push(require("./rooms/W7N9"));
creepsSpawnRules.push(require("./rooms/W7N8"));
creepsSpawnRules.push(require("./rooms/W7N10"));
creepsSpawnRules.push(require("./rooms/W8N8"));
creepsSpawnRules.push(require("./rooms/W8N10"));
creepsSpawnRules.push(require("./rooms/W8N9"));

var roomNamesCreepsSpawnRules = _.cloneDeep(creepsSpawnRules);

for (creepsSpawnRule of roomNamesCreepsSpawnRules) {

	roomNamesCreepsSpawnRules[creepsSpawnRule.roomName] = creepsSpawnRule;

	if (creepsSpawnRule.remoteRooms) {
		var remoteRooms = {};

		for (remoteCreepsSpawnRule of creepsSpawnRule.remoteRooms) {

			if (!remoteRooms[remoteCreepsSpawnRule.roomName]) {
				remoteRooms[remoteCreepsSpawnRule.roomName] = remoteCreepsSpawnRule;
			}
		}

		creepsSpawnRule.remoteRooms = remoteRooms;
	}
}

var creepsToSpawnTotal = 0;
var spawnedRoomsCreepsToSpawnTotal = {};

for (creepsSpawnRule of creepsSpawnRules) {
	spawnedRoomsCreepsToSpawnTotal[creepsSpawnRule.roomName] = 0;

	for (spawnOrderMaxSpawnedCount of creepsSpawnRule.spawnOrderMaxSpawnedCounts) {

		var creepType = Object.keys(spawnOrderMaxSpawnedCount)[0]
		creepsToSpawnTotal += spawnOrderMaxSpawnedCount[creepType];
		spawnedRoomsCreepsToSpawnTotal[creepsSpawnRule.roomName] += spawnOrderMaxSpawnedCount[creepType];
	}

	if (creepsSpawnRule.remoteRooms) {
		for (remoteRoom of creepsSpawnRule.remoteRooms) {
			for (remoteSpawnOrderMaxSpawnedCount of remoteRoom.spawnOrderMaxSpawnedCounts) {

				creepType = Object.keys(remoteSpawnOrderMaxSpawnedCount)[0]
				creepsToSpawnTotal += remoteSpawnOrderMaxSpawnedCount[creepType];
				spawnedRoomsCreepsToSpawnTotal[creepsSpawnRule.roomName] += remoteSpawnOrderMaxSpawnedCount[creepType];
			}
		}
	}
}

module.exports.rules = rules;
module.exports.creepsSpawnRules = creepsSpawnRules;
module.exports.roomNamesCreepsSpawnRules = roomNamesCreepsSpawnRules;
module.exports.creepsToSpawnTotal = creepsToSpawnTotal;
module.exports.spawnedRoomsCreepsToSpawnTotal = spawnedRoomsCreepsToSpawnTotal;