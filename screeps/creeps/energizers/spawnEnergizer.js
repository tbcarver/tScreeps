
var roomTools = require("../../tools/roomTools");
var EnergyCreep = require("../baseCreeps/energyCreep");

class SpawnEnergizer extends EnergyCreep {

	/** @param {Creep} creep */
	constructor(creep) {
		super(creep);
	}

	harvestCompleteMove() {

		var target = roomTools.getSpawn(this.roomName);
		if (target) {
			this.moveToAndAvoid(target);
		} else {
			this.moveIntoRoom();
		}
	}

	energyAct() {

		var targets = /** @type {StructureTower[] | StructureSpawn[]} */ ([]);

		if (roomTools.areTowersLowEnergy(this.roomName)){
			targets = roomTools.getTowers(this.roomName);
		}

		if (_.isEmpty(targets) && !roomTools.areSpawnsFullEnergy(this.roomName)) {
			targets = roomTools.getSpawns(this.roomName);
		}

		if (_.isEmpty(targets) && !roomTools.areTowersFullEnergy(this.roomName)) {
			targets = roomTools.getTowers(this.roomName);
		}

		if (!_.isEmpty(targets)) {

			// Sort for the lowest energy first
			targets.sort((targetA, targetB) => targetA.energy - targetB.energy);
			var target = targets[0];
		}

		if (target) {

			if (this.isInTravelDistance(target)) {
				this.travelNearTo(target, true);
			} else {

				var transferResult = this.creep.transfer(target, RESOURCE_ENERGY);
				if (transferResult == OK) {
					
					if (target.energyCapacity - target.energy >= this.creep.carry.energy) {

						this.state = "harvesting";
						this.harvest();
					}
				} else if (transferResult == ERR_NOT_IN_RANGE) {

					this.moveToAndAvoid(target);
				}
			}
		} else {

			if (this.creep.carry.energy / this.creep.carryCapacity < .33) {				
				this.state = "harvesting";
				this.harvest();
			} else {

				target = roomTools.getSpawn(this.roomName);
				if (target) {
					if (this.isInTravelDistance(target, 2)) {
						this.travelTo(target, 2, true);
					}
				} else {
	
					this.moveIntoRoom();
				}
			}
		}
	}

	static initializeSpawnCreepMemory(room, spawn, creepsSpawnRule) {

		var creepMemory = {
			type: "spawnEnergizer",
			bodyPartsType: "moveCarry",
			maximumSpawnCapacity: 450,
		}

		if (creepsSpawnRule.canEnergyCreepsHarvest) {
			creepMemory.bodyPartsType = "moveCarryWork";
		}

		var spawns = room.find(FIND_STRUCTURES, {
			filter: { structure: STRUCTURE_SPAWN }
		});

		if (spawns.length >= 2) {
			creepMemory.maximumSpawnCapacity = 600;
		}

		if (spawns.length >= 3) {
			creepMemory.maximumSpawnCapacity = 750;
		}

		creepMemory = EnergyCreep.initializeSpawnCreepMemory(creepMemory, room, spawn, creepsSpawnRule);

		return creepMemory;
	}
}


module.exports = SpawnEnergizer