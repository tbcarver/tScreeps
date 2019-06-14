
var Builder = require("./energyWorkers/builder");
var ContainerHarvester = require("./harvesters/containerHarverster");
var ControllerEnergizer = require("./energizers/controllerEnergizer");
var DropContainerHarvester = require("./harvesters/dropContainerHarvester");
var DropHarvester = require("./harvesters/dropHarvester");
var ExtensionEnergizer = require("./energizers/extensionEnergizer");
var RangedAttacker = require("./troopers/rangedAttacker");
var RemoteBuilder = require("./energyWorkers/remoteBuilder");
var RemoteClaimer = require("./troopers/remoteClaimer");
var RemoteReserver = require("./troopers/remoteReserver");
var RemoteSitter = require("./troopers/remoteSitter");
var RemoteSpawnedHarvester = require("./harvesters/remoteSpawnedHarvester");
var RemoteSpawnedStorageEnergizer = require("./transfers/remoteSpawnedStorageEnergizer");
var RemoteStorageEnergizer = require("./transfers/remoteStorageEnergizer");
var Repairer = require("./energyWorkers/repairer");
var SpawnEnergizer = require("./energizers/spawnEnergizer");
var StorageEnergizer = require("./transfers/storageEnergizer");
var WallRepairer = require("./energyWorkers/wallRepairer");

var creepConstructors = {	
	builder: Builder,
	containerHarvester: ContainerHarvester,
	controllerEnergizer: ControllerEnergizer,
	dropContainerHarvester: DropContainerHarvester,
	dropHarvester: DropHarvester,
	extensionEnergizer: ExtensionEnergizer,
	rangedAttacker: RangedAttacker,
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