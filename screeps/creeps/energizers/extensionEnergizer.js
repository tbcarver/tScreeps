
var Energizer = require("./energizer");
var { maxExtensionsPerEnergizer } = require("../creepsRules");
var coreArray = require("../../../lib/core/extensions/coreArray");

function ExtensionEnergizer(creep) {

	Energizer.call(this, creep);
}

ExtensionEnergizer.prototype = Object.create(Energizer.prototype);

ExtensionEnergizer.prototype.act = function() {

	Energizer.prototype.act.call(this);
}

ExtensionEnergizer.prototype.energize = function() {

	var extension = Game.getObjectById(this.memory.extensions[this.memory.activeExtensionIndex].id);

	if (extension) {

		var transferResult = this.creep.transfer(extension, RESOURCE_ENERGY);

		if (transferResult == ERR_NOT_IN_RANGE) {

			this.creep.moveTo(extension);

		} else if (transferResult == ERR_FULL) {

			if (this.memory.extensions.length > 1) {

				this.memory.activeExtensionIndex = coreArray.incrementArrayIndex(this.memory.extensions, this.memory.activeExtensionIndex);
				var transferResult = this.creep.transfer(extension, RESOURCE_ENERGY);

				if (transferResult == ERR_NOT_IN_RANGE) {

					this.creep.moveTo(extension);
				}
			}

			if (transferResult == ERR_FULL && this.creep.carry[RESOURCE_ENERGY] / this.creep.carryCapacity < .30) {

				this.state = "harvesting";
			}
		}
	} else {

		debug.danger("extensionEnergizer extension not found: " + this.memory.extensions[0].id);
	}
}

ExtensionEnergizer.initializeSpawnCreepMemory = function(creepsCurrentCount) {

	var creepMemory;

	var extensions = room.find(FIND_MY_STRUCTURES, {
		filter: {
			structureType: STRUCTURE_EXTENSION
		}
	});

	var occupiedPositions = getCreepExtensionPositions();
	availableExtensions = extensions.filter(extension => {

		var isExtensionOccupied = occupiedPositions.some(occupiedPos => occupiedPos.x === extension.pos.x &&
			occupiedPos.y === extension.pos.y)

		return !isExtensionOccupied;
	});

	if (availableExtensions.length > 0) {

		creepMemory = {
			type: "extensionEnergizer",
			bodyPartsType: "energizer",
			maximumSpawnCapacity: 450,
			extensions: [{
				id: "",
				pos: {}
			}],
			activeExtensionIndex: 0
		};

		var nextExtension = spawn.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: nextStructure => nextStructure.structureType == STRUCTURE_EXTENSION &&
				_.map(availableExtensions, availableExtension => availableExtension.id).includes(nextStructure.id)
		});

		creepMemory.extensions[0].id = nextExtension.id;
		creepMemory.extensions[0].pos = nextExtension.pos;
		// debug.temp("next", nextExtension.pos, 0);

		for (var index = 1; index < maxExtensionsPerEnergizer; index++) {
			// NOTE: The structures must be adjacent
			nextExtension = nextExtension.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: nextStructure => nextStructure.structureType == STRUCTURE_EXTENSION &&
					_.map(availableExtensions, availableExtension => availableExtension.id).includes(nextStructure.id) &&
					!_.map(creepMemory.extensions, extension => extension.id).includes(nextStructure.id)
			});

			if (!nextExtension) {
				break;
			}

			// debug.temp("next", nextExtension.pos, index);

			creepMemory.extensions.push({
				id: nextExtension.id,
				pos: nextExtension.pos
			});
		}
	}

	return creepMemory;
}

function getCreepExtensionPositions() {

	var result = _.reduce(Memory.creeps, (filteredPositions, creepMemory) => {

		if (creepMemory.type === "extensionEnergizer") {

			positions = creepMemory.extensions.reduce((extensionPositions, extension) => {

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