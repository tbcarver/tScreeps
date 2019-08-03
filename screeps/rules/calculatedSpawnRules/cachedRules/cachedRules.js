
var gameTools = require("../../../tools/gameTools");
var calculatedSpawnRulesTools = require("../calculatedSpawnRulesTools");
var builderRule = require("./builderRule");
var controllerRule = require("./controllerRule");
var extensionEnergizerRule = require("./extensionEnergizerRule");
var spawnEnergizerRule = require("./spawnEnergizerRule");
var storageTransferRule = require("./storageTransferRule");
var upgradeControllerRule = require("./upgradeControllerRule");

// NOTE: Order is important. Because of prepended rules.
var cachedRules = {
	upgradeControllerRule: upgradeControllerRule,
	storageTransferRule: storageTransferRule,
	builderRule: builderRule,
	controllerRule: controllerRule,
	extensionEnergizerRule: extensionEnergizerRule,
	spawnEnergizerRule: spawnEnergizerRule,
}

function addCalculatedSpawnRules(creepsSpawnRules) {

	if (!Memory.state.builtCalculatedCreepsSpawnRules) {
		Memory.state.builtCalculatedCreepsSpawnRules = {};
	}

	for (var cachedRuleName in cachedRules) {

		var calculatedSpawnRule = cachedRules[cachedRuleName];
		var builtCalculatedCreepsSpawnRules  = Memory.state.builtCalculatedCreepsSpawnRules[cachedRuleName];

		if (!builtCalculatedCreepsSpawnRules || gameTools.hasCoolOffed(cachedRuleName, calculatedSpawnRule.coolOffCount)) {

			builtCalculatedCreepsSpawnRules = calculatedSpawnRule.buildCreepsSpawnRules(creepsSpawnRules, cachedRuleName);
			Memory.state.builtCalculatedCreepsSpawnRules[cachedRuleName] = builtCalculatedCreepsSpawnRules;
		}
	
		if (calculatedSpawnRule.prepend) {
			calculatedSpawnRulesTools.prependRemoteRoomCreepsSpawnRules(creepsSpawnRules, builtCalculatedCreepsSpawnRules);
		} else {
			calculatedSpawnRulesTools.appendRemoteRoomCreepsSpawnRules(creepsSpawnRules, builtCalculatedCreepsSpawnRules);
		}
	}
}


module.exports = addCalculatedSpawnRules;