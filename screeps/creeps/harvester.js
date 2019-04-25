
var debug = require("../debug");
var roomTools = require("../roomTools");

var harvester = {};

harvester.spawn = function(id, resourceType, structureType) {

	var spawned = false;
	var harvesterMemory = {
		type: "harvester",
		resourceType: resourceType,
		resourceId: "",
		structureType: structureType,
		structureId: "",
		structurePos: undefined
	}

	var structure;

	switch (structureType) {

		case STRUCTURE_SPAWN:

			structure = global.spawn;
			break;

		case STRUCTURE_EXTENSION:

			var extensions = global.room.find(FIND_MY_STRUCTURES, {
				filter: {
					structureType: STRUCTURE_EXTENSION
				}
			});

			extensions = extensions.filter(extension => {

				return !_.some(Memory.creeps, creepMemory => {

					return creepMemory.type === "harvester" &&
						creepMemory.structureType === STRUCTURE_EXTENSION &&
						creepMemory.structurePos.x === extension.pos.x &&
						creepMemory.structurePos.y === extension.pos.y
				});
			});

			if (extensions.length > 0) {

				structure = extensions[0];
				harvesterMemory.structurePos = structure.pos;
			}

			break;

		case STRUCTURE_CONTROLLER:

			structure = global.controller;
			break;
	}

	if (structure) {

		harvesterMemory.structureId = structure.id;
		var resource;

		switch (resourceType) {

			case RESOURCE_ENERGY:

				resource = structure.pos.findClosestByPath(FIND_SOURCES);
				break;
		}

		if (resource) {

			harvesterMemory.resourceId = resource.id;

			var result = spawn.spawnCreep([WORK, CARRY, MOVE, MOVE], id, {
				memory: harvesterMemory,
				energyStructures: roomTools.getAllEnergyStructures()
			});

			if (result === OK) {

				spawned = true;
				debug.highlight(`harvester spawning: ${id} resource: ${resourceType} storage: ${structureType} memory: `, harvesterMemory);

			} else {

				debug.warning(`harvester did not spawn: ${result}`);
			}
		}
	}

	return spawned;
}

harvester.act = function(creep) {

	if (creep.memory.state === "harvesting" || creep.carry[creep.memory.resourceType] === 0) {

		if (creep.memory.state !== "harvesting") {

			creep.memory.state = "harvesting";
		}

		var resource = Game.getObjectById(creep.memory.resourceId);

		if (resource) {

			if (creep.harvest(resource) == ERR_NOT_IN_RANGE) {

				creep.moveTo(resource);
			}

		} else {

			debug.danger("Harvester resource not found for id: " + creep.memory.resourceId);
		}
	}

	if (creep.memory.state === "transferring" || creep.carry[creep.memory.resourceType] === creep.carryCapacity) {

		if (creep.memory.state !== "transferring") {

			creep.memory.state = "transferring";
		}

		var structure = Game.getObjectById(creep.memory.structureId);

		if (structure) {

			if (creep.transfer(structure, creep.memory.resourceType) == ERR_NOT_IN_RANGE) {

				creep.moveTo(structure);
			}

		} else {

			debug.danger("Harvester structure not found for id: " + creep.memory.structureId);
		}
	}
}


module.exports = harvester