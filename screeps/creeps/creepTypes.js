
var Builder = require("./energyWorkers/builder");
var ContainerHarvester = require("./harvesters/containerHarverster");
var ControllerEnergizer = require("./energizers/controllerEnergizer");
var Defender = require("./troopers/defender");
var DropContainerHarvester = require("./harvesters/dropContainerHarvester");
var ExtensionEnergizer = require("./energizers/extensionEnergizer");
var RemoteBuilder = require("./energyWorkers/remoteBuilder");
var RemoteHarvester = require("./harvesters/remoteHarvester");
var Repairer = require("./energyWorkers/repairer");
var SpawnEnergizer = require("./energizers/spawnEnergizer");
var StorageEnergizer = require("./energizers/storageEnergizer");
var WallRepairer = require("./energyWorkers/wallRepairer");

var creepConstructors = {	
	builder: Builder,
	containerHarvester: ContainerHarvester,
	controllerEnergizer: ControllerEnergizer,
	defender: Defender,
	dropContainerHarvester: DropContainerHarvester,
	extensionEnergizer: ExtensionEnergizer,
	remoteBuilder: RemoteBuilder,
	remoteHarvester: RemoteHarvester,
	repairer: Repairer,
	spawnEnergizer: SpawnEnergizer,
	storageEnergizer: StorageEnergizer,
	wallRepairer: WallRepairer
};

var creepTypeNames = [
	"builder",
	"containerHarvester",
	"controllerEnergizer",
	"defender",
	"dropContainerHarvester",
	"extensionEnergizer",
	"remoteBuilder",
	"remoteHarvester",
	"repairer",
	"spawnEnergizer",
	"storageEnergizer",
	"wallRepairer"
];


module.exports.creepConstructors = creepConstructors;
module.exports.creepTypeNames = creepTypeNames;