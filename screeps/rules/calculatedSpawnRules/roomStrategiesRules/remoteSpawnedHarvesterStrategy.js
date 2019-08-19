
var roomTools = require("../../../tools/roomTools");
var sumBy = require("lodash/sumBy");

var remoteSpawnedHarvesterStrategy = {
	coolOffCount: 300,
};

remoteSpawnedHarvesterStrategy.buildCreepsSpawnRule = function(spawnRoomName, remoteRoomName, spawnCreepsSpawnRule, creepsSpawnRuleKey) {

	var attackerCount = 4;
	var healer = 3;
	var rangedAttacker = 0;

	if (Game.rooms[spawnRoomName].energyCapacityAvailable >= 700) {
		attackerCount = 3;
		healer = 2;
		rangedAttacker = 0;
	}

	var creepsSpawnRule = {
		creepsSpawnRuleKey: creepsSpawnRuleKey,
		roomName: remoteRoomName,
		spawnOrderMaxSpawnedCounts: [
			{ attacker: attackerCount },
			{ healer: healer },
			{ rangedAttacker: rangedAttacker },
		],
		partsPerMove: 1,
		isMobTroopers: true,
	}

	return creepsSpawnRule;
}

remoteSpawnedHarvesterStrategy.recalculateCreepsSpawnRule = function(spawnRoomName, remoteRoomCreepsSpawnRule, creepsSpawnRule) {
}

remoteSpawnedHarvesterStrategy.measureCreepsSpawnRule = function(spawnRoomName, remoteRoomCreepsSpawnRule, creepsSpawnRule) {
}

remoteSpawnedHarvesterStrategy.canApplyRule = function() {
	return true;
}

remoteSpawnedHarvesterStrategy.getHarvesterCount = function(spawnRoom, remoteRoom, creepsSpawnRule) {

	var harvesterCount = 0;
	var creepsPerResource = (spawnRoom.energyCapacityAvailable >= 400) ? 3 : 4;

	if (creepsSpawnRule.partsPerMove === 1) {
		creepsPerResource = (spawnRoom.energyCapacityAvailable >= 550) ? 3 : 4;
	}

	var resources = roomTools.getSources(remoteRoom.name);

	for (var resource of resources) {

		var creepsCount = roomTools.getCountResourceHarvestPositions(resource.id);
		creepsCount++;

		if (creepsCount > creepsPerResource) {
			creepsCount = creepsPerResource;
		}

		harvesterCount += creepsCount;
	}

	return harvesterCount;
}


module.exports = remoteSpawnedHarvesterStrategy;