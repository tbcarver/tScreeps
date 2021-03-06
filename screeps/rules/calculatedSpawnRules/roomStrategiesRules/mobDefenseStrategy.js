
var roomTools = require("../../../tools/roomTools");
var sumBy = require("lodash/sumBy");

var mobDefenseStrategy = {
	coolOffCount: 300,
};

mobDefenseStrategy.buildCreepsSpawnRule = function(spawnRoomName, remoteRoomName, spawnCreepsSpawnRule, creepsSpawnRuleKey) {

	var attackerCount = 4;
	var healer = 2;
	var rangedAttacker = 1;

	if (Game.rooms[spawnRoomName].energyCapacityAvailable >= 700) {
		attackerCount = 2;
		healer = 2;
		rangedAttacker = 1;
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

mobDefenseStrategy.recalculateCreepsSpawnRule = function(spawnRoomName, remoteRoomCreepsSpawnRule, creepsSpawnRule) {
}

mobDefenseStrategy.measureCreepsSpawnRule = function(spawnRoomName, remoteRoomCreepsSpawnRule, creepsSpawnRule) {
}

mobDefenseStrategy.canApplyRule = function() {
	return true;
}


module.exports = mobDefenseStrategy;