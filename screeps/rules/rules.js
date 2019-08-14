
// TODO: error handling for bad creep type
var SpawnOrderMaxSpawnedCount = require("./spawnOrderMaxSpawnedCount");
var creepsSpawnRuleTools = require("./creepsSpawnRuleTools");

var rules = {
	creepsTickToLiveSpawnBuffer: 50,
	evacuateRooms: true,
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
	upgradeControllerEnergyTransferPercent: 100,
	oneToEightTogetherMinimum: 2,
	visualizeMovePaths: false,
	visualizeTravelPaths: false,
}

var creepsSpawnRules = /** @type {CreepsSpawnRule[]} */ ([]);
// NOTE: Order is important
creepsSpawnRules.push(require("./rooms/W12N16"));
// creepsSpawnRules.push(require("./rooms/W12N17"));

/** @param {CreepsSpawnRule[]} creepsSpawnRules */
function storeCreepsSpawnRules(creepsSpawnRules) {

	if (!Memory.state) {
		Memory.state = {};
	}

	var ruleKeyCreepsSpawnRules = {};

	for (var creepsSpawnRule of creepsSpawnRules) {

		var spawnCreepsSpawnRule = _.clone(creepsSpawnRule);
		delete spawnCreepsSpawnRule.remoteRooms;

		ruleKeyCreepsSpawnRules[spawnCreepsSpawnRule.roomName] = spawnCreepsSpawnRule;

		for (var remoteRoom of creepsSpawnRule.remoteRooms) {

			if (remoteRoom.creepsSpawnRuleKey) {

				ruleKeyCreepsSpawnRules[remoteRoom.creepsSpawnRuleKey] = remoteRoom;

			} else {

				var creepsSpawnRuleKey = creepsSpawnRuleTools.buildCreepsSpawnRuleKey(spawnCreepsSpawnRule.roomName, remoteRoom.roomName, "remote-room");
				ruleKeyCreepsSpawnRules[creepsSpawnRuleKey] = remoteRoom;
			}
		}
	}

	Memory.state.ruleKeyCreepsSpawnRules = ruleKeyCreepsSpawnRules;

	var creepsToSpawnTotal = 0;
	var spawnedRoomsCreepsToSpawnTotal = {};

	for (var creepsSpawnRule of creepsSpawnRules) {
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
storeCreepsSpawnRules(creepsSpawnRulesCopy);

module.exports.rules = rules;
module.exports.creepsSpawnRules = creepsSpawnRules;
module.exports.storeCreepsSpawnRules = storeCreepsSpawnRules;