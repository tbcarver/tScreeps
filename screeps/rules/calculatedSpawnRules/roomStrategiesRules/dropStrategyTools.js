
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

		var averageCarryCapacity = (carryCapacities.creepsCount > 0) ? Math.floor(carryCapacities.totalCarryCapacity / carryCapacities.creepsCount) : 100;
		var averageEnergy = (measureMemory.totalEnergyCount > 0) ? Math.floor(measureMemory.totalEnergy / measureMemory.totalEnergyCount) : 0;
		var energyToCapacityPercent = (averageCarryCapacity > 0) ? Math.floor(averageEnergy / averageCarryCapacity * 100) : 0;

		if (energyToCapacityPercent >= 80) {

			var additionalCreepsCount = (averageCarryCapacity > 0) ? Math.floor(energyToCapacityPercent / averageCarryCapacity) : 0;

			if (additionalCreepsCount > 5) {
				maxSpawnedCount += 2;
			} else {
				maxSpawnedCount++;
			}
		} else if (energyToCapacityPercent <= 20) {

			if (maxSpawnedCount > 0) {
				maxSpawnedCount--;
			}

			if (energyToCapacityPercent === 0) {
				if (maxSpawnedCount > 0) {
					maxSpawnedCount--;
				}
			}
		}
	}

	measureMemory.totalEnergyCount = 0;
	measureMemory.totalEnergy = 0;

	return maxSpawnedCount;
}

dropStrategyTools.measureWritableEnergy = function(measureMemory, resources, energyPercent = 100) {

	var totalEnergy = sumBy(resources, "writableAmount");

	measureMemory.totalEnergyCount++;
	measureMemory.totalEnergy += (totalEnergy * energyPercent / 100);
	measureMemory.averageTotalEnergy = Math.floor(measureMemory.totalEnergy / measureMemory.totalEnergyCount);
}

dropStrategyTools.setCanRecalculate = function(creepsSpawnRule, currentSpawnedCounts, creepsSpawnRuleKey) {

	var currentDropHarvesterCount = currentSpawnedCounts["dropHarvester"] || 0;
	var spawnOrderMaxSpawnedCount = SpawnOrderMaxSpawnedCount.find(creepsSpawnRule.spawnOrderMaxSpawnedCounts, "dropHarvester");
	var dropHarvesterMaxSpawnedCount = spawnOrderMaxSpawnedCount["dropHarvester"];

	if (currentDropHarvesterCount >= dropHarvesterMaxSpawnedCount) {

		creepsSpawnRule.spawnOrderMaxSpawnedCounts.pop();
		creepsSpawnRule.spawnOrderMaxSpawnedCounts.splice(1, 0, spawnOrderMaxSpawnedCount);
		creepsSpawnRule.measure.canRecalculate = true;

		debug.highlight(`${creepsSpawnRuleKey} can recalculate.`);
	}
}

dropStrategyTools.getRemoteReserverCount = function(spawnRoom, remoteRoom) {

	return (!remoteRoom.controller.my && spawnRoom.energyCapacityAvailable >= 700) ? 1 : 0;
}

dropStrategyTools.getDropHarvesterCount = function(spawnRoom, remoteRoom, creepsSpawnRule, remoteReserverCount) {

	var dropHarvesterCount = 0;
	var creepsPerResource = (spawnRoom.energyCapacityAvailable >= 400) ? 2 : 3;

	if (creepsSpawnRule.partsPerMove === 1) {
		creepsPerResource = (spawnRoom.energyCapacityAvailable >= 450) ? 2 : 3;
	}

	if (remoteReserverCount < 1 && !roomTools.hasMyController(remoteRoom.name)) {
		creepsPerResource--;
	}

	var resources = roomTools.getSources(remoteRoom.name);

	for (var resource of resources) {

		var creepsCount = roomTools.getCountResourceHarvestPositions(resource.id);

		if (creepsCount > creepsPerResource) {
			creepsCount = creepsPerResource;
		}

		dropHarvesterCount += creepsCount;
	}

	return dropHarvesterCount;
}


module.exports = dropStrategyTools;