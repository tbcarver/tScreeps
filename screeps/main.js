
var debug = require("./debug");
var harvester = require("./harvester");

console.log("time: " + Game.time);

var spawn = Game.spawns["spawn1"];
// debug("spawn: ", spawn);


// debug("Game: ", Game);
// debug("structures: ", Game.structures);

var room = spawn.room;
// debug("room: ", room);

if (!Memory.structureIds) {
	Memory.structureIds = {};
}

if (!Memory.structureIds.controller) {

	var controller = room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTROLLER}});
	Memory.structureIds.controller = controller.id;
}

// debug("controller: ", controller);



// debug("Memory: ", Memory);

//  harvester.createHarvesters(spawn);
 harvester.harvest(spawn);