
// TODO: error handling for bad creep type
var creepsSpawnRuleTools = require("./creepsSpawnRuleTools");

var rules = {
	creepsTickToLiveSpawnBuffer: 50,
	evacuateRooms: true,
	logRoomsCurrentSpawnedCounts: "collapsed", // true, "collapsed" or false
	logSpawnStats: true,
	routeRoomsPriority: { W10N16: 2, W10N18: 2, W10N17: 3,},
	routeIgnoreRooms: [],
	maximumAttackerSpawnCapacity: 700,
	maximumHealerSpawnCapacity: 700,
	maximumRangedAttackerSpawnCapacity: 700,
	maximumWallRepair: 300,
	mobAttackRoomCoolDownCount: 15,
	observingRooms: [""],
	storageTransferSpawnRule: "balanced", // oneToEight, balanced
	upgradeControllerSpawnRule: "oneToEight", // oneToEight
	upgradeControllerEnergyTransferPercent: 100,
	upgradeControllerOneToEightTogetherMinimum: 3,
	visualizeMovePaths: false,
	visualizeTravelPaths: false,
}

var creepsSpawnRules = /** @type {CreepsSpawnRule[]} */ ([]);
// NOTE: Order is important
creepsSpawnRules.push(require("./rooms/W11N17"));
creepsSpawnRules.push(require("./rooms/W10N17"));


module.exports.rules = rules;
module.exports.creepsSpawnRules = creepsSpawnRules;

// Spawn1 24,25
// dropFlag 25,20
// extension 27,25
// storage 24,20

// Spawn2 26,18
// dropFlag 30,22
// extension 27,24


// Game.rooms["W11N17"].createFlag(25,20, "drop-W11N17", COLOR_YELLOW)
// Game.rooms["W11N17"].createFlag(20,8, "post-W11N17", COLOR_GREY, COLOR_ORANGE)

// Game.rooms["W11N17"].createFlag(49,11, "exit-from-W11N17-to-W10N17", COLOR_GREEN, COLOR_WHITE)