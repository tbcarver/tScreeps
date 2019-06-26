

var sourceMap = require("./sourceMap");
var debug = require("../lib/coreVendor/coreScreeps/debug");
var debugObjectTable = require("../lib/coreVendor/coreScreeps/debugObjectTable");
var debugPairsTable = require("../lib/coreVendor/coreScreeps/debugPairsTable");
var rules = require("./rules/rules");
var test = require("./tools/testTools");
var constructionTools = require("./tools/constructionTools");
var enemyTools = require("./tools/enemyTools");
var roomTools = require("./tools/roomTools");
var spawnTools = require("./tools/spawnTools");
var visualizeTools = require("./tools/visualizeTools");
var creepsController = require("./creeps/creepsController");
var towersController = require("./structures/towersController");

global.debug = debug;
global.debugObjectTable = debugObjectTable;
global.debugPairsTable = debugPairsTable;
global.rules = rules.rules;

// var profiler = require("../screeps-profiler");
// profiler.enable();

// TODO: Test and fix spawn chance.
//  Defenders are taking so long every one else dies during an attack.
function loop() {

	try {

		// profiler.wrap(function(){

		initialize();

		var spawnsStats = buildSpawnStats();
		debugPairsTable.primary(spawnsStats);

		// console.log(controller.activateSafeMode())

		//  constructionTools.createConstructionRoad();
		//  constructionTools.createConstructionWalls();
		//  constructionTools.createConstructionSpawn();
		// constructionTools.removeConstructionSite();
		// constructionTools.destroyStructure();
		// roomTools.lookAt();
		// debug.primary("log", room.getEventLog(true));

		// Game.rooms["W9N8"].createFlag(16, 7, "post-W9N8", COLOR_GREY, COLOR_ORANGE)
		// Game.rooms["W9N6"].createFlag(27,1, "exit-from-W9N6-to-W9N7", COLOR_GREEN, COLOR_WHITE)
		// Game.rooms["W10N7"].createFlag(48,31, "exit-from-W10N7-to-W9N7", COLOR_GREEN, COLOR_WHITE)
		// Game.rooms["W9N7"].createFlag(1,31, "exit-from-W9N7-to-W10N7", COLOR_GREEN, COLOR_WHITE)
		// Game.rooms["W8N8"].createFlag(35,1, "exit-from-W8N8-to-W8N9", COLOR_GREEN, COLOR_WHITE)
		// Game.rooms["W7N11"].createFlag(17,42, "drop-W7N11", COLOR_YELLOW)
		// Game.rooms["W7N8"].createFlag(13,24, "wait-W7N8", COLOR_RED, COLOR_YELLOW)

		// Game.flags["wait-W7N8"].setPosition(16,7)

		// roomTools.consoleWall();
		COLOR_ORANGE
		// roomTools.consoleEnemies();
		visualizeTools.visualizeStructureHealth();
		// roomTools.visualizeCreepByType("defender", "blue");
		// roomTools.visualizeCreepByType("wallRepairer", "cyan");

		roomTools.observeRoom("W9N9", "W7N8");
		enemyTools.manageEnemies();

		creepsController.tick();
		towersController.tick();

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

	var totalContainerEnergy = 0;
	for (var roomName in Game.rooms) {

		var room = Game.rooms[roomName];
		var storage = room.find(FIND_STRUCTURES, {
			filter: structure => structure.structureType === STRUCTURE_STORAGE ||
				structure.structureType === STRUCTURE_TERMINAL
		});

		if (storage.length > 0) {
			totalContainerEnergy += storage[0].store.energy;
		}
	}

	spawnsStats[Game.time] = totalContainerEnergy.toLocaleString("en-US");

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