
// TODO: Test and fix spawn chance.
//  Defenders are taking so long every one else dies during an attack.

try {

	var debug = require("./debug");
	var test = require("./tools/testTools");
	var constructionTools = require("./tools/constructionTools");
	var roomTools = require("./tools/roomTools");
	var visualizeTools = require("./tools/visualizeTools");
	var creepsController = require("./creepsController");

	global.debug = debug;
	global.spawn = Game.spawns["spawn1"];
	global.room = spawn.room;
	global.controller = spawn.room.controller;
	// console.log(global.controller.activateSafeMode())
	debug.muted(`tick: ${Game.time} energy: ${global.room.energyAvailable} spawning:`,
		global.spawn.spawning ? global.spawn.spawning.remainingTime : "" );

	// if (Math.random() < .2) {
	// 	debug.muted("spawn: ", global.spawn);
	// }

	// if (Math.random() < .2) {
	// 	debug.muted("controller: ", global.controller);
	// }

	// if (Math.random() < .2) {
	// 	debug.muted("sources: ", global.room.find(FIND_SOURCES));
	// }

	test();
	//  constructionTools.createConstructionRoad();
	//  constructionTools.createConstructionExtension();
	// constructionTools.removeConstructionSite();
	// constructionTools.destroyStructure();
	// roomTools.lookAt();
	// debug.primary("log", global.room.getEventLog(true));
	// roomTools.createFlag("barracks", COLOR_BLUE, [{"x":"26","y":"22","roomName":"W6S0"}]);
	// roomTools.consoleWall();

	roomTools.consoleEnemies();
	visualizeTools.visualizeStructureHealth();
	visualizeTools.visualizeFlags();
	// roomTools.visualizeCreepByType("defender", "blue");
	// roomTools.visualizeCreepByType("wallRepairer", "cyan");

	creepsController.tick();

	Memory.state.lastRoomEnergyAvailable = global.room.energyAvailable;

	// console.log(JSON.stringify(Game.spawns["spawn1"].room.lookAt(29, 25)))

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