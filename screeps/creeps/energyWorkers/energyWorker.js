
var debug = require("../../../debug");
var CustomCreep = require("../../customCreep");
var findTools = require("../../../tools/findTools");

function EnergyWorker(creep) {

	CustomCreep.call(this, creep);
}

EnergyWorker.prototype = Object.create(CustomCreep.prototype);

EnergyWorker.prototype.act = function() {

	if (!CustomCreep.prototype.act.call(this)) {

		if (this.state === "harvesting" || creep.carry[RESOURCE_ENERGY] === 0) {

			if (this.state !== "harvesting") {
				this.state = "harvesting";
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

				debug.warning("Repairer resource not found");
			}
		}

		if (this.state === "working" || creep.carry[RESOURCE_ENERGY] === creep.carryCapacity) {

			if (this.state !== "working") {
				this.state = "working";
			}

			this.work();
		}
	}
}

EnergyWorker.prototype.work = function() {
}


module.exports = Repairer