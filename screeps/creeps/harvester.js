
var debug = require("../debug");
var coreMath = require("../../lib/core/extensions/coreMath")

var harvester = {};

harvester.spawnHarvester = function(id, resourceType, targetStucture) {

	var harvesterMemory = {
		type: "harvester",
		resourceId: "",
		targetId: ""
	}

	switch (resourceType) {

		case "energy":

			var sources = global.room.find(FIND_SOURCES);
			var randomIndex = coreMath.randomInteger(0, sources.length);

			harvesterMemory.resourceId = sources[randomIndex].id;
			break;
	}

	switch (targetStucture) {
		case "spawn":

			harvesterMemory.targetId = global.spawn.id;
			break;

		case "controller":

			var target = global.room.find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_CONTROLLER } });
			harvesterMemory.targetId = target.id;
			break;
	}

	if (harvesterMemory.resourceId && harvesterMemory.targetStucture) {

		var result = spawn.spawnCreep([WORK, CARRY, MOVE], id, harvesterMemory);

		debug(`harvester spawned: ${id} resource: ${resourceType} storage: ${targetStucture}`);
	}
}

harvester.harvestLegacy = function(spawn) {

	var storage = spawn;

	for (var index in Game.creeps) {

		var creep = Game.creeps[index];

		if (creep.memory.role) {


		// debug(creep.name, ": ", creep.carry[RESOURCE_ENERGY]);
		debug(creep.name, ": ", creep);

		if (creep.memory.sourceId || creep.carry[RESOURCE_ENERGY] === 0) {

			var source = Game.getObjectById(creep.memory.sourceId);

			if (!source) {

				source = creep.pos.findClosestByPath(FIND_SOURCES);
				creep.memory.sourceId = source.id;
				creep.memory.storageId = "";
			}

			// debug("source: ", source);

			if (creep.harvest(source) == ERR_NOT_IN_RANGE) {

				// debug(creep.name, ": moving to source");
				creep.moveTo(source);
			}
		}

		if (creep.memory.storageId || creep.carry[RESOURCE_ENERGY] === creep.carryCapacity) {

			creep.memory.sourceId = "";
			creep.memory.storageId = storage.id;

			// storage = Game.getObjectById(Memory.structureIds.controller);
			storage = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_CONTROLLER } });

			// debug("storage: ", storage);

			if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

				// debug(creep.name, ": moving to storage");
				creep.moveTo(storage);
			}
		}

		}
	}

	// const target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
	// if (target) {
	// 	if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
	// 		creep.moveTo(target);
	// 	}
	// }
}

module.exports = harvester