
var spawnTools = require("../../tools/spawnTools");
var { rules } = require("../../rules/rules");
var EnergyCreep = require("../baseCreeps/energyCreep");
var ControllerEnergizer = require("../energizers/controllerEnergizer");

var maximumWallRepair = rules.maximumWallRepair || 2000 * 150;

class WallRepairer extends EnergyCreep {

	/** @param {Creep} creep */
	constructor(creep) {
		super(creep);

		this.canBuild = true;
	}

	energyAct() {

		var target;
		var targets = this.creep.room.find(FIND_STRUCTURES, {
			filter: structure => (structure.structureType === STRUCTURE_WALL ||
				structure.structureType === STRUCTURE_RAMPART) &&
				structure.hits <= maximumWallRepair
		});

		if (!_.isEmpty(targets)) {
			for (var count = 1; count <= 150; count++) {

				target = this.creep.pos.findClosestByRange(targets, {
					filter: structure => structure.hits <= (2000 * count)
				});

				if (target) {
					break;
				}
			}

			if (target) {

				if (this.isInTravelDistance(target)) {
					this.travelNearTo(target, true);
				} else {
	
					if (this.creep.repair(target) == ERR_NOT_IN_RANGE) {
						this.moveToAndAvoid(target);
					}
				}
			}
		} else {
			ControllerEnergizer.prototype.energyAct.call(this);
		}
	}

	static initializeSpawnCreepMemory(room, spawn, creepsSpawnRule) {

		var creepMemory;

		if (room.find) {

			var targets = room.find(FIND_STRUCTURES, {
				filter: structure => (structure.structureType === STRUCTURE_WALL ||
					structure.structureType === STRUCTURE_RAMPART) &&
					structure.hits <= maximumWallRepair
			});

			if (targets.length > 0) {

				creepMemory = {
					type: "wallRepairer",
					bodyPartsType: "moveCarryWork",
					maximumSpawnCapacity: 350,
				}

				var capacity = spawnTools.calculateSpawnCapacity(spawn);
		
				if (capacity >= 550) {
					creepMemory.maximumSpawnCapacity = 550;
				}
		
				if (capacity >= 850) {
					creepMemory.maximumSpawnCapacity = 850;
				}

				creepMemory = EnergyCreep.initializeSpawnCreepMemory(creepMemory, room, spawn, creepsSpawnRule);
			}
		}

		return creepMemory;
	}
}


module.exports = WallRepairer