
var calculatedSpawnRulesTools = {};

calculatedSpawnRulesTools.prependRemoteRoomCreepsSpawnRules = function(creepsSpawnRules, spawnRoomsRemoteRoomCreepsSpawnRules) {

	for (var spawnRoomName in spawnRoomsRemoteRoomCreepsSpawnRules) {

		var spawnRoom = _.find(creepsSpawnRules, { roomName: spawnRoomName });

		for (var remoteRoom of spawnRoomsRemoteRoomCreepsSpawnRules[spawnRoomName].remoteRooms) {

			spawnRoom.remoteRooms.unshift(remoteRoom);
		}
	}
}

calculatedSpawnRulesTools.hasCoolOffed = function(calculatedSpawnRuleName, coolOffCount) {

	var hasCoolOffed = false;

	if (!Memory.state.calculatedSpawnRulesCoolOffs) {
		Memory.state.calculatedSpawnRulesCoolOffs = {};
	}

	if (!Memory.state.calculatedSpawnRulesCoolOffs[calculatedSpawnRuleName]) {

		Memory.state.calculatedSpawnRulesCoolOffs[calculatedSpawnRuleName] = Game.time;

	} else if (Game.time - Memory.state.calculatedSpawnRulesCoolOffs[calculatedSpawnRuleName] > coolOffCount) {

		hasCoolOffed = true;
		Memory.state.calculatedSpawnRulesCoolOffs[calculatedSpawnRuleName] = Game.time;
	}

	debug.temp(calculatedSpawnRuleName, coolOffCount, hasCoolOffed);

	return hasCoolOffed;
}


module.exports = calculatedSpawnRulesTools;