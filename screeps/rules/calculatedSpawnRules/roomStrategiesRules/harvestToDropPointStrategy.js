
var roomTools = require("../../../tools/roomTools");
var sumBy = require("lodash/sumBy");

var harvestToDropPointStrategy = {
	coolOffCount: 300,
};

harvestToDropPointStrategy.buildCreepsSpawnRule = function(spawnRoomName, remoteRoomName) {

	var creepsSpawnRule;
	var room = Game.rooms[remoteRoomName];
	if (room) {

		var dropHarvesterCount = 0;

		var resources = room.find(FIND_SOURCES);

		for (var resource of resources) {
			if (roomTools.getCountResourceHarvestPositions(resource.id) >= 2) {
				dropHarvesterCount += 2;
			} else {
				dropHarvesterCount++;
			}
		}

		creepsSpawnRule = {
			roomName: remoteRoomName,
			spawnOrderMaxSpawnedCounts: [
				{ remoteReserver: 1 },
				{ dropHarvester: dropHarvesterCount },
				{ remoteSpawnedDropTransferer: 5 },
			],
			partsPerMove: 1,
			canRemoteStorageTransferersPickup: true,
			measure: {
				totalEnergyCount: 0,
				totalEnergy: 0
			},
		}
	} else {
		debug.danger(`harvestToDropPointStrategy room not found for ${remoteRoomName}`);
	}

	return creepsSpawnRule;
}

harvestToDropPointStrategy.recalculateCreepsSpawnRule = function(spawnRoomName, creepsSpawnRule) {

	var carryCapacities = _.reduce(Memory.creeps, (carryCapacities, creepMemory, creepName) => {

		if (creepMemory.type === "remoteSpawnedDropTransferer" && creepMemory.remoteRoomName === creepsSpawnRule.roomName) {

			carryCapacities.creepsCount++;
			carryCapacities.totalCarryCapacity += Game.creeps[creepName].carryCapacity;
		}

		return carryCapacities;
	}, { creepsCount: 0, totalCarryCapacity: 0 });

	var averageCarryCapacity = Math.floor(carryCapacities.totalCarryCapacity / carryCapacities.creepsCount);
	var averageEnergy = Math.floor(creepsSpawnRule.measure.totalEnergy / creepsSpawnRule.measure.totalEnergyCount);
	var energyToCapacityPercent = Math.floor(averageEnergy / averageCarryCapacity * 100);

	if (energyToCapacityPercent > averageCarryCapacity * 2) {

		var spawnOrderMaxSpawnedCount = _.find(creepsSpawnRule.spawnOrderMaxSpawnedCounts,element => Object.keys(element)[0] === "remoteSpawnedDropTransferer");

		if (spawnOrderMaxSpawnedCount["remoteSpawnedDropTransferer"] < roomTools.getSpawnsCount(spawnRoomName) * 6) {

			var additionalCreepsCount = Math.floor(energyToCapacityPercent / averageCarryCapacity);

			if (additionalCreepsCount > 5) {
				spawnOrderMaxSpawnedCount["remoteSpawnedDropTransferer"]++;
				spawnOrderMaxSpawnedCount["remoteSpawnedDropTransferer"]++;
			} else {
				spawnOrderMaxSpawnedCount["remoteSpawnedDropTransferer"]++;
			}
		}
	} else if (energyToCapacityPercent < 50) {

		var spawnOrderMaxSpawnedCount = _.find(creepsSpawnRule.spawnOrderMaxSpawnedCounts, element => Object.keys(element)[0] === "remoteSpawnedDropTransferer");

		if (spawnOrderMaxSpawnedCount["remoteSpawnedDropTransferer"] > 0) {
			spawnOrderMaxSpawnedCount["remoteSpawnedDropTransferer"]--;
		}
	}

	// Limit transferers when approaching max storage
	var storageStats = roomTools.getStorageStats(spawnRoomName);

	if (storageStats.hasStorage && storageStats.percentageStoredEnergy >= 95) {
		if (spawnOrderMaxSpawnedCount["remoteSpawnedDropTransferer"] > 3) {
			spawnOrderMaxSpawnedCount["remoteSpawnedDropTransferer"] = 3;
		}
	}

	creepsSpawnRule.measure.totalEnergyCount = 0;
	creepsSpawnRule.measure.totalEnergy = 0;
}

harvestToDropPointStrategy.measureCreepsSpawnRule = function(spawnRoomName, creepsSpawnRule) {

	var room = Game.rooms[creepsSpawnRule.roomName];
	if (room) {

		var resources = room.find(FIND_DROPPED_RESOURCES, {
			filter: resource => resource.energy
		});

		var totalEnergy = sumBy(resources, "energy");

		creepsSpawnRule.measure.totalEnergyCount++;
		creepsSpawnRule.measure.totalEnergy += totalEnergy;

	} else {
		debug.warning(`harvestToDropPointStrategy room not found for ${creepsSpawnRule.roomName}`);
	}
}

harvestToDropPointStrategy.canApplyRule = function(spawnRoomName, remoteRoomName) {

	var canApplyRule = false;
	var storageStats = roomTools.getStorageStats(spawnRoomName);

	if (!storageStats.hasStorage || storageStats.percentageStoredEnergy < 99) {
		canApplyRule = true;
	}

	return canApplyRule;
}


module.exports = harvestToDropPointStrategy;