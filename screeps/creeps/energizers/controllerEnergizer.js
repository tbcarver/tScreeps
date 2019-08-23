
var roomTools = require("../../tools/roomTools"); var spawnTools = require("../../tools/spawnTools");
var spawnTools = require("../../tools/spawnTools");
var EnergyCreep = require("../baseCreeps/energyCreep");

class ControllerEnergizer extends EnergyCreep {

	/** @param {Creep} creep */
	constructor(creep) {
		super(creep);

		this.canBuild = this.memory.canBuild;
		this.energizingController = false;
	}

	harvest() {

		delete this.creep.memory.upgradeControllerRange;
		this.energizingController = false;
		super.harvest();
	}

	harvestCompleteMove() {

		var target;

		if (this.canBuild && roomTools.hasConstructionSites(this.roomName)) {
			target = this.creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
		}

		if (!target) {
			target = this.creep.room.controller;
		}

		if (target) {
			this.moveToAndAvoid(target);
		} else {
			this.moveIntoRoom();
		}
	}

	energyAct() {

		var acted = false;
		var target;

		if (this.energizingController) {
			
			target = this.creep.room.controller.my ? this.creep.room.controller : undefined;

			var transferResult = this.creep.upgradeController(target);

			if (transferResult === OK) {
	
				acted = true;
				
			} else if (transferResult == ERR_NOT_IN_RANGE) {
	
				this.energizingController = false;
	
			} else if (transferResult == ERR_FULL && this.creep.carry.energy / this.creep.carryCapacity < .33) {
	
				this.state = "harvesting";
				this.harvest();
				acted = true;
			}
		}

		if (!acted && this.canBuild && roomTools.hasConstructionSites(this.roomName)) {

			target = this.creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

			if (target) {

				if (this.avoidCreepsOnTravel) {
					this.creep.memory.upgradeControllerRange = 3;
				}

				var range = this.creep.memory.upgradeControllerRange || 2;
				var isInTravelDistance = this.isInTravelDistance(target, range);
				var travelToResult;

				if (isInTravelDistance) {
					travelToResult = this.travelTo(target, range, true);
				}

				if (!isInTravelDistance || travelToResult !== OK) {

					if (this.creep.build(target) == ERR_NOT_IN_RANGE) {
						this.moveToAndAvoid(target);
					}
				}

				acted = true;
			}
		}

		if (!acted) {

			target = this.creep.room.controller.my ? this.creep.room.controller : undefined;

			if (target) {

				if (this.avoidCreepsOnTravel) {
					this.creep.memory.upgradeControllerRange = 3;
				}

				var range = this.creep.memory.upgradeControllerRange || 2;
				var isInTravelDistance = this.isInTravelDistance(target, range);
				var travelToResult;

				if (isInTravelDistance) {
					travelToResult = this.travelTo(target, range, true);
				}

				if (!isInTravelDistance || travelToResult !== OK) {

					var transferResult = this.creep.upgradeController(target);

					if (transferResult === OK) {

						this.energizingController = true;

					} else if (transferResult == ERR_NOT_IN_RANGE) {

						this.moveToAndAvoid(target);

					} else if (transferResult == ERR_FULL && this.creep.carry.energy / this.creep.carryCapacity < .33) {

						this.state = "harvesting";
						this.harvest();
					}
				}
			} else {
				this.travelToWaitFlag();
			}
		}
	}

	static initializeSpawnCreepMemory(room, spawn, creepsSpawnRule) {

		var creepMemory = {
			type: "controllerEnergizer",
			bodyPartsType: "moveCarryWork",
			canBuild: creepsSpawnRule.canControllerEnergizersBuild,
			maximumSpawnCapacity: 300,
		}

		var capacity = spawnTools.calculateSpawnCapacity(spawn);

		if (capacity >= 550) {
			creepMemory.minimumSpawnCapacity = 550;
			creepMemory.maximumSpawnCapacity = 550;
		}

		if (capacity >= 850) {
			creepMemory.minimumSpawnCapacity = 850;
			creepMemory.maximumSpawnCapacity = 850;
		}

		if (creepsSpawnRule.partsPerMove === 1) {

			creepMemory.maximumSpawnCapacity = 350;

			if (capacity >= 700) {
				creepMemory.minimumSpawnCapacity = 700;
				creepMemory.maximumSpawnCapacity = 700;
			}
		}

		creepMemory = EnergyCreep.initializeSpawnCreepMemory(creepMemory, room, spawn, creepsSpawnRule);

		return creepMemory;
	}
}


module.exports = ControllerEnergizer