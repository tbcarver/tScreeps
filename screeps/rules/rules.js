// TODO: error handling for bad creep type

var rules = {
	creepsTickToLiveSpawnBuffer: 50,
	evacuateRooms: true,
	logDroppedStats: true,
	logRoomsCurrentSpawnedCounts: true,
	logSpawnStats: true,
	routeRoomsPriority: { W10N9: 3, W9N8: 2, W7N12: 2, W10N6: 2, W6N10: 2, W9N12: 2 },
	routeIgnoreRooms: [],
	maximumAttackerSpawnCapacity: 700,
	maximumHealerSpawnCapacity: 700,
	maximumRangedAttackerSpawnCapacity: 700,
	mobAttackRoomCoolDownCount: 15,
	observingRooms: ["W10N9", "W9N9", "W6N9", "W10N10", "W9N10", "W6N10", "W10N11", "W9N11", "W8N11", "W7N11", "W6N11", "W8N12", "W7N12", "W6N12", "W10N8", "W9N8", "W6N8", "W10N7", "W9N7", "W8N7", "W7N7", "W6N7", "W9N6", "W8N6", "W7N6", "W11N9"],
	upgradeControllerSpawnRule: "", // oneToEight, togetherToEight
}

var creepsSpawnRules = [];
// NOTE: Order is important
creepsSpawnRules.push(require("./rooms/W12N16"));

if (!Memory.state.roomNamesCreepsSpawnRules) {
	Memory.state.roomNamesCreepsSpawnRules = {};
}

function updateCreepsSpawnRules(creepsSpawnRules) {

	mergeTopRemoteRoomsOptions(creepsSpawnRules);
	buildRoomsCreepsSpawnRules(creepsSpawnRules);
}

function mergeTopRemoteRoomsOptions(creepsSpawnRules) {

	for (var creepsSpawnRule of creepsSpawnRules) {

		var topRemoteRooms = {};

		for (var remoteRoom of creepsSpawnRule.remoteRooms) {

			if (topRemoteRooms[remoteRoom.roomName]) {

				for (var optionName in remoteRoom) {
					if (!(optionName === "roomName" || optionName === "spawnOrderMaxSpawnedCounts")) {
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
			for (spawnOrderMaxSpawnedCount of creepsSpawnRule.spawnOrderMaxSpawnedCounts) {

				var creepType = Object.keys(spawnOrderMaxSpawnedCount)[0]
				creepsToSpawnTotal += spawnOrderMaxSpawnedCount[creepType];
				spawnedRoomsCreepsToSpawnTotal[creepsSpawnRule.roomName] += spawnOrderMaxSpawnedCount[creepType];
			}
		}

		if (creepsSpawnRule.remoteRooms) {
			for (remoteRoom of creepsSpawnRule.remoteRooms) {
				if (remoteRoom.spawnOrderMaxSpawnedCounts) {
					for (remoteSpawnOrderMaxSpawnedCount of remoteRoom.spawnOrderMaxSpawnedCounts) {

						creepType = Object.keys(remoteSpawnOrderMaxSpawnedCount)[0]
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