
try {

	var debug = require("./debug");
	var test = require("./tools/testTools");
	var roomTools = require("./tools/roomTools");
	var creepsController = require("./creepsController");

	global.spawn = Game.spawns["spawn1"];
	global.room = spawn.room;
	global.controller = spawn.room.controller;
	// console.log(global.controller.activateSafeMode())
	debug.muted(`tick: ${Game.time} energy: ${global.room.energyAvailable}`);

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
	// roomTools.destroyStructure();
	// roomTools.lookAt();
	// debug.primary("log", global.room.getEventLog(true));
	roomTools.visualizeStructureHealth();
	creepsController.tick();

} catch (error) {

	if (error instanceof Error) {

		let sourceMap = require("./sourceMap");

		sourceMap.logStackTrace(error);

	} else {

		throw error;
	}
}