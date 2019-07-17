
var roomTools = require("../../../tools/roomTools");
var SpawnOrderMaxSpawnedCount = require("../../../rules/spawnOrderMaxSpawnedCount");
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

		var remoteReserverCount = !room.controller.my ? 1 : 0;
		var remoteSpawnedDropTransfererCount = spawnRoomName !== remoteRoomName ? 5 : 0;

		creepsSpawnRule = {
			roomName: remoteRoomName,
			spawnOrderMaxSpawnedCounts: [
				{ remoteReserver: remoteReserverCount },
				{ dropHarvester: dropHarvesterCount },
				{ remoteSpawnedDropTransferer: remoteSpawnedDropTransfererCount },
			],
			partsPerMove: 1,
			canRemoteStorageTransferersPickup: true,
			measure: {
				totalEnergyCount: 0,
				totalEnergy: 0
			},
		}
	} else {
		debug.danger(`harvestToDropPointStrategy: room not found for ${remoteRoomName}`);
	}

	return creepsSpawnRule;
}

harvestToDropPointStrategy.recalculateCreepsSpawnRule = function(spawnRoomName, creepsSpawnRule) {

	if (spawnRoomName !== creepsSpawnRule.roomName) {

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
		var spawnOrderMaxSpawnedCount = SpawnOrderMaxSpawnedCount.find(creepsSpawnRule.spawnOrderMaxSpawnedCounts, "remoteSpawnedDropTransferer");

		if (energyToCapacityPercent > averageCarryCapacity * 2.5) {

			if (spawnOrderMaxSpawnedCount["remoteSpawnedDropTransferer"] < roomTools.getSpawnsCount(spawnRoomName) * 6) {

				var additionalCreepsCount = Math.floor(energyToCapacityPercent / averageCarryCapacity);

				if (additionalCreepsCount > 5) {
					spawnOrderMaxSpawnedCount["remoteSpawnedDropTransferer"] += 2;
				} else {
					spawnOrderMaxSpawnedCount["remoteSpawnedDropTransferer"]++;
				}
			}
		} else if (energyToCapacityPercent < 25) {

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
}

harvestToDropPointStrategy.measureCreepsSpawnRule = function(spawnRoomName, creepsSpawnRule) {

	if (spawnRoomName !== creepsSpawnRule.roomName) {

		var room = Game.rooms[creepsSpawnRule.roomName];
		if (room) {

			var resources = roomTools.GetSourcesWritableDroppedResources(room.name);

			var totalEnergy = sumBy(resources, "energy");

			creepsSpawnRule.measure.totalEnergyCount++;
			creepsSpawnRule.measure.totalEnergy += totalEnergy;

		} else {
			debug.warning(`harvestToDropPointStrategy: room not found for ${creepsSpawnRule.roomName}`);
		}
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