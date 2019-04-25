
try {

	var debug = require("./debug");
	var test = require("./test");
	var roomTools = require("./roomTools");
	var creepsController = require("./creepsController");

	global.spawn = Game.spawns["spawn1"];
	global.room = spawn.room;
	global.controller = spawn.room.controller;

	debug.muted(`tick: ${Game.time} energy: ${global.room.energyAvailable}`);

	if (Math.random() < .2) {

		debug.muted("spawn: ", global.spawn);
	}

	// if (Math.random() < .2) {

	// 	debug.muted("controller: ", global.controller);
	// }

	test();
	// roomTools.createConstructionRoad();
	
	// roomTools.lookAt();
	creepsController.tick();

} catch (error) {

	if (error instanceof Error) {

		let sourceMap = require("./sourceMap");

		sourceMap.logStackTrace(error);

	} else {

		throw error;
	}
}