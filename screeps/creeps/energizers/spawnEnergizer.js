
var BaseCreep = require("../baseCreeps/baseCreep");
var EnergyCreep = require("../baseCreeps/energyCreep");

class SpawnEnergizer extends EnergyCreep {

	/** @param {Creep} creep */
	constructor(creep) {
		super(creep);
	}

	act() {
		return super.act();
	}

	harvestCompleteMove() {
		this.moveIntoRoom();
	}

	energyAct() {

		var targetStructures = /** @type {StructureTower[] | StructureSpawn[]} */ (this.creep.room.find(FIND_STRUCTURES, {
			filter: structure => structure.structureType === STRUCTURE_TOWER &&
				structure.energy < structure.energyCapacity
		}));

		if (targetStructures.length > 0) {

			// Sort for the lowest energy first
			targetStructures.sort((targetStructureA, targetStructureB) => targetStructureA.energy - targetStructureB.energy);
			var targetStructure = targetStructures[0];
		}

		if (!targetStructure) {

			targetStructure = /** @type {StructureSpawn} */ (this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: structure => structure.structureType === STRUCTURE_SPAWN &&
					structure.energy < structure.energyCapacity
			}));
		}

		if (!targetStructure) {

			targetStructure = /** @type {StructureSpawn} */ (this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: structure => structure.structureType === STRUCTURE_SPAWN
			}));
		}

		if (targetStructure) {

			if (this.isInTravelDistance(targetStructure)) {
				this.travelNearTo(targetStructure, true);
			} else {

				var transferResult = this.creep.transfer(targetStructure, RESOURCE_ENERGY);
				if (transferResult == OK) {

					this.state = "harvesting";
					this.harvest();

				} else if (transferResult == ERR_NOT_IN_RANGE) {

					this.moveToAndAvoid(targetStructure);

				} else if (transferResult == ERR_FULL && this.creep.carry[RESOURCE_ENERGY] / this.creep.carryCapacity < .30) {

					this.state = "harvesting";
					this.harvest();
				}
			}

		} else {
			BaseCreep.prototype.moveIntoRoom();
		}
	}

	static initializeSpawnCreepMemory(room, spawn, creepsSpawnRule) {

		var creepMemory = {
			type: "spawnEnergizer",
			bodyPartsType: "moveCarryWork",
			maximumSpawnCapacity: 450,
		}

		if (!creepsSpawnRule.canEnergyCreepsHarvest) {
			creepMemory.bodyPartsType = "moveCarry";
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