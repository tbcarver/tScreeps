
// TODO: error handling for bad creep type
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
	upgradeControllerSpawnRule: "", // oneToEight
	upgradeControllerEnergyTransferPercent: 80,
	upgradeControllerOneToEightTogetherMinimum: 1,
	visualizeMovePaths: false,
	visualizeTravelPaths: false,
}

var creepsSpawnRules = /** @type {CreepsSpawnRule[]} */ ([]);
// NOTE: Order is important
creepsSpawnRules.push(require("./rooms/W4S9"));

var creepsSpawnRulesCopy = _.cloneDeep(creepsSpawnRules);
creepsSpawnRuleTools.storeCreepsSpawnRules(creepsSpawnRulesCopy);

module.exports.rules = rules;
module.exports.creepsSpawnRules = creepsSpawnRules;