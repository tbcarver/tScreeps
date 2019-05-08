
var debug = require("../debug");
var findTools = require("../tools/findTools");

function CustomCreep(creep) {

	this.creep = creep;
	this.memory = creep.memory;
	this.type = creep.memory.type;
	this.state = creep.memory.state;
}

CustomCreep.prototype.act = function() {

	var acted = false;

	if (creep.ticksToLive < 25) {

		if (creep.carry[RESOURCE_ENERGY] === 0) {

			if (Game.flags["graveyard"]) {

				creep.moveTo(Game.flags["graveyard"].pos);

			} else {

				creep.moveTo(global.spawn);
			}

		} else {

			var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: structure => structure.structureType == STRUCTURE_CONTAINER &&
					structure.store[RESOURCE_ENERGY] > 200
			});

			if (!target) {
				target = global.controller;
			}

			if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

				creep.moveTo(target);
			}
		}

		acted = true;

	}

	return acted;
}


module.exports = CustomCreep