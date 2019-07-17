
var flagTools = require("../../../tools/flagTools");
var roomTools = require("../../../tools/roomTools");
var SpawnOrderMaxSpawnedCount = require("../../../rules/spawnOrderMaxSpawnedCount");
var sumBy = require("lodash/sumBy");

var dropPointStrategy = {
	coolOffCount: 150,
};

dropPointStrategy.buildCreepsSpawnRule = function(spawnRoomName, remoteRoomName, spawnCreepsSpawnRule) {

	var creepsSpawnRule;
	var room = Game.rooms[remoteRoomName];
	if (room) {
		if (flagTools.hasDropFlag(remoteRoomName)) {

			var remoteReserverCount = !room.controller.my ? 1 : 0;
			var dropHarvesterCount = getDropHarvesterCount(room, spawnCreepsSpawnRule);
			var remoteSpawnedDropTransfererCount = spawnRoomName !== remoteRoomName ? 6 : 0;

			creepsSpawnRule = {
				roomName: remoteRoomName,
				spawnOrderMaxSpawnedCounts: [],
				partsPerMove: 1,
				canRemoteStorageTransferersPickup: true,
				canStorageTransferersPickup: true,
				measure: {
					droppedEnergy: {
						totalEnergyCount: 0,
						totalEnergy: 0
					},
					harvestedEnergy: {},
					canRecalculate: false,
				},
			}

			creepsSpawnRule.spawnOrderMaxSpawnedCounts.push({ remoteReserver: remoteReserverCount });

			for (var source of roomTools.getSources(remoteRoomName)) {

				creepsSpawnRule.spawnOrderMaxSpawnedCounts.push({ dropTransferer: 2, creepSubType: source.id, creepMemory: { sourceId: source.id } });

				creepsSpawnRule.measure.harvestedEnergy[source.id] = {
					totalEnergyCount: 0,
					totalEnergy: 0,
					averageTotalEnergy: 0,
				};
			}

			creepsSpawnRule.spawnOrderMaxSpawnedCounts.push({ remoteSpawnedStorageTransferer: remoteSpawnedDropTransfererCount });

			// dropHarvester will be moved after remoteReserver when recalculation starts
			creepsSpawnRule.spawnOrderMaxSpawnedCounts.push({ dropHarvester: dropHarvesterCount });

		} else {
			debug.danger(`dropPointStrategy: drop flag not found for ${remoteRoomName}`);
		}
	} else {
		debug.danger(`dropPointStrategy: room not found for ${remoteRoomName}`);
	}

	return creepsSpawnRule;
}

dropPointStrategy.recalculateCreepsSpawnRule = function(spawnRoomName, creepsSpawnRule, currentSpawnedCounts) {

	if (creepsSpawnRule.measure.canRecalculate) {

		var creepType = "dropHarvester";
		var currentCount = 0;
		var room = Game.rooms[creepsSpawnRule.roomName];
		var spawnOrderMaxSpawnedCount = SpawnOrderMaxSpawnedCount.find(creepsSpawnRule.spawnOrderMaxSpawnedCounts, creepType);
		spawnOrderMaxSpawnedCount[creepType] = getDropHarvesterCount(room, creepsSpawnRule);

		var maxSpawnedCount;
		var storageStats = roomTools.getStorageStats(spawnRoomName);
		var isAtStorageLimit = (storageStats.hasStorage && storageStats.percentageStoredEnergy >= 95);

		// Dropped energy recalculation only necessary if using remoteSpawnedStorageTransferer, not the case if in the spawned room
		if (spawnRoomName !== creepsSpawnRule.roomName) {

			creepType = "remoteSpawnedStorageTransferer";
			currentCount = currentSpawnedCounts[creepType] || 0;
			spawnOrderMaxSpawnedCount = SpawnOrderMaxSpawnedCount.find(creepsSpawnRule.spawnOrderMaxSpawnedCounts, creepType);
			maxSpawnedCount = spawnOrderMaxSpawnedCount[creepType];

			debug.temp(currentCount, maxSpawnedCount, creepTypeKey);
			if (currentCount === maxSpawnedCount) {
				maxSpawnedCount = recalculateEnergy(spawnRoomName, creepsSpawnRule, creepType, creepsSpawnRule.measure.droppedEnergy, maxSpawnedCount);
			}

			if (isAtStorageLimit) {
				if (maxSpawnedCount > 5) {
					maxSpawnedCount = 5;
				}
			}

			if (maxSpawnedCount > roomTools.getSpawnsCount(spawnRoomName) * 10) {
				maxSpawnedCount = roomTools.getSpawnsCount(spawnRoomName) * 10;
			}

			spawnOrderMaxSpawnedCount[creepType] = maxSpawnedCount;
		}

		var sources = roomTools.getSources(creepsSpawnRule.roomName);

		for (var source of sources) {

			creepType = "dropTransferer";
			var creepTypeKey = SpawnOrderMaxSpawnedCount.buildCreepTypeKey(creepType, source.id);
			currentCount = currentSpawnedCounts[creepTypeKey] || 0;
			spawnOrderMaxSpawnedCount = SpawnOrderMaxSpawnedCount.find(creepsSpawnRule.spawnOrderMaxSpawnedCounts, creepType, source.id);
			maxSpawnedCount = spawnOrderMaxSpawnedCount[creepType];

			debug.temp(currentCount, maxSpawnedCount, creepTypeKey);
			if (currentCount === maxSpawnedCount) {
				maxSpawnedCount = recalculateEnergy(spawnRoomName, creepsSpawnRule, creepType, creepsSpawnRule.measure.harvestedEnergy[source.id], maxSpawnedCount);
			}

			if (isAtStorageLimit) {
				if (maxSpawnedCount > 1) {
					maxSpawnedCount = 1;
				}
			}

			if (maxSpawnedCount > roomTools.getSpawnsCount(spawnRoomName) * 5) {
				maxSpawnedCount = roomTools.getSpawnsCount(spawnRoomName) * 5;
			}

			spawnOrderMaxSpawnedCount[creepType] = maxSpawnedCount;
		}
	}
}

function recalculateEnergy(spawnRoomName, creepsSpawnRule, creepType, measureMemory, maxSpawnedCount) {

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

	debug.temp(creepType, averageCarryCapacity, energyToCapacityPercent, energyToCapacityPercent > averageCarryCapacity * 2.3, energyToCapacityPercent < 20)

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

	measureMemory.totalEnergyCount = 0;
	measureMemory.totalEnergy = 0;

	return maxSpawnedCount;
}

dropPointStrategy.measureCreepsSpawnRule = function(spawnRoomName, creepsSpawnRule, currentSpawnedCounts) {

	if (creepsSpawnRule.measure.canRecalculate) {

		var room = Game.rooms[creepsSpawnRule.roomName];
		if (room) {
			if (flagTools.hasDropFlag(creepsSpawnRule.roomName)) {

				// Dropped energy measurement only necessary if using remoteSpawnedStorageTransferer, not the case if in the spawned room
				if (spawnRoomName !== creepsSpawnRule.roomName) {
					var resources = roomTools.GetDropFlagWritableDroppedResources(room.name);
					measureEnergy(creepsSpawnRule.measure.droppedEnergy, resources);
				}

				var sources = roomTools.getSources(room.name);

				for (var source of sources) {
					var resources = roomTools.GetSourceWritableDroppedResources(room.name, source.id);
					measureEnergy(creepsSpawnRule.measure.harvestedEnergy[source.id], resources);
				}

			} else {
				debug.danger(`dropPointStrategy: drop flag not found for ${creepsSpawnRule.roomName}`);
			}

		} else {
			debug.warning(`dropPointStrategy: room not found for ${creepsSpawnRule.roomName}`);
		}
	} else {
		setCanRecalculate(creepsSpawnRule, currentSpawnedCounts);
	}
}

function measureEnergy(measureMemory, resources) {

	var totalEnergy = sumBy(resources, "energy");

	measureMemory.totalEnergyCount++;
	measureMemory.totalEnergy += totalEnergy;
	measureMemory.averageTotalEnergy = Math.floor(measureMemory.totalEnergy / measureMemory.totalEnergyCount);
}

dropPointStrategy.canApplyRule = function(spawnRoomName, remoteRoomName) {

	var canApplyRule = false;
	var storageStats = roomTools.getStorageStats(spawnRoomName);

	if (!storageStats.hasStorage || storageStats.percentageStoredEnergy < 99) {
		canApplyRule = true;
	}

	return canApplyRule;
}

function setCanRecalculate(creepsSpawnRule, currentSpawnedCounts) {

	var currentDropHarvesterCount = currentSpawnedCounts["dropHarvester"] || 0;
	var spawnOrderMaxSpawnedCount = SpawnOrderMaxSpawnedCount.find(creepsSpawnRule.spawnOrderMaxSpawnedCounts, "dropHarvester");
	var dropHarvesterMaxSpawnedCount = spawnOrderMaxSpawnedCount["dropHarvester"];

	if (currentDropHarvesterCount >= dropHarvesterMaxSpawnedCount) {

		creepsSpawnRule.spawnOrderMaxSpawnedCounts.pop();
		creepsSpawnRule.spawnOrderMaxSpawnedCounts.splice(1, 0, spawnOrderMaxSpawnedCount);
		creepsSpawnRule.measure.canRecalculate = true;
	}
}

function getDropHarvesterCount(room, creepsSpawnRule) {

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

module.exports = dropPointStrategy;