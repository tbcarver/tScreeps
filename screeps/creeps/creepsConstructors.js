
var Builder = require("./energyWorkers/builder");
var ContainerHarvester = require("./harvesters/containerHarverster");
var ControllerEnergizer = require("./energizers/controllerEnergizer");
var Defender = require("./troopers/defender");
var DropContainerHarvester = require("./harvesters/dropContainerHarvester");
var ExtensionEnergizer = require("./energizers/extensionEnergizer");
var RemoteBuilder = require("./energyWorkers/remoteBuilder");
var RemoteClaimer = require("./troopers/remoteClaimer");
var RemoteHarvester = require("./harvesters/remoteHarvester");
var RemoteReverseStorageEnergizer = require("./energizers/remoteReverseStorageEnergizer");
var RemoteStorageEnergizer = require("./energizers/remoteStorageEnergizer");
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
	remoteClaimer: RemoteClaimer,
	remoteHarvester: RemoteHarvester,
	remoteReverseStorageEnergizer: RemoteReverseStorageEnergizer,
	remoteStorageEnergizer: RemoteStorageEnergizer,
	repairer: Repairer,
	spawnEnergizer: SpawnEnergizer,
	storageEnergizer: StorageEnergizer,
	wallRepairer: WallRepairer
};


module.exports = creepConstructors;