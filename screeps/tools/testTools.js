
var debug = require("../debug");

function tick() {

	// var structureType = STRUCTURE_EXTENSION;

	// var extensions = global.room.find(FIND_MY_STRUCTURES, {
	// 	filter: {
	// 		structureType: structureType
	// 	}
	// });

	// extensions = extensions.filter(extension => {

	// 	var result = _.map(Memory.creeps, creepMemory => {

	// 		var structure;

	// 		if (creepMemory.type === "harvester" && creepMemory.structurePos) {

	// 			structure =  creepMemory.structures;
	// 		}

	// 		return structure;

	// 	});
	// });

	function getEnergizerContainerPositions() {


		var result = _.reduce(Memory.creeps, (filteredPositions, creepMemory) => {

			if (creepMemory.type === "energizer") {

				positions = creepMemory.structures.reduce((structurePositions, structure) => {

					if (structure.type === STRUCTURE_CONTAINER &&
						structure.pos) {
						debug.primary("structure.pos", structure.pos)
						structurePositions.push(structure);
					}

					return structurePositions;
				}, []);

				debug.primary("positions", positions)
				if (positions.length > 0) {
					filteredPositions.push(positions);
				}
			}

			debug.primary("filteredPositions", filteredPositions)
			return filteredPositions;

		}, []);
	}

	// debug.highlight("result", result);


	// debug("sources", global.room.find(FIND_SOURCES));

	// const target = global.room.find(FIND_MY_STRUCTURES, {
	// 	filter: structure => structure.hits < structure.hitsMax
	// });

	// debug.danger("damaged", target)

	// debug.danger("Game.creeps", _.size(Game.creeps))
	// debug.danger("Memory.creeps", _.size(Memory.creeps))

	// var extensions = global.room.find(FIND_MY_STRUCTURES, {
	// 	filter: {
	// 		structureType: STRUCTURE_EXTENSION
	// 	}
	// });

	// var structureType = STRUCTURE_CONTAINER;
	// var containers = global.room.find(FIND_STRUCTURES, {
	// 	filter: {
	// 		structureType: structureType
	// 	}
	// });

	// debug.danger("ALL EXTENSIONS", containers.length, containers)

	// containers = containers.filter(container => {

	// 	var count = _.reduce(Memory.creeps, (count, creepMemory) => {

	// 		if (creepMemory.type === "harvester" &&
	// 			creepMemory.structureType === structureType &&
	// 			creepMemory.structurePos.x === container.pos.x &&
	// 			creepMemory.structurePos.y === container.pos.y) {
	// 			count++
	// 		}
	// 		debug.highlight("count", count);

	// 		return count;
	// 	}, 0);

	// 	return count <= 2;
	// });


	// debug.danger("FILTERED EXTENSIONS", containers.length, containers)



	// const target = global.room.find(FIND_CONSTRUCTION_SITES);

	// debug.highlight("sites", target);

	// var roadBuilder = require("./builders/roadBuilder.js");

	// roadBuilder.build(global.spawn, global.controller);

	// var foundPath = PathFinder.search(global.spawn.pos, global.controller.pos);
	// var foundPath = global.room.findPath(global.spawn.pos, global.controller.pos, {serialize: true});

	// var serializedPath = global.room.findPath(source, target, {serialize: true});

	// debug.primary(foundPath);
	// debug.danger("room: ", Room);
	// debug.danger(Room.serializePath(foundPath));
	// console.log(global.room.find(FIND_SOURCES));




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

}

module.exports = tick;