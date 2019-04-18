
var debug = require("./debug");
var creep = require("./creeps/creep");
var harvester = require("./creeps/harvester");
var creepsController = require("./creepsController");


console.log("time: " + Game.time);

global.spawn = Game.spawns["spawn1"];
global.room = spawn.room;
// debug("spawn: ", spawn);


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


creepsController.tick();