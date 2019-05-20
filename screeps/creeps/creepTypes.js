
var Builder = require("./energyWorkers/builder");
var ContainerHarvester = require("./harvesters/containerHarverster");
var ControllerEnergizer = require("./energizers/controllerEnergizer");
var Defender = require("./troopers/defender");
var DropContainerHarvester = require("./harvesters/dropContainerHarvester");
var ExtensionEnergizer = require("./energizers/extensionEnergizer");
var RemoteHarvester = require("./harvesters/remoteHarvester");
var Repairer = require("./energyWorkers/repairer");
var SpawnEnergizer = require("./energizers/spawnEnergizer");
var WallRepairer = require("./energyWorkers/wallRepairer");

var creepConstructors = {	
	builder: Builder,
	containerHarvester: ContainerHarvester,
	controllerEnergizer: ControllerEnergizer,
	defender: Defender,
	dropContainerHarvester: DropContainerHarvester,
	extensionEnergizer: ExtensionEnergizer,
	remoteHarvester: RemoteHarvester,
	repairer: Repairer,
	spawnEnergizer: SpawnEnergizer,
	wallRepairer: WallRepairer
};

var creepTypeNames = [
	"builder",
	"containerHarvester",
	"controllerEnergizer",
	"defender",
	"dropContainerHarvester",
	"extensionEnergizer",
	"remoteHarvester",
	"repairer",
	"spawnEnergizer",
	"wallRepairer"
];


module.exports.creepConstructors = creepConstructors;
module.exports.creepTypeNames = creepTypeNames;