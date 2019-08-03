
var creepsSpawnRuleTools = {};

creepsSpawnRuleTools.buildCreepsSpawnRuleKey = function(spawnRoomName, remoteRoomName, ruleName) {

	return `${spawnRoomName}-${remoteRoomName}-${ruleName}`;
}


module.exports = creepsSpawnRuleTools;