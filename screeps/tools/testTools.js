
var { rules } = require("../rules/rules")
var enemyTools = require("./enemyTools");
var findTools = require("./findTools");
var roomTools = require("./roomTools");
var spawnTools = require("./spawnTools");
var testObject = require("../creeps/energizers/extensionEnergizer");
var bodyPartsStrategy = require("../creeps/bodies/moveWorkStrategy");
var sumBy = require("lodash/sumBy");
var orderBy = require("lodash/orderBy");
var DropHarvester = require("../creeps/harvesters/dropHarvester");

function tick() {

	// var spawn = Game.spawns["Spawn1"]
	// var room = Game.rooms.W11N16

	// debug.temp(DropHarvester.initializeSpawnCreepMemory(room, spawn))

	// var creepsPerResource = 3
	// var resources = roomTools.getSources("W11N16");
	// var dropHarvesterCount = 0;


	// for (var resource of resources) {
	// 	debug.temp(roomTools.getCountResourceHarvestPositions(resource.id), roomTools.getCountResourceHarvestPositions(resource.id) >= creepsPerResource)
	// 	if (roomTools.getCountResourceHarvestPositions(resource.id) >= creepsPerResource) {
	// 		dropHarvesterCount += creepsPerResource;
	// 	} else {
	// 		dropHarvesterCount++;
	// 	}
	// }

	// debug.temp("total", dropHarvesterCount)

	
	// var dropFlag = Game.flags[`drop-W12N16`];
	// var a = Game.rooms.W12N16.find(FIND_DROPPED_RESOURCES, {
	// 	filter: resource => 
	// 		(!dropFlag || !dropFlag.pos.inRangeTo(resource, 3))
	// }).map(element => element.energy).sort((a, b) => a - b);

	// debug.temp(a);

	// debug.temp(roomTools.getCountControllerUpgradePositions(Game.rooms.W7N10.controller));

	// var controllers = _.map(Game.rooms, room => room.controller);
	// var filteredControllers = controllers.filter(controller => controller.level >= 1 && controller.level <= 7);
	// if (filteredControllers.length > 0) {
	// 	filteredControllers = orderBy(filteredControllers, "level", "desc");
	// 	filteredControllers = orderBy(filteredControllers, "progress", "desc");
	// 	var controllerToUpgrade = filteredControllers[0];
	// }

	// debug.temp(controllerToUpgrade);


	// var temp = [{ remoteReserver: 1 }, { dropHarvester: 4 }, { storageTransferer: 0 }, { remoteSpawnedStorageTransferer: 12 }]


	// var result = _.find(temp, element => Object.keys(element)[0] === "dropHarvester")


	// debug.temp(result);


	// var roomName = "W8N7";
	// var room = Game.rooms[roomName];

	// var resources = room.find(FIND_DROPPED_RESOURCES, {
	// 	filter: resource => resource.amount
	// });
	// var totalEnergy = sumBy(resources, "energy");

	// var dropFlag = Game.flags[`drop-${roomName}`];

	// var resources = room.find(FIND_DROPPED_RESOURCES, {
	// 	filter: resource => resource.amount && dropFlag.pos.inRangeTo(resource, 3)
	// });
	// var totalDropFlag = sumBy(resources, "energy");

	// var isInRangeToDropFlag = true;
	// var resources = room.find(FIND_DROPPED_RESOURCES, {
	// 	filter: resource => resource.amount && isInRangeToDropFlag ? dropFlag.pos.inRangeTo(resource, 3) : !dropFlag.pos.inRangeTo(resource, 3)
	// });
	// var totalDropFlagNear = sumBy(resources, "energy");

	// var resources = room.find(FIND_DROPPED_RESOURCES, {
	// 	filter: resource => resource.amount && !dropFlag.pos.inRangeTo(resource, 3)
	// });
	// var totalNotDropFlag = sumBy(resources, "energy");

	// var isInRangeToDropFlag = false;
	// var resources = room.find(FIND_DROPPED_RESOURCES, {
	// 	filter: resource => resource.amount && isInRangeToDropFlag ? dropFlag.pos.inRangeTo(resource, 3) : !dropFlag.pos.inRangeTo(resource, 3)
	// });
	// var totalNotDropFlagNear = sumBy(resources, "energy");

	// debug.temp(totalEnergy, totalDropFlag, totalDropFlagNear, totalNotDropFlag, totalNotDropFlagNear);



	// debug.temp(roomTools.getCountResourceHarvestPositions("5cfa67cb57237e0ae006627b"))

	// console.log(JSON.stringify(Game.rooms.W7N6.lookAtArea(14,23,16,25,true)))

	// for (var roomName in Game.rooms) {
	// 	debug.temp(roomName, roomTools.getPercentageStoredEnergy(roomName));
	// }

	// 	debug.temp(findTools.findRoute("W8N8", "W9N7"));
	// debug.temp(rules.routeAvoidRooms.includes("W9N8"));

	// var route = Game.map.findRoute("W8N8", "W9N8", {
	// 	routeCallback(roomName, fromRoomName) {

	// 		if (roomName === "W9N8") {
	// 			// Avoid this room
	// 			return 2;
	// 		}

	// 		return 1;
	// 	}
	// });

	// debug.temp(route)

	// for (var count = 1; count <= 15; count++) {
	// 	var capacity = 300 + (count * 50);
	// 	debug.temp(capacity, bodyPartsStrategy.getBodyPartsObject(capacity, 2));
	// }

	// moveCarryWorkStrategy partsPerMove: 1
	// 350 {move: 3, work: 1, carry: 2}
	// 400 {move: 3, work: 1, carry: 2}
	// 450 {move: 4, work: 1, carry: 3}
	// 500 {move: 7, work: 1, carry: 6}
	// 550 {move: 5, work: 1, carry: 4}
	// 600 {move: 5, work: 1, carry: 4}
	// 650 {move: 6, work: 1, carry: 5}
	// 700 {move: 6, work: 2, carry: 4}
	// 750 {move: 6, work: 2, carry: 4}
	// 800 {move: 7, work: 2, carry: 5}
	// 850 {move: 10, work: 2, carry: 8}
	// 900 {move: 8, work: 2, carry: 6}
	// 950 {move: 8, work: 2, carry: 6}
	// 1000 {move: 9, work: 2, carry: 7}
	// 1050 {move: 9, work: 3, carry: 6}

	// moveCarryWorkStrategy partsPerMove: 2
	// 350 {"move":2,"work":1,"carry":3}
	// 400 {"move":2,"work":1,"carry":3}
	// 450 {"move":3,"work":1,"carry":4}
	// 500 {"move":3,"work":1,"carry":5}
	// 550 {"move":3,"work":2,"carry":4}
	// 600 {"move":3,"work":2,"carry":4}
	// 650 {"move":4,"work":2,"carry":5}
	// 700 {"move":4,"work":2,"carry":6}
	// 750 {"move":4,"work":2,"carry":6}
	// 800 {"move":5,"work":2,"carry":7}
	// 850 {"move":5,"work":3,"carry":6}
	// 900 {"move":5,"work":3,"carry":7}
	// 950 {"move":5,"work":3,"carry":7}
	// 1000 {"move":6,"work":3,"carry":8}
	// 1050 {"move":6,"work":3,"carry":9}

	// moveWorkStrategy partsPerMove: 1
	// 350 {move: 2, work: 2}
	// 400 {move: 3, work: 2}
	// 450 {move: 3, work: 3}
	// 500 {move: 3, work: 3}
	// 550 {move: 4, work: 3}
	// 600 {move: 4, work: 4}
	// 650 {move: 4, work: 4}
	// 700 {move: 5, work: 4}
	// 750 {move: 5, work: 5}
	// 800 {move: 5, work: 5}
	// 850 {move: 6, work: 5}
	// 900 {move: 6, work: 6}
	// 950 {move: 6, work: 6}
	// 1000 {move: 7, work: 6}
	// 1050 {move: 7, work: 7}

	// moveWorkStrategy partsPerMove: 2
	// 350 {move: 2, work: 2}
	// 400 {move: 2, work: 3}
	// 450 {move: 2, work: 3}
	// 500 {move: 2, work: 4}
	// 550 {move: 2, work: 4}
	// 600 {move: 3, work: 4}
	// 650 {move: 3, work: 5}
	// 700 {move: 3, work: 5}
	// 750 {move: 3, work: 6}
	// 800 {move: 3, work: 6}
	// 850 {move: 4, work: 6}
	// 900 {move: 4, work: 7}
	// 950 {move: 4, work: 7}
	// 1000 {move: 4, work: 8}
	// 1050 {move: 4, work: 8}

	// moveCarryStrategy partsPerMove: 2
	// 350 {move: 2, carry: 4}
	// 400 {move: 3, carry: 5}
	// 450 {move: 3, carry: 6}
	// 500 {move: 3, carry: 6}
	// 550 {move: 4, carry: 7}
	// 600 {move: 4, carry: 8}
	// 650 {move: 4, carry: 8}
	// 700 {move: 5, carry: 9}
	// 750 {move: 5, carry: 10}
	// 800 {move: 5, carry: 10}
	// 850 {move: 6, carry: 11}
	// 900 {move: 6, carry: 12}
	// 950 {move: 6, carry: 12}
	// 1000 {move: 7, carry: 13}
	// 1050 {move: 7, carry: 14}

	// function approximateParts(result) {

	// 	if (result) {

	// 		result.numberOf50s = result.numberOf50sLeft;

	// 	} else {

	// 		var spawnCapacity = spawnTools.calculateSpawnCapacity();
	// 		var total50s = Math.floor(spawnCapacity / 50);

	// 		result = {
	// 			spawnCapacity: spawnCapacity,
	// 			total50s: total50s,
	// 			numberOf100s: 0,
	// 			numberOf50s: total50s,
	// 			numberOfMoves: 0,
	// 			numberOf50sLeft: 0,
	// 			numberOf50sUnused: 0,
	// 			foundOneUnused: false,
	// 			success: false
	// 		}
	// 	}

	// 	result.numberOf100s = Math.floor(result.numberOf50s / 4);
	// 	result.numberOf50s = result.numberOf50s - (result.numberOf100s * 2);

	// 	result.numberOfMoves = Math.ceil((result.numberOf100s + result.numberOf50s) / 2);
	// 	result.numberOf50sLeft = result.total50s - result.numberOfMoves;
	// 	result.numberOf50sUnused = result.total50s - (result.numberOf100s * 2) - result.numberOf50s - result.numberOfMoves;

	// 	debug.temp(`total ${result.total50s} result.numberOf100s ${result.numberOf100s}
	// 		result.numberOf50s ${result.numberOf50s} result.numberOfMoves ${result.numberOfMoves} left ${result.numberOf50sLeft}
	// 		unused ${result.numberOf50sUnused}`);

	// 	if (result.numberOf50sUnused === 0) {

	// 		result.success = true;

	// 	} else if (result.numberOf50sUnused === 1 || result.numberOf50sUnused === -1) {

	// 		if (result.foundOneUnused) {

	// 			if (result.numberOf50sUnused === 1) {
	// 				result.success = true;
	// 			}
	// 		} else {
	// 			result.foundOneUnused = true;
	// 		}
	// 	}

	// 	if (!result.success) {
	// 		result = approximateParts(result);
	// 	}

	// 	return result;
	// }

	// var result = approximateParts();

	// debug.temp("result", result);

	// var numberOf50s = Math.floor(spawnCapacity / 50);
	// var numberOf100s = Math.floor(numberOf50s / 4);
	// numberOf50s = numberOf50s - (numberOf100s * 2);

	// var movesNeeded = Math.ceil((numberOf100s + numberOf50s) / 2);
	// var left = Math.ceil(numberOf100s + numberOf50s / movesNeeded);

	// debug.temp(`spawnCapacity ${spawnCapacity} numberOf100s ${numberOf100s} numberOf50s ${numberOf50s} movesNeeded ${movesNeeded} ${left}`)

	// numberOf50s = movesNeeded;
	// var numberOf100s = Math.floor(numberOf50s / 4);
	// numberOf50s = numberOf50s - (numberOf100s * 2);

	// var movesNeeded = Math.ceil((numberOf100s + numberOf50s) / 2);
	// var left = Math.ceil(numberOf100s + numberOf50s / movesNeeded);

	// debug.temp(`spawnCapacity ${spawnCapacity} numberOf100s ${numberOf100s} numberOf50s ${numberOf50s} movesNeeded ${movesNeeded} left ${left}`)


	// var targets = room.find(FIND_STRUCTURES, {
	// 	filter: structure => structure.structureType == STRUCTURE_CONTAINER
	// });

	// debug.temp(_.map(targets, target => target.pos));


	// function MyCreep() {


	// 	Creep.call(this, 0);

	// }

	// MyCreep.prototype = Object.create(Creep.prototype);



	// for (var index in Game.creeps) {

	// 	var creep = Game.creeps[index];


	// 	// debug.temp(global.Creep);
	// 	// debug.temp(room.Object);


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

	// 		// var result = PathFinder.search(spawn.pos, { pos: position, range: 3 });
	// 		debug.temp("pathfinder", findTools.isInRange(spawn.pos, position, 3));
	// 	}
	// }


	// function calculateSpawnCapacity() {


	// 	var extensions = room.find(FIND_MY_STRUCTURES, {
	// 		filter: { structureType: STRUCTURE_EXTENSION }
	// 	});


	// 	var availableExtensionEnergy = extensions.reduce((total, extension) => total + (extension.energy), 0);


	// 	return spawn.energyCapacity + availableExtensionEnergy;
	// }


	// debug.temp("calculateSpawnCapacity", calculateSpawnCapacity())

	// var structureType = STRUCTURE_EXTENSION;

	// var extensions = room.find(FIND_MY_STRUCTURES, {
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


	// debug("sources", room.find(FIND_SOURCES));

	// const target = room.find(FIND_MY_STRUCTURES, {
	// 	filter: structure => structure.hits < structure.hitsMax
	// });

	// debug.danger("damaged", target)

	// debug.danger("Game.creeps", _.size(Game.creeps))
	// debug.danger("Memory.creeps", _.size(Memory.creeps))

	// var extensions = room.find(FIND_MY_STRUCTURES, {
	// 	filter: {
	// 		structureType: STRUCTURE_EXTENSION
	// 	}
	// });

	// var structureType = STRUCTURE_CONTAINER;
	// var containers = room.find(FIND_STRUCTURES, {
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




	// var target = room.find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_CONTROLLER } });
	// debug("target: ", target);

	// debug("targetid: ", target.id);
	// var gotObject = Game.getObjectById(target.id);
	// debug("gotObject: ", gotObject);

	// var sources = room.find(FIND_SOURCES);

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