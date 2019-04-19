
var debug = require("./debug");
var sourceMap = require("./sourceMap");
var creepsController = require("./creepsController");

try {

	debug.yellow("tick: ", Game.time);
	global.spawn = Game.spawns["spawn1"];
	global.room = spawn.room;

	if (Math.random() < .2) {
	
		debug.blue("spawn: ", global.spawn);
	}

	creepsController.tick();

} catch (error) {
	
	if (error instanceof Error) {

		sourceMap.logStackTrace(error);

	} else {

		throw error;
	}
}


// console.log("time: " + Game.time);

// global.spawn = Game.spawns["spawn1"];
// global.room = spawn.room;

// if (Math.random() < .2) {

// 	debug("spawn: ", global.spawn);
// }

// creepsController.tick();



// debug("Game: ", Game);
// debug("structures: ", Game.structures);

// debug("room: ", room);

// if (!Memory.structureIds) {
// 	Memory.structureIds = {};
// }

// if (!Memory.structureIds.controller) {

// 	var controller = room.find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_CONTROLLER } });
// 	Memory.structureIds.controller = controller.id;
// }

// debug("controller: ", controller);

// RawMemory.set("{}");

// debug("RawMemory: ", RawMemory.get());
// debug("Memory: ", Memory);
// debug("Creeps: ", Game.creeps);

//  harvester.createHarvesters(spawn);
// harvester.harvestLegacy(spawn);
// creep.cleanTheDead();




// var target = global.room.find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_CONTROLLER } });
// debug("target: ", target);

// debug("targetid: ", target.id);
// var gotObject = Game.getObjectById(target.id);
// debug("gotObject: ", gotObject);

// var sources = global.room.find(FIND_SOURCES);

// for (var source of sources) {


// 	debug("sources: ", source);
// 	debug("sources.id: ", source.id);


// 	gotObject = Game.getObjectById(source.id);
// 	debug("gotObject: ", gotObject);

// }

// var gotObject = Game.getObjectById("c99f0773646ccaf");
// debug("gotObject: ", gotObject);
