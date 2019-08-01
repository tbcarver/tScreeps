
var gameTools = require("../../../tools/gameTools");
var calculatedSpawnRulesTools = require("../calculatedSpawnRulesTools");
var builderRule = require("./builderRule");
var controllerRule = require("./controllerRule");
var extensionEnergizerRule = require("./extensionEnergizerRule");
var spawnEnergizerRule = require("./spawnEnergizerRule");
var storageTransferRule = require("./storageTransferRule");
var upgradeControllerRule = require("./upgradeControllerRule");

// NOTE: Order is important. Because of prepended rules.
var calculatedSpawnRules = {
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

	for (var calculatedSpawnRuleName in calculatedSpawnRules) {

		var calculatedSpawnRule = calculatedSpawnRules[calculatedSpawnRuleName];
		var builtCalculatedCreepsSpawnRules  = Memory.state.builtCalculatedCreepsSpawnRules[calculatedSpawnRuleName];

		if (!builtCalculatedCreepsSpawnRules || gameTools.hasCoolOffed(calculatedSpawnRuleName, calculatedSpawnRule.coolOffCount)) {

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