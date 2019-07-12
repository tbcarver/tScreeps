
var gameTools = require("../../tools/gameTools");
var calculatedSpawnRulesTools = require("./calculatedSpawnRulesTools");
var cachedStorageTransferRule = require("./cachedStorageTransferRule");
var upgradeControllerRule = require("./cachedUpgradeControllerRule");

var calculatedSpawnRules = {
	cachedStorageTransferRule: cachedStorageTransferRule,
	upgradeControllerRule: upgradeControllerRule,
}

function addCalculatedSpawnRules(creepsSpawnRules) {

	if (!Memory.state.builtCalculatedCreepsSpawnRules) {
		Memory.state.builtCalculatedCreepsSpawnRules = {};
	}

	for (var calculatedSpawnRuleName in calculatedSpawnRules) {

		var calculatedSpawnRule = calculatedSpawnRules[calculatedSpawnRuleName];
		var builtCalculatedCreepsSpawnRules  = Memory.state.builtCalculatedCreepsSpawnRules[calculatedSpawnRuleName];

		if (!builtCalculatedCreepsSpawnRules || gameTools.hasCoolOffed(builtCalculatedCreepsSpawnRules, calculatedSpawnRule.coolOffCount)) {

			builtCalculatedCreepsSpawnRules = calculatedSpawnRule.buildCreepsSpawnRules(creepsSpawnRules);
			Memory.state.builtCalculatedCreepsSpawnRules[calculatedSpawnRuleName] = builtCalculatedCreepsSpawnRules;
		}
	
		if (calculatedSpawnRule.prepend) {
			calculatedSpawnRulesTools.prependRemoteRoomCreepsSpawnRules(creepsSpawnRules, builtCalculatedCreepsSpawnRules);
		} else {
			calculatedSpawnRulesTools.appendRemoteRoomCreepsSpawnRules(creepsSpawnRules, builtCalculatedCreepsSpawnRules);
		}
	}
}


module.exports = addCalculatedSpawnRules;