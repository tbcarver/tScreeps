
var Builder = require("./energyWorkers/builder");
var ContainerHarvester = require("./harvesters/containerHarverster");
var ControllerEnergizer = require("./energizers/controllerEnergizer");
var Defender = require("./troopers/defender");
var DropContainerHarvester = require("./harvesters/dropContainerHarvester");
var ExtensionEnergizer = require("./energizers/extensionEnergizer");
var RemoteBuilder = require("./energyWorkers/remoteBuilder");
var RemoteClaimer = require("./troopers/remoteClaimer");
var RemoteReserver = require("./troopers/remoteReserver");
var RemoteSitter = require("./troopers/remoteSitter");
var RemoteSpawnedHarvester = require("./harvesters/remoteSpawnedHarvester");
var RemoteSpawnedStorageEnergizer = require("./energizers/remoteSpawnedStorageEnergizer");
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
	remoteReserver: RemoteReserver,
	remoteSitter: RemoteSitter,
	remoteSpawnedHarvester: RemoteSpawnedHarvester,
	remoteSpawnedStorageEnergizer: RemoteSpawnedStorageEnergizer,
	remoteStorageEnergizer: RemoteStorageEnergizer,
	repairer: Repairer,
	spawnEnergizer: SpawnEnergizer,
	storageEnergizer: StorageEnergizer,
	wallRepairer: WallRepairer
};


module.exports = creepConstructors;