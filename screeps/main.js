
// NOTE: Declaration order is important
var debug = require("../lib/coreVendor/coreScreeps/debug");
var debugObjectTable = require("../lib/coreVendor/coreScreeps/debugObjectTable");
var debugPairsTable = require("../lib/coreVendor/coreScreeps/debugPairsTable");

global.debug = debug;
global.debugObjectTable = debugObjectTable;
global.debugPairsTable = debugPairsTable;

var sourceMap = require("./sourceMap");
var { rules } = require("./rules/rules");
var test = require("./tools/testTools");
var constructionTools = require("./tools/constructionTools");
var enemyTools = require("./tools/enemyTools");
var roomTools = require("./tools/roomTools");
var spawnTools = require("./tools/spawnTools");
var visualizeTools = require("./tools/visualizeTools");
var creepsController = require("./creeps/creepsController");
var towersController = require("./structures/towersController");
var observersController = require("./structures/observersController");

// var profiler = require("../screeps-profiler");
// profiler.enable();

// TODO: Test and fix spawn chance.
//  Defenders are taking so long every one else dies during an attack.
function loop() {

	try {

		// profiler.wrap(function(){

		initialize();
		roomTools.buildRoomStats();
		// spawnTools.buildSpawnStats();

		if (rules.logSpawnStats) {

			var spawnsStats = buildSpawnStats();
			debugPairsTable.primary(spawnsStats);

		} else {

			var energyStats = roomTools.getTotalStoredEnergy().toLocaleString("en-US") + " " +
			roomTools.getTotalPercentageStoredEnergy() + "%";
		
			if (rules.logDroppedStats) {
				energyStats += " " + roomTools.getTotalDroppedEnergy().toLocaleString("en-US")
			}

			debug.primary(Game.time, energyStats);
		}

		// console.log(controller.activateSafeMode())

		//  constructionTools.createConstructionRoad();
		//  constructionTools.createConstructionWalls();
		//  constructionTools.createConstructionSpawn();
		// constructionTools.removeConstructionSite();
		// constructionTools.destroyStructure();
		// roomTools.lookAt();
		// debug.primary("log", room.getEventLog(true));

		// Game.rooms["W8N8"].createFlag(35,1, "exit-from-W8N8-to-W8N9", COLOR_GREEN, COLOR_WHITE)
		// Game.rooms["W9N8"].createFlag(16,7, "post-W9N8", COLOR_GREY, COLOR_ORANGE)
		// Game.rooms["W12N16"].createFlag(14,9, "drop-W12N16", COLOR_YELLOW)
		// Game.rooms["W7N8"].createFlag(13,24, "wait-W7N8", COLOR_RED, COLOR_YELLOW)

		// Game.flags["wait-W7N8"].setPosition(16,7)

		// roomTools.consoleWall();
		COLOR_ORANGE
		// roomTools.consoleEnemies();
		visualizeTools.visualizeStructureHealth();
		// roomTools.visualizeCreepByType("defender", "blue");
		// roomTools.visualizeCreepByType("wallRepairer", "cyan");

		// roomTools.observeRoom("W10N8", "W7N8");
		enemyTools.manageEnemies();

		creepsController.tick();
		towersController.tick();
		observersController.tick();

		for (var roomName in Game.rooms) {

			var room = Game.rooms[roomName];
			Memory.state.rooms[roomName].lastRoomEnergyAvailable = room.energyAvailable;
		}

		// console.log(JSON.stringify(Game.spawns["spawn1"].room.lookAt(29, 25)))
		test();

		// if (!Memory.state.profiler) {
		// 	Memory.state.profiler = true;
		// 	Game.profiler.profile(30, "Creep.moveTo");
		// }
		// delete Memory.state.profiler

		// });

	} catch (error) {

		if (error instanceof Error) {

			sourceMap.logStackTrace(error);

		} else {

			throw error;
		}
	}
}

function initialize() {

	if (!Memory.state) {
		Memory.state = {};
	}

	if (!Memory.state.rooms) {
		Memory.state.rooms = {};
	}

	for (var roomName in Game.rooms) {

		if (!Memory.state.rooms[roomName]) {
			Memory.state.rooms[roomName] = {};
		}

		if (!Memory.state.rooms[roomName].lastRoomEnergyAvailable) {
			Memory.state.rooms[roomName].lastRoomEnergyAvailable = 0;
		}
	}
}

function buildSpawnStats() {

	var spawnsStats = {};
	var energyStats = roomTools.getTotalStoredEnergy().toLocaleString("en-US") + " " +
	roomTools.getTotalPercentageStoredEnergy() + "%";

	if (rules.logDroppedStats) {
		energyStats += " " + roomTools.getTotalDroppedEnergy().toLocaleString("en-US")
	}

	spawnsStats[Game.time] = energyStats;

	for (spawnName in Game.spawns) {

		var spawn = Game.spawns[spawnName];
		var spawnName = spawn.room.name + ":" + spawnName;

		if (!spawnsStats[spawnName]) {
			spawnsStats[spawnName] = {};
		}

		var spawnCapacity = spawnTools.calculateSpawnCapacity(spawn);
		var remainingTime = spawn.spawning ? spawn.spawning.remainingTime : "";

		spawnsStats[spawnName] = spawn.room.energyAvailable + "/" + spawnCapacity + ":" + remainingTime;

		// debug.muted(`tick: ${Game.time} ${spawn.room.name} ${spawn.name} energy: ${spawn.room.energyAvailable} capacity ${spawnCapacity} spawning:`,
		// 	spawn.spawning ? spawn.spawning.remainingTime : "");
	}

	return spawnsStats;
}


module.exports.loop = loop;