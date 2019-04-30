
try {

	var debug = require("./debug");
	var test = require("./tools/testTools");
	var roomTools = require("./tools/roomTools");
	var visualizeTools = require("./tools/visualizeTools");
	var creepsController = require("./creepsController");

	global.spawn = Game.spawns["spawn1"];
	global.room = spawn.room;
	global.controller = spawn.room.controller;
	// console.log(global.controller.activateSafeMode())
	debug.muted(`tick: ${Game.time} energy: ${global.room.energyAvailable} spawning:`,
		global.spawn.spawning ? global.spawn.spawning.remainingTime : "" );

	if (Math.random() < .2) {
		debug.muted("spawn: ", global.spawn);
	}

	if (Math.random() < .2) {
		debug.muted("controller: ", global.controller);
	}

	// if (Math.random() < .2) {
	// 	debug.muted("sources: ", global.room.find(FIND_SOURCES));
	// }

	test();
	//  roomTools.createConstructionRoad();
	//  roomTools.createConstructionWalls();
	// roomTools.removeConstructionSite();
	// roomTools.lookAt();
	// debug.primary("log", global.room.getEventLog(true));
	// roomTools.createFlag("graveyard", COLOR_GREY, [{"x":"26","y":"26","roomName":"W6S0"}]);

	roomTools.consoleEnemies();
	visualizeTools.visualizeStructureHealth();
	visualizeTools.visualizeFlags();
	// roomTools.visualizeCreepByType("defender", "blue");
	// roomTools.visualizeCreepByType("wallRepairer", "cyan");

	creepsController.tick();

	Memory.state.lastSpawnEnergy = global.spawn.energy;

} catch (error) {

	if (error instanceof Error) {

		let sourceMap = require("./sourceMap");

		sourceMap.logStackTrace(error);

	} else {

		throw error;
	}
}

function initialize() {

	// Memory.state = {};
	// Memory.state.lastSpawnEnergy = 0;
}