
var Attacker = require("./troopers/attacker");
var Builder = require("./energyWorkers/builder");
var ContainerHarvester = require("./harvesters/containerHarvester");
var ControllerEnergizer = require("./energizers/controllerEnergizer");
var Decoy = require("./troopers/decoy");
var Defender = require("./troopers/defender");
var DropContainerHarvester = require("./harvesters/dropContainerHarvester");
var DropHarvester = require("./harvesters/dropHarvester");
var ExtensionEnergizer = require("./energizers/extensionEnergizer");
var Healer = require("./troopers/healer");
var RangedAttacker = require("./troopers/rangedAttacker");
var StructureRazer = require("./troopers/structureRazer");
var RemoteBuilder = require("./energyWorkers/remoteBuilder");
var RemoteClaimer = require("./controllers/remoteClaimer");
var RemoteControllerAttacker = require("./controllers/remoteControllerAttacker");
var RemoteReserver = require("./controllers/remoteReserver");
var RemoteSitter = require("./controllers/remoteSitter");
var RemoteSpawnedDropTransferer = require("./transferers/remoteSpawnedDropTransferer");
var RemoteSpawnedHarvester = require("./harvesters/remoteSpawnedHarvester");
var RemoteSpawnedStorageTransferer = require("./transferers/remoteSpawnedStorageTransferer");
var RemoteStorageTransferer = require("./transferers/remoteStorageTransferer");
var Repairer = require("./energyWorkers/repairer");
var SpawnEnergizer = require("./energizers/spawnEnergizer");
var StorageTransferer = require("./transferers/storageTransferer");
var StructureAttacker = require("./troopers/structureAttacker");
var WallRepairer = require("./energyWorkers/wallRepairer");

var creepConstructors = {
	attacker: Attacker,
	builder: Builder,
	containerHarvester: ContainerHarvester,
	controllerEnergizer: ControllerEnergizer,
	decoy: Decoy,
	defender: Defender,
	dropContainerHarvester: DropContainerHarvester,
	dropHarvester: DropHarvester,
	extensionEnergizer: ExtensionEnergizer,
	healer: Healer,
	rangedAttacker: RangedAttacker,
	structureRazer: StructureRazer,
	remoteBuilder: RemoteBuilder,
	remoteClaimer: RemoteClaimer,
	remoteControllerAttacker: RemoteControllerAttacker,
	remoteReserver: RemoteReserver,
	remoteSitter: RemoteSitter,
	remoteSpawnedDropTransferer: RemoteSpawnedDropTransferer,
	remoteSpawnedHarvester: RemoteSpawnedHarvester,
	remoteSpawnedStorageTransferer: RemoteSpawnedStorageTransferer,
	remoteStorageTransferer: RemoteStorageTransferer,
	repairer: Repairer,
	spawnEnergizer: SpawnEnergizer,
	storageTransferer: StorageTransferer,
	structureAttacker: StructureAttacker,
	wallRepairer: WallRepairer
};


module.exports = creepConstructors;