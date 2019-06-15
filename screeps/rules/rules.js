// TODO: error handling for bad creep type

var rules = {
	maximumAttackerSpawnCapacity: 700,
	maximumHealerSpawnCapacity: 700,
	maximumRangedAttackerSpawnCapacity: 700,
	evacuateRemoteRooms: true,
}

var creepsSpawnRules = [];
// NOTE: Order is important
creepsSpawnRules.push(require("./rooms/W7N8"));
creepsSpawnRules.push(require("./rooms/W7N10"));
creepsSpawnRules.push(require("./rooms/W7N9"));
creepsSpawnRules.push(require("./rooms/W8N10"));

var roomNamesCreepsSpawnRules = _.cloneDeep(creepsSpawnRules);

for (creepsSpawnRule of roomNamesCreepsSpawnRules) {

	roomNamesCreepsSpawnRules[creepsSpawnRule.roomName] = creepsSpawnRule;

	if (creepsSpawnRule.remoteRooms) {
		var remoteRooms = {};

		for (remoteCreepsSpawnRule of creepsSpawnRule.remoteRooms) {
			remoteRooms[remoteCreepsSpawnRule.roomName] = remoteCreepsSpawnRule;
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