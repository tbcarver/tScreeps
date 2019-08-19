
var spawnTools = require("../../tools/spawnTools");
var EnergyCreep = require("../baseCreeps/energyCreep");

class ExtensionEnergizer extends EnergyCreep {

	/** @param {Creep} creep */
	constructor(creep) {
		super(creep);
	}

	harvestCompleteMove() {

		var target = Game.getObjectById(this.memory.extensions[this.memory.activeExtensionIndex].id);
		if (target) {
			this.moveToAndAvoid(target);
		} else {
			this.moveIntoRoom();
		}
	}

	energyAct() {

		// this.creep.say(this.memory.extensions.length)
		// debug.temp(this.creep.name, this.memory.extensions.map(e => e.pos.x + " " + e.pos.y))

		var activeExtension = Game.getObjectById(this.memory.extensions[this.memory.activeExtensionIndex].id);

		if (this.isInTravelDistance(activeExtension)) {
			this.travelNearTo(activeExtension, true);
		} else {

			var energizingExtensionIDs = this.memory.extensions.map(extension => extension.id);
			var extension = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
				filter: structure => structure.structureType === STRUCTURE_EXTENSION &&
					structure.energy < structure.energyCapacity && energizingExtensionIDs.includes(structure.id)
			});

			if (extension) {
				if (this.creep.transfer(extension, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

					this.moveToAndAvoid(extension);
				}
			} else if (this.creep.carry.energy / this.creep.carryCapacity < .33) {

				this.state = "harvesting";
				this.harvest();

			} else if (this.isInTravelDistance(activeExtension, 1)) {
				this.moveToAndAvoid(activeExtension);
			}
		}
	}

	static initializeSpawnCreepMemory(room, spawn, creepsSpawnRule) {

		var creepMemory;

		var extensions = room.find(FIND_MY_STRUCTURES, {
			filter: {
				structureType: STRUCTURE_EXTENSION
			}
		});

		var occupiedPositions = getCreepExtensionPositions();

		var availableExtensions = extensions.filter(extension => {

			var isExtensionOccupied = occupiedPositions.some(occupiedPos => occupiedPos.x === extension.pos.x &&
				occupiedPos.y === extension.pos.y && occupiedPos.roomName === extension.pos.roomName)

			return !isExtensionOccupied;
		});

		if (availableExtensions.length > 0) {

			creepMemory = {
				type: "extensionEnergizer",
				bodyPartsType: "moveCarry",
				maximumSpawnCapacity: 550,
				extensions: [{
					id: "",
					pos: {}
				}],
				activeExtensionIndex: 0
			};

			if (creepsSpawnRule.canEnergyCreepsHarvest) {
				creepMemory.bodyPartsType = "moveCarryWork";
			}

			creepMemory = EnergyCreep.initializeSpawnCreepMemory(creepMemory, room, spawn, creepsSpawnRule);

			var nextExtension = spawn.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: nextStructure => nextStructure.structureType == STRUCTURE_EXTENSION &&
					_.map(availableExtensions, availableExtension => availableExtension.id).includes(nextStructure.id)
			});

			creepMemory.extensions[0].id = nextExtension.id;
			creepMemory.extensions[0].pos = nextExtension.pos;

			for (var index = 1; index < creepsSpawnRule.maxExtensionsPerEnergizer; index++) {

				// Find adjacent structures first
				var nextExtensions = nextExtension.pos.findInRange(FIND_STRUCTURES, 1, {
					filter: nextStructure => nextStructure.structureType == STRUCTURE_EXTENSION &&
						_.map(availableExtensions, availableExtension => availableExtension.id).includes(nextStructure.id) &&
						!_.map(creepMemory.extensions, extension => extension.id).includes(nextStructure.id)
				});

				if (nextExtensions.length > 0) {
					nextExtension = nextExtensions[0];
				} else {
					// Find a structure on the same x or y 2 positions away
					nextExtensions = nextExtension.pos.findInRange(FIND_STRUCTURES, 2, {
						filter: nextStructure => nextStructure.structureType == STRUCTURE_EXTENSION &&
							(nextStructure.pos.x === nextExtension.pos.x || nextStructure.pos.y === nextExtension.pos.y) &&
							_.map(availableExtensions, availableExtension => availableExtension.id).includes(nextStructure.id) &&
							!_.map(creepMemory.extensions, extension => extension.id).includes(nextStructure.id)
					});

					if (nextExtensions.length > 0) {
						nextExtension = nextExtensions[0];
					}
				}

				if (!nextExtension) {
					break;
				}

				creepMemory.extensions.push({
					id: nextExtension.id,
					pos: nextExtension.pos
				});
			}

			if (creepMemory.extensions.length > 1) {
				creepMemory.activeExtensionIndex = 1;
			}

			if (creepMemory.extensions.length >= 10 || room.controller.level >= 7) {
				creepMemory.maximumSpawnCapacity = 750;
			}
		}

		return creepMemory;
	}
}

function getCreepExtensionPositions() {

	var result = _.reduce(Memory.creeps, (filteredPositions, creepMemory, creepName) => {

		if (creepMemory.type === "extensionEnergizer" && !spawnTools.isCreepInSpawnBuffer(Game.creeps[creepName])) {

			var positions = creepMemory.extensions.reduce((extensionPositions, extension) => {

				extensionPositions.push(extension.pos);

				return extensionPositions;
			}, []);

			filteredPositions.push(...positions);
		}

		return filteredPositions;
	}, []);

	return result;
}


module.exports = ExtensionEnergizer