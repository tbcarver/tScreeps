
var CustomCreep = require("../customCreep");
var findTools = require("../../tools/findTools");

function EnergyWorker(creep) {

	CustomCreep.call(this, creep);
}

EnergyWorker.prototype = Object.create(CustomCreep.prototype);

EnergyWorker.prototype.act = function() {

	if (!CustomCreep.prototype.act.call(this)) {

		if (this.state === "harvesting" || this.creep.carry[RESOURCE_ENERGY] === 0) {

			if (this.state !== "harvesting") {
				this.state = "harvesting";
			}

			var resource = findTools.findClosestEnergy(this.creep.pos);

			if (resource) {

				if (resource.structureType) {

					if (this.creep.withdraw(resource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						this.creep.moveTo(resource);
					}
				} else {

					if (this.creep.harvest(resource) == ERR_NOT_IN_RANGE) {
						this.creep.moveTo(resource);

					} else if (this.creep.carry[RESOURCE_ENERGY] === this.creep.carryCapacity) {
						// Step away from an energy source to not block it
						this.state = "working";
						this.memory.takeStepsIntoRoom = 2;
					}
				}
			} else {

				// debug.warning(`${this.type} energy not found`);
			}
		}

		if (this.state === "working" || this.creep.carry[RESOURCE_ENERGY] === this.creep.carryCapacity) {

			if (this.state !== "working") {
				this.state = "working";
			}

			this.work();
		}
	}
}

EnergyWorker.prototype.work = function() {
}

EnergyWorker.prototype.getInitialState = function() {
	return "harvesting";
}


module.exports = EnergyWorker