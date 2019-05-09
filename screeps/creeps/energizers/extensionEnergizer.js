
var Energizer = require("./energizer");

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

	availableExtensions = extensions.filter(extension => {

		var occupiedPositions = getHarvesterStructurePositions(STRUCTURE_EXTENSION);
		var isExtensionOccupied = occupiedPositions.some(occupiedPos => occupiedPos.x === extension.pos.x &&
			occupiedPos.y === extension.pos.y)

		return !isExtensionOccupied;
	});

	if (availableExtensions.length > 0) {

		creepMemory = {
			type: "extensionEnergizer",
			extensions: [{
				id: "",
				pos: {}
			}],
			activeExtensionIndex: 0
		};

		var nextExtension = availableExtensions[0];
		creepMemory.extensions[0].id = nextExtension.id;
		creepMemory.extensions[0].pos = nextExtension.pos;

		for (var index = 1; index < maxExtensionsPerEnergizer; index++) {

			nextExtension = nextExtension.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: nextStructure => nextStructure.structureType == STRUCTURE_EXTENSION &&
					_.map(availableExtensions, availableExtension => availableExtension.id).includes(nextStructure.id) &&
					!_.map(creepMemory.extensions, extension => extension.id).includes(nextStructure.id)
			});

			if (nextExtension) {

				creepMemory.extensions.push({
					id: nextExtension.id,
					pos: nextExtension.pos
				})
			}
		}
	}

	return creepMemory;
}

module.exports = ExtensionEnergizer