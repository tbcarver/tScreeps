
var roomTools = require("../../../tools/roomTools");
var SpawnOrderMaxSpawnedCount = require("../../../rules/spawnOrderMaxSpawnedCount");
var sumBy = require("lodash/sumBy");

var dropStrategyTools = {};

dropStrategyTools.recalculateEnergy = function(creepsSpawnRule, creepType, measureMemory, maxSpawnedCount, currentSpawnedCount) {

	if (currentSpawnedCount === maxSpawnedCount) {
		var carryCapacities = _.reduce(Memory.creeps, (carryCapacities, creepMemory, creepName) => {

			if (creepMemory.type === creepType && creepMemory.remoteRoomName === creepsSpawnRule.roomName) {

				carryCapacities.creepsCount++;
				carryCapacities.totalCarryCapacity += Game.creeps[creepName].carryCapacity;
			}

			return carryCapacities;
		}, { creepsCount: 0, totalCarryCapacity: 0 });

		var averageCarryCapacity = Math.floor(carryCapacities.totalCarryCapacity / carryCapacities.creepsCount);
		var averageEnergy = Math.floor(measureMemory.totalEnergy / measureMemory.totalEnergyCount);
		var energyToCapacityPercent = Math.floor(averageEnergy / averageCarryCapacity * 100);

		if (energyToCapacityPercent > averageCarryCapacity * 2.3) {

			var additionalCreepsCount = Math.floor(energyToCapacityPercent / averageCarryCapacity);

			if (additionalCreepsCount > 5) {
				maxSpawnedCount += 2;
			} else {
				maxSpawnedCount++;
			}
		} else if (energyToCapacityPercent < 20) {

			if (maxSpawnedCount > 0) {
				maxSpawnedCount--;
			}
		}
	}

	measureMemory.totalEnergyCount = 0;
	measureMemory.totalEnergy = 0;

	return maxSpawnedCount;
}

dropStrategyTools.measureEnergy = function(measureMemory, resources) {

	var totalEnergy = sumBy(resources, "energy");

	measureMemory.totalEnergyCount++;
	measureMemory.totalEnergy += totalEnergy;
	measureMemory.averageTotalEnergy = Math.floor(measureMemory.totalEnergy / measureMemory.totalEnergyCount);
}

dropStrategyTools.setCanRecalculate = function(creepsSpawnRule, currentSpawnedCounts) {

	var currentDropHarvesterCount = currentSpawnedCounts["dropHarvester"] || 0;
	var spawnOrderMaxSpawnedCount = SpawnOrderMaxSpawnedCount.find(creepsSpawnRule.spawnOrderMaxSpawnedCounts, "dropHarvester");
	var dropHarvesterMaxSpawnedCount = spawnOrderMaxSpawnedCount["dropHarvester"];

	if (currentDropHarvesterCount >= dropHarvesterMaxSpawnedCount) {

		creepsSpawnRule.spawnOrderMaxSpawnedCounts.pop();
		creepsSpawnRule.spawnOrderMaxSpawnedCounts.splice(1, 0, spawnOrderMaxSpawnedCount);
		creepsSpawnRule.measure.canRecalculate = true;
	}
}

dropStrategyTools.getRemoteReserverCount = function(room) {

	return (!room.controller.my && room.energyCapacityAvailable >= 700) ? 1 : 0;
}

dropStrategyTools.getDropHarvesterCount = function(room, creepsSpawnRule) {

	var dropHarvesterCount = 0;
	var creepsPerResource = (room.energyCapacityAvailable >= 400) ? 2 : 3;

	if (creepsSpawnRule.partsPerMove === 1) {
		creepsPerResource = (room.energyCapacityAvailable >= 450) ? 2 : 3;
	}

	var resources = roomTools.getSources(room.name);

	for (var resource of resources) {
		if (roomTools.getCountResourceHarvestPositions(resource.id) >= creepsPerResource) {
			dropHarvesterCount += creepsPerResource;
		} else {
			dropHarvesterCount++;
		}
	}

	return dropHarvesterCount;
}


module.exports = dropStrategyTools;