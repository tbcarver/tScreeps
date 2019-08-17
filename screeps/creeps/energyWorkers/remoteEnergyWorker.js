
var EnergyCreep = require("../baseCreeps/energyCreep");
var RemoteCreep = require("../baseCreeps/remoteCreep");
var findTools = require("../../tools/findTools");

class RemoteEnergyWorker extends RemoteCreep {

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

	arrivedAtSpawnedRoom() {
		this.state = "harvesting";
	}

	arrivedAtRemoteRoom() {
		this.state = "energyActing";
	}

	spawnedRoomAct() {

		if (this.state === "energyActing" || this.creep.carry.energy === this.creep.carryCapacity) {

			this.moveToRemoteRoom();

		} else if (this.state === "harvesting") {

			if (this.roomName !== this.spawnedRoomName) {
				this.moveToSpawnedRoom();
			} else {
				EnergyCreep.prototype.harvest.call(this);
			}
		}
	}

	remoteRoomAct() {

		if (this.state === "harvesting" || this.creep.carry.energy === 0) {

			this.moveToSpawnedRoom();

		} else if (this.state === "energyActing") {

			if (this.roomName !== this.remoteRoomName) {
				this.moveToRemoteRoom();
			} else {
				this.energyAct();
			}
		}
	}

	harvest() {

		if (this.roomName !== this.spawnedRoomName) {
			this.moveToSpawnedRoom();
		} else {
			EnergyCreep.prototype.harvest.call(this);
		}
	}

	energyAct() {
	}

	harvestCompleteMove() {
		this.moveToRemoteRoom();
		this.memory.takeStepsIntoRoom = 1;
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


module.exports = RemoteEnergyWorker