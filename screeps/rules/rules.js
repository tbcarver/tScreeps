// TODO: error handling for bad creep type

var rules = {
	routeRoomsPriority: { W10N9: 3, W9N8: 2, W7N12: 2 },
	routeIgnoreRooms: [],
	maximumAttackerSpawnCapacity: 700,
	maximumHealerSpawnCapacity: 700,
	maximumRangedAttackerSpawnCapacity: 700,
	evacuateRemoteRooms: true,
	logRoomsCurrentSpawnedCounts: false
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