
var BaseCreep = require("./baseCreep");
var findTools = require("../../tools/findTools");

function EnergyCreep(creep) {

	BaseCreep.call(this, creep);

	this.canHarvest = this.creepsSpawnRule.canEnergyCreepsHarvest;
	this.canPickup = this.creepsSpawnRule.canEnergyCreepsPickup;
}

EnergyCreep.prototype = Object.create(BaseCreep.prototype);

EnergyCreep.prototype.act = function() {

	if (!BaseCreep.prototype.act.call(this)) {

		if (this.state === "harvesting" || this.creep.carry[RESOURCE_ENERGY] === 0) {

			if (this.state !== "harvesting") {
				this.state = "harvesting";
			}

			if (this.canHarvest) {
				var resource = findTools.findClosestEnergy(this.creep.pos);
			} else if (this.canPickup) {
				var resource = findTools.findClosestDroppedOrStoredEnergy(this.creep.pos);
			} else {
				var resource = findTools.findClosestStoredEnergy(this.creep.pos);
			}

			if (resource) {

				if (resource.structureType) {

					if (this.creep.withdraw(resource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						this.creep.moveTo(resource);
					}

				} else if (resource.resourceType) {

					if (this.creep.pickup(resource) == ERR_NOT_IN_RANGE) {
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

EnergyCreep.prototype.energyAct = function() {
}

EnergyCreep.prototype.getInitialState = function() {
	return "harvesting";
}

EnergyCreep.initializeSpawnCreepMemory = function(creepMemory, room, spawn, creepsSpawnRule) {

	return creepMemory;
}


module.exports = EnergyCreep