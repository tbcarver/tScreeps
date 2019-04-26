
var debug = require("../debug");
var creepBase = require("./creepBase");
var spawnTools = require("../tools/spawnTools");
var findTools = require("../tools/findTools");

var repairer = {};

repairer.spawn = function(id) {

	var bodyParts = [WORK, CARRY, MOVE, MOVE];
	var repairerMemory = {
		type: "repairer"
	}
	
	var spawnCapacity = spawnTools.calculateSpawnCapacity();

	if (spawnCapacity >= 400) {
		bodyParts = [WORK, WORK, CARRY, MOVE, MOVE];
	}

	if (spawnCapacity >= 600) {
		bodyParts = [WORK, WORK, CARRY, CARRY, MOVE, MOVE];
	}

	var result = spawn.spawnCreep(bodyParts, id, {
		memory: repairerMemory,
		energyStructures: findTools.findAllEnergyStructures()
	});

	if (result === OK) {

		debug.highlight(`repairer spawning: ${id} memory: `, repairerMemory);

	} else {

		debug.warning(`repairer did not spawn: ${result}`);
	}
}

repairer.act = function(creep) {

	if (!creepBase.act(creep)) {

		if (creep.memory.state === "harvesting" || creep.carry[RESOURCE_ENERGY] === 0) {

			if (creep.memory.state !== "harvesting") {

				creep.memory.state = "harvesting";
			}

			var resource = findTools.findClosestEnergy(creep.pos);

			if (resource) {

				if (resource.structureType) {

					if (creep.withdraw(resource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						creep.moveTo(resource);
					}

				} else {

					if (creep.harvest(resource) == ERR_NOT_IN_RANGE) {
						creep.moveTo(resource);
					}
				}
			} else {

				debug.warning("repairer resource not found");
			}
		}

		if (creep.memory.state === "repairing" || creep.carry[RESOURCE_ENERGY] === creep.carryCapacity) {

			if (creep.memory.state !== "repairing") {

				creep.memory.state = "repairing";
			}

			const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
				filter: structure => structure.hits < structure.hitsMax &&
					structure.type !== STRUCTURE_WALL
			});

			if (target) {

				if (creep.repair(target) == ERR_NOT_IN_RANGE) {

					creep.moveTo(target);
				}

			} else {

				debug.warning("repairer cannot find any damaged structures");

				if (creep.carry[RESOURCE_ENERGY] / creep.carryCapacity < .30) {

					creep.memory.state = "harvesting";
				}
			}
		}
	}
}


module.exports = repairer