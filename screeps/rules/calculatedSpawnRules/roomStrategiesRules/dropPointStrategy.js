
var roomTools = require("../../../tools/roomTools");
var sumBy = require("lodash/sumBy");

var dropPointStrategy = {
	coolOffCount: 300,
};

dropPointStrategy.buildCreepsSpawnRule = function(remoteRoomName) {

	var creepsSpawnRule;
	var room = Game.rooms[remoteRoomName];
	if (room) {
		var dropFlag = Game.flags[`drop-${remoteRoomName}`];
		if (dropFlag) {

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
					{ storageTransferer: 3 },
					{ remoteSpawnedStorageTransferer: 8 },
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

dropPointStrategy.recalculateCreepsSpawnRule = function(creepsSpawnRule) {

	recalculateEnergy(creepsSpawnRule, "remoteSpawnedStorageTransferer", creepsSpawnRule.measure.droppedEnergy);
	recalculateEnergy(creepsSpawnRule, "storageTransferer", creepsSpawnRule.measure.harvestedEnergy);
}

function recalculateEnergy(creepsSpawnRule, creepType, measureMemory) {

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

	if (energyToCapacityPercent > averageCarryCapacity * 2) {

		var spawnOrderMaxSpawnedCount = _.find(creepsSpawnRule.spawnOrderMaxSpawnedCounts, creepType);
		var additionalCreepsCount = Math.floor(energyToCapacityPercent / averageCarryCapacity);

		if (additionalCreepsCount > 10) {
			additionalCreepsCount = 10;
		}

		if (spawnOrderMaxSpawnedCount[creepType] < 20) {
			spawnOrderMaxSpawnedCount[creepType] += additionalCreepsCount;
		}

	} else if (energyToCapacityPercent < 25) {

		var spawnOrderMaxSpawnedCount = _.find(creepsSpawnRule.spawnOrderMaxSpawnedCounts, creepType);

		if (spawnOrderMaxSpawnedCount[creepType] > 0) {
			spawnOrderMaxSpawnedCount[creepType]--;
		}
	}

	measureMemory.totalEnergyCount = 0;
	measureMemory.totalEnergy = 0;
}

dropPointStrategy.measureCreepsSpawnRule = function(creepsSpawnRule) {

	var room = Game.rooms[creepsSpawnRule.roomName];
	if (room) {
		var dropFlag = Game.flags[`drop-${creepsSpawnRule.roomName}`];
		if (dropFlag) {

			measureEnergy(room, dropFlag, creepsSpawnRule.measure.droppedEnergy, true);
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

module.exports = dropPointStrategy;