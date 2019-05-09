
var Builder = require("./energyWorkers/builder");
var ContainerHarvester = require("./harvesters/containerHarverster");
var ControllerEnergizer = require("./energizers/controllerEnergizer");
var DropContainerHarvester = require("./harvesters/dropContainerHarvester");
var ExtensionEnergizer = require("./energizers/extensionEnergizer");
var Repairer = require("./energyWorkers/repairer");
var SpawnEnergizer = require("./energizers/spawnEnergizer");
var WallRepairer = require("./energyWorkers/wallRepairer");

var customCreepFactory = {};

customCreepFactory.buildCreep = function(creep, creepsStatistics) {

	var customCreep;

	// NOTE: This should remain a switch instead of a hashtable to allow for easy suicide and
	//  logging of particular creep types.

	switch (creep.memory.type) {

		case "builder":

			customCreep = new Builder(creep);
			creepsStatistics.builders++;
			break;

		case "containerHarvester":

			customCreep = new ContainerHarvester(creep);
			creepsStatistics.containerHarvesters++;
			break;

		case "controllerEnergizer":

			customCreep = new ControllerEnergizer(creep);
			creepsStatistics.controllerEnergizers++;
			break;

		// case "defender":

		// 	customCreep = new Defender(creep);
		// 	creepsStatistics.defenders++;
		// 	break;

		case "dropContainerHarvester":

			customCreep = new DropContainerHarvester(creep);
			creepsStatistics.dropContainerHarvesters++;
			break;

		case "extensionEnergizer":

			// creep.suicide();
			// debug.temp("creep:", creep)
			// debug.temp("creep memory:", creep.memory)
			customCreep = new ExtensionEnergizer(creep);
			creepsStatistics.extensionEnergizers++;
			break;

		case "repairer":

			// debug.temp("creep:", creep)
			// debug.temp("creep memory:", creep.memory)
			customCreep = new Repairer(creep);
			creepsStatistics.repairers++;
			break;

		case "spawnEnergizer":

			customCreep = new SpawnEnergizer(creep);
			creepsStatistics.spawnEnergizers++;
			break;

		case "wallRepairer":

			customCreep = new WallRepairer(creep);
			creepsStatistics.wallRepairers++;
			break;
	}

	return customCreep;
}


module.exports = customCreepFactory;