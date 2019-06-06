
var BaseCreep = require("./baseCreep");
var findTools = require("../../tools/findTools");

function energyCreep(creep) {

	BaseCreep.call(this, creep);

	this.canHarvest = true;

	if (typeof creep.memory.canHarvest !== "undefined") {
		this.canHarvest = creep.memory.canHarvest;
	}
}

energyCreep.prototype = Object.create(BaseCreep.prototype);

energyCreep.prototype.act = function() {

	if (!BaseCreep.prototype.act.call(this)) {

		if (this.state === "harvesting" || this.creep.carry[RESOURCE_ENERGY] === 0) {

			if (this.state !== "harvesting") {
				this.state = "harvesting";
			}

			if (this.canHarvest) {
				var resource = findTools.findClosestEnergy(this.creep.pos);
			} else {
				var resource = findTools.findClosestStoredEnergy(this.creep.pos);
			}

			if (resource) {

				if (resource.structureType) {

					if (this.creep.withdraw(resource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						this.creep.moveTo(resource);
					}

				} else {

					if (this.creep.harvest(resource) == ERR_NOT_IN_RANGE) {
						this.creep.moveTo(resource);
					}
				}
			} else {

				// debug.warning(`${this.type} energy not found`);
			}
		}

		if (this.state === "energyActing" || this.creep.carry[RESOURCE_ENERGY] === this.creep.carryCapacity) {

			if (this.state !== "energyActing") {				
				this.state = "energyActing";
				this.memory.takeStepsIntoRoom = 2;

			} else {
				this.energyAct();
			}
		}
	}
}

energyCreep.prototype.energyAct = function() {
}

energyCreep.prototype.getInitialState = function() {
	return "harvesting";
}


module.exports = energyCreep