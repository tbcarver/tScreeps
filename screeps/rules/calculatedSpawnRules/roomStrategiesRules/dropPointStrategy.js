
var flagTools = require("../../../tools/flagTools");
var roomTools = require("../../../tools/roomTools");
var sumBy = require("lodash/sumBy");

var dropPointStrategy = {
	coolOffCount: 300,
};

dropPointStrategy.buildCreepsSpawnRule = function(spawnRoomName, remoteRoomName, spawnCreepsSpawnRule) {

	var creepsSpawnRule;
	var room = Game.rooms[remoteRoomName];
	if (room) {
		if (flagTools.hasDropFlag(remoteRoomName)) {

			var remoteReserverCount = !room.controller.my ? 1 : 0;
			var dropHarvesterCount = getDropHarvesterCount(room, spawnCreepsSpawnRule);
			var remoteSpawnedDropTransfererCount = spawnRoomName !== remoteRoomName ? 6 : 0;
			
			var dropTransfererSpawnCreepMemory = {
				sourceIdsCounts: {}
			};
			var measureHarvestedEnergy = {};
			var sources = roomTools.getSources(remoteRoomName);

			for (var source of sources) {
				dropTransfererSpawnCreepMemory.sourceIdsCounts[source.id] = 2;
				measureHarvestedEnergy[source.id] = {
					totalEnergyCount: 0,
					totalEnergy: 0,
					averageTotalEnergy: 0,
				};
			}

			creepsSpawnRule = {
				roomName: remoteRoomName,
				spawnOrderMaxSpawnedCounts: [
					{ remoteReserver: remoteReserverCount },
					{ dropTransferer: sources.length * 2 },
					{ remoteSpawnedStorageTransferer: remoteSpawnedDropTransfererCount },
					{ dropHarvester: dropHarvesterCount }, // dropHarvester will be moved after remoteReserver when recalculation starts
				],
				spawnCreepMemory: {
					dropTransferer: dropTransfererSpawnCreepMemory,
				},
				partsPerMove: 1,
				canRemoteStorageTransferersPickup: true,
				canStorageTransferersPickup: true,
				measure: {
					droppedEnergy: {
						totalEnergyCount: 0,
						totalEnergy: 0
					},
					harvestedEnergy: measureHarvestedEnergy,
					canRecalculate: false,
				},
			}

		} else {
			debug.danger(`dropPointStrategy: drop flag not found for ${remoteRoomName}`);
		}
	} else {
		debug.danger(`dropPointStrategy: room not found for ${remoteRoomName}`);
	}

	return creepsSpawnRule;
}

dropPointStrategy.recalculateCreepsSpawnRule = function(spawnRoomName, creepsSpawnRule) {

	if (creepsSpawnRule.measure.canRecalculate) {

		var creepType = "dropHarvester";
		var room = Game.rooms[creepsSpawnRule.roomName];
		var spawnOrderMaxSpawnedCount = _.find(creepsSpawnRule.spawnOrderMaxSpawnedCounts, element => Object.keys(element)[0] === creepType);
		spawnOrderMaxSpawnedCount[creepType] = getDropHarvesterCount(room, creepsSpawnRule);

		var maxSpawnedCount;
		var storageStats = roomTools.getStorageStats(spawnRoomName);
		var isAtStorageLimit = (storageStats.hasStorage && storageStats.percentageStoredEnergy >= 95);

		// Dropped energy recalculation only necessary if using remoteSpawnedStorageTransferer, not the case if in the spawned room
		if (spawnRoomName !== creepsSpawnRule.roomName) {

			creepType = "remoteSpawnedStorageTransferer";
			spawnOrderMaxSpawnedCount = _.find(creepsSpawnRule.spawnOrderMaxSpawnedCounts, element => Object.keys(element)[0] === creepType);
			maxSpawnedCount = spawnOrderMaxSpawnedCount[creepType];
			maxSpawnedCount = recalculateEnergy(spawnRoomName, creepsSpawnRule, creepType, creepsSpawnRule.measure.droppedEnergy, maxSpawnedCount);

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

		creepType = "dropTransferer";
		spawnOrderMaxSpawnedCount = _.find(creepsSpawnRule.spawnOrderMaxSpawnedCounts, element => Object.keys(element)[0] === creepType);

		var dropTransfererMaxSpawnedCount = 0;
		var sources = roomTools.getSources(creepsSpawnRule.roomName);

		for (var source of sources) {

			maxSpawnedCount = spawnOrderMaxSpawnedCount[creepType];
			maxSpawnedCount = recalculateEnergy(spawnRoomName, creepsSpawnRule, creepType, creepsSpawnRule.measure.harvestedEnergy[source.id], maxSpawnedCount);

			if (isAtStorageLimit) {
				if (maxSpawnedCount > 1) {
					maxSpawnedCount = 1;
				}
			}

			if (maxSpawnedCount > roomTools.getSpawnsCount(spawnRoomName) * 5) {
				maxSpawnedCount = roomTools.getSpawnsCount(spawnRoomName) * 5;
			}

			creepsSpawnRule.spawnCreepMemory.dropTransferer.sourceIdsCounts[source.id] = maxSpawnedCount;

			dropTransfererMaxSpawnedCount += maxSpawnedCount;
		}

		spawnOrderMaxSpawnedCount[creepType] = dropTransfererMaxSpawnedCount;

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

	if (energyToCapacityPercent > averageCarryCapacity * 2.5) {

		var additionalCreepsCount = Math.floor(energyToCapacityPercent / averageCarryCapacity);

		if (additionalCreepsCount > 5) {
			maxSpawnedCount += 2;
		} else {
			maxSpawnedCount++;
		}
	} else if (energyToCapacityPercent < 50) {

		if (maxSpawnedCount > 0) {
			maxSpawnedCount--;
		}
	}

	measureMemory.totalEnergyCount = 0;
	measureMemory.totalEnergy = 0;

	return maxSpawnedCount;
}

dropPointStrategy.measureCreepsSpawnRule = function(spawnRoomName, creepsSpawnRule) {

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
		setCanRecalculate(creepsSpawnRule);
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

function setCanRecalculate(creepsSpawnRule) {

	var currentDropHarvesterCount = _.reduce(Game.creeps, (count, creep) => {

		if (creep.room.name === creepsSpawnRule.roomName && creep.memory.type === "dropHarvester") {
			count++
		}

		return count;
	}, 0);
	
	var spawnOrderMaxSpawnedCount = _.find(creepsSpawnRule.spawnOrderMaxSpawnedCounts, element => Object.keys(element)[0] === "dropHarvester");
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