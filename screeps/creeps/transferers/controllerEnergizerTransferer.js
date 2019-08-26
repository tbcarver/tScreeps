
var roomTools = require("../../tools/roomTools");
var spawnTools = require("../../tools/spawnTools");
var BaseCreep = require("../baseCreeps/baseCreep");
var EnergyCreep = require("../baseCreeps/energyCreep");

class ControllerEnergizerTransferer extends EnergyCreep {

	/** @param {Creep} creep */
	constructor(creep) {
		super(creep);
	}

	harvestCompleteMove() {

		var target = this.findCreepToEnergize();

		if (target) {
			this.moveToAndAvoid(target);
		} else {
			this.moveIntoRoom();
		}
	}

	energyAct() {

		var creep = this.findCreepToEnergize();

		if (creep) {

			var result = this.creep.transfer(creep, RESOURCE_ENERGY);

			if (result === OK) {

				BaseCreep.prototype.cancelTravelTo.call(creep);
				creep = this.findCreepToEnergize(creep.name);
				this.moveToCreep(creep);

			} else if (result == ERR_NOT_IN_RANGE) {
				this.moveToCreep(creep);
			}
		} else {

			if (this.creep.carry.energy / this.creep.carryCapacity < .33) {
				this.state = "harvesting";
				this.harvest();
			}
		}
	}

	findCreepToEnergize(lastCreepName) {

		return this.creep.pos.findClosestByPath(FIND_MY_CREEPS, {
			filter: creep => creep.memory.type === "controllerEnergizer" &&
				creep.carry.energy / creep.carryCapacity < .80 && lastCreepName !== creep.name
		});
	}

	moveToCreep(creep) {

		var ignoreObjects = roomTools.getControllerPositionsWithinEnergizingRange(this.creep.room.controller);

		var path = this.creep.pos.findPathTo(creep, {
			costCallback: function(roomName, costMatrix) {
				for (var ignoreObject of ignoreObjects) {
					costMatrix.set(ignoreObject.x, ignoreObject.y, 255);
				};
				return undefined;
			}
		});

		return this.creep.moveByPath(path);
	}

	static initializeSpawnCreepMemory(room, spawn, creepsSpawnRule) {

		var creepMemory = {
			type: "controllerEnergizerTransferer",
			bodyPartsType: "moveCarry",
			maximumSpawnCapacity: 300,
		}

		var capacity = spawnTools.calculateSpawnCapacity(spawn);

		if (capacity >= 450) {
			creepMemory.minimumSpawnCapacity = 450;
			creepMemory.maximumSpawnCapacity = 450;
		}

		if (capacity >= 750) {
			creepMemory.minimumSpawnCapacity = 750;
			creepMemory.maximumSpawnCapacity = 750;
		}

		if (capacity >= 900) {
			creepMemory.minimumSpawnCapacity = 900;
			creepMemory.maximumSpawnCapacity = 900;
		}

		// if (creepsSpawnRule.partsPerMove === 1) {

		// 	creepMemory.maximumSpawnCapacity = 350;

		// 	if (capacity >= 700) {
		// 		creepMemory.minimumSpawnCapacity = 700;
		// 		creepMemory.maximumSpawnCapacity = 700;
		// 	}
		// }

		creepMemory = EnergyCreep.initializeSpawnCreepMemory(creepMemory, room, spawn, creepsSpawnRule);

		return creepMemory;
	}
}


module.exports = ControllerEnergizerTransferer