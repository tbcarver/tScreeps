
try {

	var debug = require("./debug");
	var test = require("./test");
	var roomTools = require("./roomTools");
	var creepsController = require("./creepsController");

	debug.gray("tick: ", Game.time);

	global.spawn = Game.spawns["spawn1"];
	global.room = spawn.room;
	global.controller = spawn.room.controller;

	if (Math.random() < .2) {

		debug.primary("spawn: ", global.spawn);
	}

	if (Math.random() < .2) {

		debug.primary("controller: ", global.controller);
	}

	test();
	// roomTools.createConstructionSites();
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