
var BaseCreep = require("./baseCreep");
var findTools = require("../../tools/findTools");

class EnergyCreep extends BaseCreep {

	/** @param {Creep} creep */
	constructor(creep) {
		super(creep);

		this.canHarvest = false;
		this.canPickup = false;

		if (this.creepsSpawnRule && this.creepsSpawnRule.canEnergyCreepsHarvest) {
			this.canHarvest = true;
		}

		if (this.creepsSpawnRule && this.creepsSpawnRule.canEnergyCreepsPickup) {
			this.canPickup = true;
		}

		this.availableCarryCapacity = this.creep.carryCapacity - this.creep.carry.energy;
	}

	act() {

		if (!super.act()) {

			if (this.state === "harvesting" || this.creep.carry[RESOURCE_ENERGY] === 0) {

				if (this.state !== "harvesting") {
					this.state = "harvesting";
				}

				this.harvest();
			}

			if (this.state === "energyActing" || this.creep.carry[RESOURCE_ENERGY] === this.creep.carryCapacity) {

				if (this.state !== "energyActing") {

					this.moveIntoRoom();
					this.memory.takeStepsIntoRoom = 1;
					this.state = "energyActing";

				} else {
					this.energyAct();
				}
			}
		}
	}

	harvest(moveToOnly) {

		if (this.canHarvest) {
			var resource = findTools.findClosestEnergy(this.creep.pos, this.availableCarryCapacity);
		} else if (this.canPickup) {
			var resource = findTools.findClosestWritableDroppedOrStoredEnergy(this.creep.pos, this.availableCarryCapacity);
		} else {
			var resource = findTools.findClosestStoredEnergy(this.creep.pos, this.availableCarryCapacity);
		}

		if (resource) {

			if (moveToOnly) {
				this.creep.moveTo(resource);
			} else {

				if (resource.structureType) {

					if (this.creep.withdraw(resource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						this.creep.moveTo(resource);
					}

				} else if (resource.resourceType) {

					var result = this.creep.pickup(resource);

					if (result === OK) {

						var pickedUpAmount = resource.writableEnergy;

						if (pickedUpAmount > this.availableCarryCapacity) {
							pickedUpAmount = this.availableCarryCapacity;

							this.energyAct(true);
						}

						resource.writableEnergy -= this.availableCarryCapacity;

					} else if (result == ERR_NOT_IN_RANGE) {
						this.creep.moveTo(resource);
					}
				} else {
					if (this.creep.harvest(resource) == ERR_NOT_IN_RANGE) {
						this.creep.moveTo(resource);
					}
				}
			}
		} else {

			// debug.warning(`${this.type} ${this.creep.name} energy not found`);
		}
	}

	energyAct() {
	}

	getInitialState() {
		return "harvesting";
	}

	static initializeSpawnCreepMemory(creepMemory, room, spawn, creepsSpawnRule) {

		return creepMemory;
	}
}


module.exports = EnergyCreep