
var creepsStore = require("./creepsStore");
var { creepsSpawnRules } = require("./creepsRules");

var creepsController = {};

creepsController.tick = function() {

	var creepsStatistics = {};

	for (var index in Game.creeps) {

		var creep = Game.creeps[index];

		if (creep.ticksToLive === 0) {

			creepsStore.remove(creep);

		} else {
		
			// creepsStatus.count[creep.memory.type]

			switch (creep.memory.type) {

				case "harvester":
					harvester.act(creep);
					break;
			}
		}
	}

	// this.spawnHarvesters(creepsStatistics.harvesters, creepsSpawnRules.harvesters);
}

creepsController.spawnHarvesters = function(harvestersStatistics, harvestersSpawnRules) {

	for (var resourceTypeName in harvestersSpawnRules) {

		var resourceType = harvestersSpawnRules[resourceTypeName];

		for (var targetStuctureName in resourceType) {

			var harvesterCount = resourceTypes[targetStuctureName];

			if (harvestersStatistics[resourceTypeName][targetStuctureName] < harvesterCount) {

				var id = creepsStore.getNextCreepId();

				harvester.spawn(id, resourceTypeName, targetStuctureName);
			}
		}
	}
}


module.exports = creepsController;