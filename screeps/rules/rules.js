
// TODO: error handling for bad creep type
var SpawnOrderMaxSpawnedCount = require("./spawnOrderMaxSpawnedCount");

var rules = {
	creepsTickToLiveSpawnBuffer: 50,
	evacuateRooms: true,
	logDroppedStats: true,
	logRoomsCurrentSpawnedCounts: "collapsed", // true, "collapsed" or false
	logSpawnStats: true,
	routeRoomsPriority: { W10N9: 3, W9N8: 2, W7N12: 2, W10N6: 2, W6N10: 2, W9N12: 2 },
	routeIgnoreRooms: [],
	maximumAttackerSpawnCapacity: 700,
	maximumHealerSpawnCapacity: 700,
	maximumRangedAttackerSpawnCapacity: 700,
	mobAttackRoomCoolDownCount: 15,
	observingRooms: [""],
	upgradeControllerSpawnRule: "oneToEight", // oneToEight
	oneToEightTogetherMinimum: 2,
	visualizeMovePaths: false,
	visualizeTravelPaths: false,
}

var creepsSpawnRules = /** @type {CreepsSpawnRule[]} */ ([]);
// NOTE: Order is important
creepsSpawnRules.push(require("./rooms/W12N16"));
// creepsSpawnRules.push(require("./rooms/W12N17"));

function updateCreepsSpawnRules(creepsSpawnRules) {

	mergeTopRemoteRoomsOptions(creepsSpawnRules);
	buildRoomsCreepsSpawnRules(creepsSpawnRules);
}

var remoteRoomsOptionsToNotMerge = ["roomName", "spawnOrderMaxSpawnedCounts", "roomStrategy", "measure"];

function mergeTopRemoteRoomsOptions(creepsSpawnRules) {

	for (var creepsSpawnRule of creepsSpawnRules) {

		var topRemoteRooms = {};

		for (var remoteRoom of creepsSpawnRule.remoteRooms) {

			if (topRemoteRooms[remoteRoom.roomName]) {

				for (var optionName in remoteRoom) {
					if (!remoteRoomsOptionsToNotMerge.includes(optionName)) {
						topRemoteRooms[remoteRoom.roomName][optionName] = remoteRoom[optionName];
					}
				}
			} else {
				topRemoteRooms[remoteRoom.roomName] = remoteRoom;
			}
		}
	}
}

function buildRoomsCreepsSpawnRules(creepsSpawnRules) {

	if (!Memory.state) {
		Memory.state = {};
	}

	if (!Memory.state.roomNamesCreepsSpawnRules) {
		Memory.state.roomNamesCreepsSpawnRules = {};
	}

	var roomNamesCreepsSpawnRules = {};

	for (var creepsSpawnRule of creepsSpawnRules) {

		roomNamesCreepsSpawnRules[creepsSpawnRule.roomName] = {};

		for (var key in creepsSpawnRule) {
			if (key !== "remoteRooms") {
				roomNamesCreepsSpawnRules[creepsSpawnRule.roomName][key] = creepsSpawnRule[key];
			}
		}

		if (creepsSpawnRule.remoteRooms) {

			var remoteRooms = {};

			for (var remoteCreepsSpawnRule of creepsSpawnRule.remoteRooms) {

				if (!remoteRooms[remoteCreepsSpawnRule.roomName]) {
					remoteRooms[remoteCreepsSpawnRule.roomName] = remoteCreepsSpawnRule;
				}
			}

			roomNamesCreepsSpawnRules[creepsSpawnRule.roomName].remoteRooms = remoteRooms;
		}
	}

	Memory.state.roomNamesCreepsSpawnRules = roomNamesCreepsSpawnRules;

	var creepsToSpawnTotal = 0;
	var spawnedRoomsCreepsToSpawnTotal = {};

	for (creepsSpawnRule of creepsSpawnRules) {
		spawnedRoomsCreepsToSpawnTotal[creepsSpawnRule.roomName] = 0;

		if (creepsSpawnRule.spawnOrderMaxSpawnedCounts) {
			for (var spawnOrderMaxSpawnedCount of creepsSpawnRule.spawnOrderMaxSpawnedCounts) {

				var creepType = SpawnOrderMaxSpawnedCount.getCreepType(spawnOrderMaxSpawnedCount);
				creepsToSpawnTotal += spawnOrderMaxSpawnedCount[creepType];
				spawnedRoomsCreepsToSpawnTotal[creepsSpawnRule.roomName] += spawnOrderMaxSpawnedCount[creepType];
			}
		}

		if (creepsSpawnRule.remoteRooms) {
			for (var remoteRoom of creepsSpawnRule.remoteRooms) {
				if (remoteRoom.spawnOrderMaxSpawnedCounts) {
					for (var remoteSpawnOrderMaxSpawnedCount of remoteRoom.spawnOrderMaxSpawnedCounts) {

						creepType = SpawnOrderMaxSpawnedCount.getCreepType(remoteSpawnOrderMaxSpawnedCount);
						creepsToSpawnTotal += remoteSpawnOrderMaxSpawnedCount[creepType];
						spawnedRoomsCreepsToSpawnTotal[creepsSpawnRule.roomName] += remoteSpawnOrderMaxSpawnedCount[creepType];
					}
				}
			}
		}
	}

	Memory.state.creepsToSpawnTotal = creepsToSpawnTotal;
	Memory.state.spawnedRoomsCreepsToSpawnTotal = spawnedRoomsCreepsToSpawnTotal;
}

var creepsSpawnRulesCopy = _.cloneDeep(creepsSpawnRules);
mergeTopRemoteRoomsOptions(creepsSpawnRulesCopy);
buildRoomsCreepsSpawnRules(creepsSpawnRulesCopy);

module.exports.rules = rules;
module.exports.creepsSpawnRules = creepsSpawnRules;
module.exports.updateCreepsSpawnRules = updateCreepsSpawnRules;