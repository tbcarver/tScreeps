
var gameTools = require("../../../tools/gameTools");
var calculatedSpawnRulesTools = require("../calculatedSpawnRulesTools");
var builderRule = require("./builderRule");
var controllerRule = require("./controllerRule");
var extensionEnergizerRule = require("./extensionEnergizerRule");
var spawnEnergizerRule = require("./spawnEnergizerRule");
var storageTransferRule = require("./storageTransferRule");
var upgradeControllerRule = require("./upgradeControllerRule");
var sourceMap = require("../../../sourceMap");

// NOTE: Order is important. Because of prepended rules.
var cachedRules = {
	upgradeControllerRule: upgradeControllerRule,
	storageTransferRule: storageTransferRule,
	builderRule: builderRule,
	controllerRule: controllerRule,
	extensionEnergizerRule: extensionEnergizerRule,
	spawnEnergizerRule: spawnEnergizerRule,
}

function addCalculatedSpawnRules(creepsSpawnRules, roomsCurrentSpawnedCounts) {

	try {
		
		if (!Memory.state.cachedCalculatedCreepsSpawnRules) {
			Memory.state.cachedCalculatedCreepsSpawnRules = {};
		}

		for (var cachedRuleName in cachedRules) {

			var calculatedSpawnRule = cachedRules[cachedRuleName];
			var cachedBuiltCalculatedCreepsSpawnRules = Memory.state.cachedCalculatedCreepsSpawnRules[cachedRuleName];

			if (!cachedBuiltCalculatedCreepsSpawnRules || gameTools.hasCoolOffed(cachedRuleName, calculatedSpawnRule.coolOffCount)) {

				Memory.state.cachedCalculatedCreepsSpawnRules[cachedRuleName] = undefined;
				var builtCreepsSpawnRules = calculatedSpawnRule.buildCreepsSpawnRules(creepsSpawnRules, cachedRuleName);

				if (!_.isEmpty(builtCreepsSpawnRules)) {

					Memory.state.cachedCalculatedCreepsSpawnRules[cachedRuleName] = builtCreepsSpawnRules;

				} else if (cachedBuiltCalculatedCreepsSpawnRules) {

					if (calculatedSpawnRulesTools.hasRemoteRoomCurrentSpawnedCounts(cachedBuiltCalculatedCreepsSpawnRules, roomsCurrentSpawnedCounts)) {

						calculatedSpawnRulesTools.zeroRemoteRoomSpawnOrderMaxSpawnedCounts(cachedBuiltCalculatedCreepsSpawnRules);
						Memory.state.cachedCalculatedCreepsSpawnRules[cachedRuleName] = cachedBuiltCalculatedCreepsSpawnRules;
					}
				}

				cachedBuiltCalculatedCreepsSpawnRules = Memory.state.cachedCalculatedCreepsSpawnRules[cachedRuleName];
			}

			if (calculatedSpawnRule.prepend) {
				calculatedSpawnRulesTools.prependRemoteRoomCreepsSpawnRules(creepsSpawnRules, cachedBuiltCalculatedCreepsSpawnRules);
			} else {
				calculatedSpawnRulesTools.appendRemoteRoomCreepsSpawnRules(creepsSpawnRules, cachedBuiltCalculatedCreepsSpawnRules);
			}
		}
	} catch (error) {

		if (error instanceof Error) {

			sourceMap.logStackTrace(error);

		} else {
			throw error;
		}
	}
}


module.exports = addCalculatedSpawnRules;