
var roomTools = require("../../../tools/roomTools");
var sumBy = require("lodash/sumBy");

var dropPointStrategy = {
	coolOffCount: 300,
};

dropPointStrategy.buildCreepsSpawnRule = function(spawnRoomName, remoteRoomName, creepsSpawnRule) {

	var creepsSpawnRule;
	var room = Game.rooms[remoteRoomName];
	if (room) {
		var dropFlag = Game.flags[`drop-${remoteRoomName}`];
		if (dropFlag) {

			var remoteReserverCount = !room.controller.my ? 1 : 0;
			var dropHarvesterCount = getDropHarvesterCount(room, creepsSpawnRule);
			var remoteSpawnedDropTransfererCount = spawnRoomName !== remoteRoomName ? 5 : 0;

			creepsSpawnRule = {
				roomName: remoteRoomName,
				spawnOrderMaxSpawnedCounts: [
					{ remoteReserver: remoteReserverCount },
					{ dropHarvester: dropHarvesterCount },
					{ storageTransferer: 3 },
					{ remoteSpawnedStorageTransferer: remoteSpawnedDropTransfererCount },
				],
				partsPerMove: 1,
				canRemoteStorageTransferersPickup: true,
				canStorageTransferersPickup: true,
				measure: {
					droppedEnergy: {

						totalEnergyCount: 0,
						totalEnergy: 0
					},
					harvestedEnergy: {

						totalEnergyCount: 0,
						totalEnergy: 0
					},
				},
			}
		} else {
			debug.danger(`dropPointStrategy drop flag ${dropFlag} not found for ${remoteRoomName}`);
		}
	} else {
		debug.danger(`dropPointStrategy room not found for ${remoteRoomName}`);
	}

	return creepsSpawnRule;
}

dropPointStrategy.recalculateCreepsSpawnRule = function(spawnRoomName, creepsSpawnRule) {

	var room = Game.rooms[creepsSpawnRule.roomName];
	var spawnOrderMaxSpawnedCount = _.find(creepsSpawnRule.spawnOrderMaxSpawnedCounts, element => Object.keys(element)[0] === "dropHarvester");
	spawnOrderMaxSpawnedCount["dropHarvester"] = getDropHarvesterCount(room, creepsSpawnRule);

	recalculateEnergy(spawnRoomName, creepsSpawnRule, "remoteSpawnedStorageTransferer", creepsSpawnRule.measure.droppedEnergy);
	recalculateEnergy(spawnRoomName, creepsSpawnRule, "storageTransferer", creepsSpawnRule.measure.harvestedEnergy);
}

function recalculateEnergy(spawnRoomName, creepsSpawnRule, creepType, measureMemory) {

	if (creepType === "storageTransferer" || spawnRoomName !== creepsSpawnRule.roomName) {

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
		var spawnOrderMaxSpawnedCount = _.find(creepsSpawnRule.spawnOrderMaxSpawnedCounts, element => Object.keys(element)[0] === creepType);

		if (energyToCapacityPercent > averageCarryCapacity * 2) {

			if (spawnOrderMaxSpawnedCount[creepType] < roomTools.getSpawnsCount(spawnRoomName) * 10) {

				var additionalCreepsCount = Math.floor(energyToCapacityPercent / averageCarryCapacity);

				if (additionalCreepsCount > 5) {
					spawnOrderMaxSpawnedCount[creepType]++;
					spawnOrderMaxSpawnedCount[creepType]++;
				} else {
					spawnOrderMaxSpawnedCount[creepType]++;
				}
			}
		} else if (energyToCapacityPercent < 50) {


			if (spawnOrderMaxSpawnedCount[creepType] > 0) {
				spawnOrderMaxSpawnedCount[creepType]--;
			}
		}

		// Limit transferers when approaching max storage
		var storageStats = roomTools.getStorageStats(spawnRoomName);

		if (storageStats.hasStorage && storageStats.percentageStoredEnergy >= 95) {

			var limit = (creepType === "remoteSpawnedStorageTransferer") ? 5 : 1;

			if (spawnOrderMaxSpawnedCount[creepType] > limit) {
				spawnOrderMaxSpawnedCount[creepType] = limit;
			}
		}

		measureMemory.totalEnergyCount = 0;
		measureMemory.totalEnergy = 0;
	}
}

dropPointStrategy.measureCreepsSpawnRule = function(spawnRoomName, creepsSpawnRule) {

	var room = Game.rooms[creepsSpawnRule.roomName];
	if (room) {
		var dropFlag = Game.flags[`drop-${creepsSpawnRule.roomName}`];
		if (dropFlag) {

			if (spawnRoomName !== creepsSpawnRule.roomName) {
				measureEnergy(room, dropFlag, creepsSpawnRule.measure.droppedEnergy, true);
			}
			measureEnergy(room, dropFlag, creepsSpawnRule.measure.harvestedEnergy, false);

		} else {
			debug.danger(`dropPointStrategy drop flag ${dropFlag} not found for ${creepsSpawnRule.roomName}`);
		}

	} else {
		debug.warning(`dropPointStrategy room not found for ${creepsSpawnRule.roomName}`);
	}
}

function measureEnergy(room, dropFlag, measureMemory, isInRangeToDropFlag) {

	var resources = room.find(FIND_DROPPED_RESOURCES, {
		filter: resource => resource.energy && isInRangeToDropFlag ? dropFlag.pos.inRangeTo(resource, 3) : !dropFlag.pos.inRangeTo(resource, 3)
	});

	var totalEnergy = sumBy(resources, "energy");

	measureMemory.totalEnergyCount++;
	measureMemory.totalEnergy += totalEnergy;
}

dropPointStrategy.canApplyRule = function(spawnRoomName, remoteRoomName) {

	var canApplyRule = false;
	var storageStats = roomTools.getStorageStats(spawnRoomName);

	if (!storageStats.hasStorage || storageStats.percentageStoredEnergy < 99) {
		canApplyRule = true;
	}

	return canApplyRule;
}

function getDropHarvesterCount(room, creepsSpawnRule) {
	
	var dropHarvesterCount = 0;
	var creepsPerResource = (room.energyCapacityAvailable >= 400) ? 2 : 3;

	if (creepsSpawnRule.partsPerMove === 1) {
		creepsPerResource = (room.energyCapacityAvailable >= 450) ? 2 : 3;
	}

	var resources = room.find(FIND_SOURCES);

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