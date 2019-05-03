
var debug = require("../debug");
var findTools = require("./findTools");
var spawnTools = require("./spawnTools");
var testObject = require("../creeps/energizers/extensionEnergizer");

function tick() {

	

	// function MyCreep() {

		
	// 	Creep.call(this, 0);

	// }

    // MyCreep.prototype = Object.create(Creep.prototype);



	// for (var index in Game.creeps) {

	// 	var creep = Game.creeps[index];


	// 	// debug.temp(global.Creep);
	// 	// debug.temp(global.RoomObject);


	// 	var myCreep = new MyCreep();

	// 	myCreep = Object.assign(myCreep, creep)

	// 	// debug.temp("creep", myCreep);
	// 	// debug.temp("test", Object.getPrototypeOf(myCreep));

	// 	// myCreep.say("hello");
	// 	// creep.say("hello");
	// }


	// function getHarvesterStructurePositions(structureType) {

	// 	var result = _.reduce(Memory.creeps, (filteredPositions, creepMemory) => {

	// 		if (creepMemory.type === "extensionEnergizer") {

	// 			positions = creepMemory.structures.reduce((structurePositions, structure) => {

	// 				structurePositions.push(structure.pos);

	// 				return structurePositions;
	// 			}, []);

	// 			filteredPositions.push(...positions);
	// 		}

	// 		return filteredPositions;
	// 	}, []);

	// 	return result;
	// }

	// 	var occupiedPositions = getHarvesterStructurePositions(STRUCTURE_EXTENSION);

	// 	debug.temp(occupiedPositions)

	// var isExtensionOccupied = occupiedPositions.some(occupiedPos => occupiedPos.x === extension.pos.x &&
	// 	occupiedPos.y === extension.pos.y)


	// debug.temp(occupiedPositions)

	// spawnTools.calculateBodyCost()

	// 	var bodyParts = [WORK, CARRY, MOVE, MOVE, MOVE, MOVE];

	// 	var result = spawn.spawnCreep(bodyParts, "TEST2", {
	// 		memory: {},
	// 		energyStructures: findTools.findAllEnergyStructures()
	// 	});


	// // [{"x":"47","y":"27","roomName":"W6S0"}]
	// //[{"x":"47","y":"41","roomName":"W6S0"}]

	// debug.temp(Game.creeps["TEST"].moveTo(44, 41))
	// debug.temp("f", Game.creeps["TEST"].fatigue)
	// debug.temp(Game.creeps["TEST2"].moveTo(45, 41))
	// debug.temp("f", Game.creeps["TEST2"].fatigue)

	// var positions = 

	// [{"x":"28","y":"26","roomName":"W6S0"},{"x":"27","y":"26","roomName":"W6S0"},{"x":"26","y":"26","roomName":"W6S0"},{"x":"25","y":"26","roomName":"W6S0"},{"x":"28","y":"25","roomName":"W6S0"},{"x":"27","y":"24","roomName":"W6S0"},{"x":"26","y":"23","roomName":"W6S0"},{"x":"25","y":"22","roomName":"W6S0"}]
	// if (positions.length > 0) {

	// 	for (var index in positions) {

	// 		var position = new RoomPosition(positions[index].x, positions[index].y, positions[index].roomName);

	// 		// var result = PathFinder.search(global.spawn.pos, { pos: position, range: 3 });
	// 		debug.temp("pathfinder", findTools.isInRange(global.spawn.pos, position, 3));
	// 	}
	// }


	// function calculateSpawnCapacity() {


	// 	var extensions = global.room.find(FIND_MY_STRUCTURES, {
	// 		filter: { structureType: STRUCTURE_EXTENSION }
	// 	});


	// 	var availableExtensionEnergy = extensions.reduce((total, extension) => total + (extension.energy), 0);


	// 	return global.spawn.energyCapacity + availableExtensionEnergy;
	// }


	// debug.temp("calculateSpawnCapacity", calculateSpawnCapacity())

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