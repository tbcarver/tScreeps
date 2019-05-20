

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

	if (this.state === "suicide") {

		if (this.creep.carry && this.creep.carry.energy > 0) {

			this.transferEnergy();

		} else {

			this.creep.suicide();
		}
		
		acted = true;
		
	} else if (this.creep.ticksToLive < 25) {

		room.visual.circle(this.creep.pos, { radius: .15, stroke: "white", fill: "white", opacity: 1 });

		var hasCarry = this.creep.body.some(bodyPart => bodyPart.type === "carry");

		if (this.creep.carry[RESOURCE_ENERGY] === 0 || !hasCarry) {

			if (Game.flags["graveyard"]) {

				this.creep.moveTo(Game.flags["graveyard"].pos);

			} else {

				this.creep.moveTo(global.spawn);
			}

		} else {

			this.transferEnergy();
		}

		acted = true;
	}

	return acted;
}

CustomCreep.prototype.transferEnergy = function(){

	var target = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
		filter: structure => structure.structureType == STRUCTURE_STORAGE &&
			structure.storeCapacity - structure.store[RESOURCE_ENERGY] > this.creep.carry.energy
	});

	if (!target) {
		target = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: structure => structure.structureType == STRUCTURE_CONTAINER &&
				structure.storeCapacity - structure.store[RESOURCE_ENERGY] > this.creep.carry.energy
		});
	}

	if (!target) {
		target = global.controller;
	}

	if (this.creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

		this.creep.moveTo(target);
	}
}


module.exports = CustomCreep