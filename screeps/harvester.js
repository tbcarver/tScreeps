
var debug = require("./debug");
var creep = require("./creep");

var harvester = {};

harvester.createHarvesters = function(spawn) {

	if (!spawn.spawning && spawn.energy >= 300) {

		var name = "h" + creep.getNextCreepNumber();
		var result = spawn.spawnCreep([WORK, CARRY, MOVE], name, { role: "harvester" });
		// debug("create creep: ", result);
		// spawn.createCreep([WORK, CARRY, MOVE, MOVE], null, {role: 'harvester'});
	}
}

harvester.harvest = function(spawn) {

	var storage = spawn;

	for (var index in Game.creeps) {

		var creep = Game.creeps[index];

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
			storage = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTROLLER}});

			// debug("storage: ", storage);

			if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

				// debug(creep.name, ": moving to storage");
				creep.moveTo(storage);
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