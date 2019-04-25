
var debug = require("../debug");
var findTools = require("../tools/findTools");

var harvester = {};

harvester.spawn = function(id, resourceType, structureType) {

	var spawned = false;
	var bodyParts = [WORK, CARRY, MOVE, MOVE];
	var harvesterMemory = {
		type: "harvester",
		resourceType: resourceType,
		resourceId: "",
		structures: [
			{
				type: structureType,
				id: "",
				pos: undefined
			}
		],
	}

	var structure;

	switch (structureType) {

		case STRUCTURE_EXTENSION:

			var extensions = global.room.find(FIND_MY_STRUCTURES, {
				filter: {
					structureType: structureType
				}
			});

			extensions = extensions.filter(extension => {

				return !_.some(Memory.creeps, creepMemory => {

					return creepMemory.type === "harvester" &&
						creepMemory.structureType === structureType &&
						creepMemory.structurePos.x === extension.pos.x &&
						creepMemory.structurePos.y === extension.pos.y
				});
			});

			if (extensions.length > 0) {

				structure = extensions[0];
				harvesterMemory.structures[0].id = structure.id;
				harvesterMemory.structures[0].pos = structure.pos;
				bodyParts = [WORK, CARRY, CARRY, MOVE];
			}

			break;

		case STRUCTURE_CONTAINER:

			var containers = global.room.find(FIND_STRUCTURES, {
				filter: {
					structureType: structureType
				}
			});

			containers = containers.filter(container => {

				var count = _.reduce(Memory.creeps, (count, creepMemory) => {

					if (creepMemory.type === "harvester" &&
						creepMemory.structureType === structureType &&
						creepMemory.structurePos.x === container.pos.x &&
						creepMemory.structurePos.y === container.pos.y) {
						count++
					}

					return count;
				}, 0);

				return count <= 2;
			});

			if (containers.length > 0) {

				structure = containers[0];
				harvesterMemory.structures[0].id = structure.id;
				harvesterMemory.structures[0].pos = structure.pos;

				if (global.room.energyCapacityAvailable >= 400) {
					bodyParts = [WORK, CARRY, CARRY, MOVE, MOVE];
				}
			}

			break;
	}

	if (structure) {

		var resource;

		switch (resourceType) {

			case RESOURCE_ENERGY:

				resource = structure.pos.findClosestByPath(FIND_SOURCES);
				break;
		}

		if (resource) {

			harvesterMemory.resourceId = resource.id;

			var result = spawn.spawnCreep(bodyParts, id, {
				memory: harvesterMemory,
				energyStructures: findTools.findAllEnergyStructures()
			});

			if (result === OK) {

				spawned = true;
				debug.highlight(`harvester spawning: ${id} resource: ${resourceType} structure: ${structureType} memory: `, harvesterMemory);

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

		var structure = Game.getObjectById(creep.memory.structures[0].id);

		if (structure) {

			if (creep.transfer(structure, creep.memory.resourceType) == ERR_NOT_IN_RANGE) {

				creep.moveTo(structure);
			}

		} else {

			debug.danger("Harvester structure not found for id: " + creep.memory.structures[0].id);
		}
	}
}


module.exports = harvester