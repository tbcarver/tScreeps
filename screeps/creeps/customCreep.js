

function CustomCreep(creep) {

	this.creep = creep;
	this.memory = creep.memory;
	this.type = creep.memory.type;
	
    Object.defineProperty(this, 'state', {
        get: function() {
            return this.memory.state;
        },
        set: function(state) {
            this.memory.state = state
        }
    });
}

CustomCreep.prototype.act = function() {

	var acted = false;

	if (this.creep.ticksToLive < 25) {

		if (this.creep.carry[RESOURCE_ENERGY] === 0) {

			if (Game.flags["graveyard"]) {

				this.creep.moveTo(Game.flags["graveyard"].pos);

			} else {

				this.creep.moveTo(global.spawn);
			}

		} else {

			var target = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: structure => structure.structureType == STRUCTURE_CONTAINER &&
					structure.store[RESOURCE_ENERGY] > 200
			});

			if (!target) {
				target = global.controller;
			}

			if (this.creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

				this.creep.moveTo(target);
			}
		}

		acted = true;

	}

	return acted;
}


module.exports = CustomCreep