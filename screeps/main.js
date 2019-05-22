
// TODO: Test and fix spawn chance.
//  Defenders are taking so long every one else dies during an attack.

try {

	// oneTimeInitialize();

	var debug = require("../lib/coreVendor/coreScreeps/debug");
	var test = require("./tools/testTools");
	var constructionTools = require("./tools/constructionTools");
	var roomTools = require("./tools/roomTools");
	var spawnTools = require("./tools/spawnTools");
	var visualizeTools = require("./tools/visualizeTools");
	var creepsController = require("./creeps/creepsController");
	var towersController = require("./structures/towersController");

	global.debug = debug;

	for (spawnName in Game.spawns) {

		var spawn = Game.spawns[spawnName];
		var room = spawn.room;
	
		var spawnCapacity = spawnTools.calculateSpawnCapacity(spawn);
		debug.muted(`tick: ${Game.time} ${spawn.name} energy: ${room.energyAvailable} capacity ${spawnCapacity} spawning:`,
			spawn.spawning ? spawn.spawning.remainingTime : "");
	}

	// console.log(controller.activateSafeMode())

	//  constructionTools.createConstructionRoad();
	//  constructionTools.createConstructionStorage();
	// constructionTools.removeConstructionSite();
	// constructionTools.destroyStructure();
	// roomTools.lookAt();
	// debug.primary("log", room.getEventLog(true));
	// roomTools.createFlag("barracks", COLOR_BLUE, [{"x":"26","y":"22","roomName":"W6S0"}]);
	// roomTools.consoleWall();

	roomTools.consoleEnemies();
	visualizeTools.visualizeStructureHealth();
	// visualizeTools.visualizeFlags();
	// roomTools.visualizeCreepByType("defender", "blue");
	// roomTools.visualizeCreepByType("wallRepairer", "cyan");

	creepsController.tick();
	towersController.tick();

	Memory.state.lastRoomEnergyAvailable = room.energyAvailable;

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

function oneTimeInitialize() {

	if (!Memory.state) {

		Memory.state = {};
		Memory.state.nextCreepId = 0;
		Memory.state.lastSpawnEnergy = 0;
		Memory.state.lastRoomEnergyAvailable = 0;
	}
}