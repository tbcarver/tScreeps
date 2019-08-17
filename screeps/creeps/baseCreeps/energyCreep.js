
var BaseCreep = require("./baseCreep");
var findTools = require("../../tools/findTools");

class EnergyCreep extends BaseCreep {

	/** @param {Creep} creep */
	constructor(creep) {
		super(creep);

		this.canHarvest = this.memory.canHarvest;
		this.canPickup = this.memory.canPickup;

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
			

			if ((this.state === "harvesting" && this.creep.carry.energy !== this.creep.carryCapacity) ||
				this.creep.carry.energy === 0) {

				if (this.state !== "harvesting") {
					this.state = "harvesting";
				}

				if (!this.isDying) {
					this.harvest();
				}
			}

			if (this.state === "energyActing" || this.creep.carry.energy === this.creep.carryCapacity) {

				if (this.state !== "energyActing") {
					this.state = "energyActing";
					this.harvestCompleteMove();
				} else {

					this.energyAct();
				}
			}
		}

		return true;
	}

	harvest() {

		if (this.canHarvest) {
			var resource = findTools.findClosestEnergy(this.creep.pos, this.availableCarryCapacity);
		} else if (this.canPickup) {
			var resource = findTools.findClosestWritableDroppedOrStoredEnergy(this.creep.pos, this.availableCarryCapacity);
		} else {
			var resource = findTools.findClosestStoredEnergy(this.creep.pos, this.availableCarryCapacity);
		}

		if (resource) {

			if (this.isInTravelDistance(resource)) {
				this.travelNearTo(resource, true);
			} else {
				if (resource.structureType) {

					let result = this.creep.withdraw(resource, RESOURCE_ENERGY);
					if (result === OK) {

						if (resource.store.energy >= this.availableCarryCapacity * 2) {
							this.state = "energyActing";
							this.harvestCompleteMove();
						}

					} else if (result == ERR_NOT_IN_RANGE) {
						this.moveToAndAvoid(resource);
					}
				} else if (resource.resourceType) {

					let result = this.creep.pickup(resource);
					if (result === OK) {

						var pickedUpAmount = resource.writableAmount;

						if (pickedUpAmount >= this.availableCarryCapacity) {
							pickedUpAmount = this.availableCarryCapacity;
							this.state = "energyActing";
							this.harvestCompleteMove();
						}

						resource.writableAmount -= pickedUpAmount;

					} else if (result == ERR_NOT_IN_RANGE) {
						this.moveToAndAvoid(resource);
					}
				} else {

					if (this.creep.harvest(resource) == ERR_NOT_IN_RANGE) {
						this.moveToAndAvoid(resource);
					}
				}
			}
		} else {

			// debug.warning(`${this.type} ${this.creep.name} energy not found`);
		}
	}

	harvestCompleteMove() {
		this.moveIntoRoom();
		this.memory.takeStepsIntoRoom = 1;
	}

	energyAct() {
	}

	getInitialState() {
		return "harvesting";
	}

	static initializeSpawnCreepMemory(creepMemory, room, spawn, creepsSpawnRule) {

		if (creepMemory) {

			if (creepsSpawnRule.canEnergyCreepsHarvest) {
				creepMemory.canHarvest = true;
			}
	
			if (creepsSpawnRule.canEnergyCreepsPickup) {
				creepMemory.canPickup = true;
			}
		}

		return creepMemory;
	}
}


module.exports = EnergyCreep