
var roomTools = require("../../../tools/roomTools");
var sumBy = require("lodash/sumBy");

var mobDefenseStrategy = {
	coolOffCount: 0,
};

mobDefenseStrategy.buildCreepsSpawnRule = function(spawnRoomName, remoteRoomName) {

	var creepsSpawnRule = {
		roomName: remoteRoomName,
		spawnOrderMaxSpawnedCounts: [
			{ attacker: 3 },
			{ healer: 3 },
			{ rangedAttacker: 1 },
		],
		partsPerMove: 1,
		isMobTroopers: true,
	}

	return creepsSpawnRule;
}

mobDefenseStrategy.recalculateCreepsSpawnRule = function(spawnRoomName, creepsSpawnRule) {
}

mobDefenseStrategy.measureCreepsSpawnRule = function(spawnRoomName, creepsSpawnRule) {
}

mobDefenseStrategy.canApplyRule = function() {
	return true;
}


module.exports = mobDefenseStrategy;