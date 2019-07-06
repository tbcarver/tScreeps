
var roomTools = require("../../../tools/roomTools");
var sumBy = require("lodash/sumBy");

var mobDefenseStrategy = {
	coolOffCount: 0,
};

mobDefenseStrategy.buildCreepsSpawnRule = function(remoteRoomName) {

	var creepsSpawnRule = {
		roomName: remoteRoomName,
		spawnOrderMaxSpawnedCounts: [
			{ attacker: 2 },
			{ healer: 3 },
			{ rangedAttacker: 3 },
		],
		partsPerMove: 1,
		isMobTroopers: true,
	}

	return creepsSpawnRule;
}

mobDefenseStrategy.recalculateCreepsSpawnRule = function(creepsSpawnRule) {
}

mobDefenseStrategy.measureCreepsSpawnRule = function(creepsSpawnRule) {
}


module.exports = mobDefenseStrategy;