
// TODO: Test and fix spawn chance.
//  Defenders are taking so long every one else dies during an attack.

try {

	var debug = require("../lib/coreVendor/coreScreeps/debug");
	var test = require("./tools/testTools");
	var constructionTools = require("./tools/constructionTools");
	var roomTools = require("./tools/roomTools");
	var spawnTools = require("./tools/spawnTools");
	var visualizeTools = require("./tools/visualizeTools");
	var creepsController = require("./creeps/creepsController");
	var towersController = require("./structures/towersController");

	initialize();

	global.debug = debug;

	var spawnsStats = buildSpawnStats();
	debug.primary(`tick: ${Game.time}`, spawnsStats);

	// console.log(controller.activateSafeMode())

	//  constructionTools.createConstructionRoad();
	//  constructionTools.createConstructionWalls();
	//  constructionTools.createConstructionSpawn();
	// constructionTools.removeConstructionSite();
	// constructionTools.destroyStructure();
	// roomTools.lookAt();
	// debug.primary("log", room.getEventLog(true));
	// roomTools.createFlag("barracks", COLOR_BLUE, [{"x":"26","y":"22","roomName":"W6S0"}]);
	// roomTools.createFlag("post_W7S2", COLOR_ORANGE, [{"x":"18","y":"18","roomName":"W7S2"}]);
	// roomTools.consoleWall();

	roomTools.consoleEnemies();
	visualizeTools.visualizeStructureHealth();
	// roomTools.visualizeCreepByType("defender", "blue");
	// roomTools.visualizeCreepByType("wallRepairer", "cyan");

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

		let sourceMap = require("./sourceMap");

		sourceMap.logStackTrace(error);

	} else {

		throw error;
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

	for (spawnName in Game.spawns) {

		var spawn = Game.spawns[spawnName];

		if (!spawnsStats[spawn.room.name]) {
			spawnsStats[spawn.room.name] = {};
		}

		if (!spawnsStats[spawn.room.name][spawn.name]) {
			spawnsStats[spawn.room.name][spawn.name] = {};
		}

		spawnsStats[spawn.room.name][spawn.name].capacity = spawnTools.calculateSpawnCapacity(spawn);
		spawnsStats[spawn.room.name][spawn.name].spawning = spawn.spawning ? spawn.spawning.remainingTime : "";
	}

	return spawnsStats;
}