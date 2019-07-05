
var roomTools = require("../../../tools/roomTools");
var sumBy = require("lodash/sumBy");

var harvestToDropPointStrategy = {
	coolOffCount: 25,
};

harvestToDropPointStrategy.buildCreepsSpawnRule = function(remoteRoomName) {

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
		debug.warning(`harvestToDropPointStrategy room not found for ${remoteRoomName}`);
	}

	return creepsSpawnRule;
}

harvestToDropPointStrategy.recalculateCreepsSpawnRule = function(creepsSpawnRule) {

	var room = Game.rooms[creepsSpawnRule.roomName];
	if (room) {

		var resources = room.find(FIND_DROPPED_RESOURCES, {
			filter: resource => resource.energy
		});

		var totalEnergy = sumBy(resources, "energy");

		var carryCapacities = _.reduce(Memory.creeps, (carryCapacities, creepMemory, creepName) => {

			if (creepMemory.type === "remoteSpawnedDropTransferer" && creepMemory.remoteRoomName === creepsSpawnRule.roomName) {

				carryCapacities.creepsCount++;
				carryCapacities.totalCarryCapacity += Game.creeps[creepName].carryCapacity;
			}

			return carryCapacities;
		}, { creepsCount: 0, totalCarryCapacity: 0 });

		var averageCarryCapacity = Math.floor(carryCapacities.totalCarryCapacity / carryCapacities.creepsCount);
		var averageEnergy = Math.floor(creepsSpawnRule.measure.totalEnergy / creepsSpawnRule.measure.totalEnergyCount);
		var percent = Math.floor(averageEnergy / averageCarryCapacity * 100);

		debug.temp(room.name, averageEnergy, averageCarryCapacity, percent);
		
		creepsSpawnRule.measure.totalEnergyCount = 0;
		creepsSpawnRule.measure.totalEnergy = 0;

	} else {
		debug.warning(`harvestToDropPointStrategy room not found for ${remoteRoomName}`);
	}
}

harvestToDropPointStrategy.measureCreepsSpawnRule = function(creepsSpawnRule) {

	var room = Game.rooms[creepsSpawnRule.roomName];
	if (room) {

		var resources = room.find(FIND_DROPPED_RESOURCES, {
			filter: resource => resource.energy
		});

		var totalEnergy = sumBy(resources, "energy");

		creepsSpawnRule.measure.totalEnergyCount++;
		creepsSpawnRule.measure.totalEnergy += totalEnergy;

	} else {
		debug.warning(`harvestToDropPointStrategy room not found for ${remoteRoomName}`);
	}
}


module.exports = harvestToDropPointStrategy;