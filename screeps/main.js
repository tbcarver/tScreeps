

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

// TODO: Test and fix spawn chance.
//  Defenders are taking so long every one else dies during an attack.
function loop() {

	try {

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
		// roomTools.createFlag("barracks", COLOR_BLUE, [{"x":"26","y":"22","roomName":"W6S0"}]);
		// roomTools.createFlag("post-W7S2", COLOR_ORANGE, [{"x":"18","y":"18","roomName":"W7S2"}]);
		// Game.rooms["W6N9"].createFlag(26, 20, "post-W6N9", COLOR_GREY, COLOR_ORANGE)
		// Game.rooms["W6N9"].createFlag(27,48, "exit-from-W6N9-to-W6N8", COLOR_GREEN, COLOR_WHITE)
		// Game.flags["exit-from-W6N9-to-W8N10"].setPosition(14,48)
		// Game.rooms["W7N7"].createFlag(48,27, "drop-W7N7", COLOR_YELLOW)
		// roomTools.consoleWall();
		COLOR_ORANGE
		// roomTools.consoleEnemies();
		visualizeTools.visualizeStructureHealth();
		// roomTools.visualizeCreepByType("defender", "blue");
		// roomTools.visualizeCreepByType("wallRepairer", "cyan");

		enemyTools.manageEnemies();

		creepsController.tick();
		towersController.tick();

		for (var roomName in Game.rooms) {

			var room = Game.rooms[roomName];
			Memory.state.rooms[roomName].lastRoomEnergyAvailable = room.energyAvailable;
		}

		// console.log(JSON.stringify(Game.spawns["spawn1"].room.lookAt(29, 25)))
		test();

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
		var containers = room.find(FIND_STRUCTURES, {
			filter: { structureType: STRUCTURE_STORAGE }
		});

		if (containers.length > 0) {
			totalContainerEnergy += containers[0].store.energy;
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