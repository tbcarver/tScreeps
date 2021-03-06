
var { rules } = require("../rules/rules");
var sumBy = require("lodash/sumBy");

var roomTools = {};

var adjacentDifferentials = [
	{ x: -1, y: -1 },
	{ x: -1, y: 0 },
	{ x: -1, y: 1 },
	{ x: 0, y: -1 },
	{ x: 0, y: 1 },
	{ x: 1, y: -1 },
	{ x: 1, y: 0 },
	{ x: 1, y: 1 },
];

// From @Screeps/backend/lib/utils.js
roomTools.roomNameFromXY = function(x, y) {
	if (x < 0) {
		x = 'W' + (-x - 1);
	}
	else {
		x = 'E' + (x);
	}
	if (y < 0) {
		y = 'N' + (-y - 1);
	}
	else {
		y = 'S' + (y);
	}
	return "" + x + y;
}

// From @Screeps/backend/lib/utils.js
roomTools.roomNameToXY = function(name) {
	var [match, hor, x, ver, y] = name.match(/^(\w)(\d+)(\w)(\d+)$/);
	if (hor == 'W') {
		x = -x - 1;
	}
	else {
		x = +x;
		//x--;
	}
	if (ver == 'N') {
		y = -y - 1;
	}
	else {
		y = +y;
		//y--;
	}
	return [x, y];
}

roomTools.getAdjacentRoomNames = function(roomName) {

	var adjacentRoomNames = [];
	var roomXY = this.roomNameToXY(roomName);

	for (var adjacentDifferential of adjacentDifferentials) {

		var adjacentX = roomXY[0] + adjacentDifferential.x;
		var adjacentY = roomXY[1] + adjacentDifferential.y;
		var adjacentRoomName = this.roomNameFromXY(adjacentX, adjacentY);

		adjacentRoomNames.push(adjacentRoomName);
	}

	return adjacentRoomNames;
}

roomTools.isDropContainer = function(container, range) {

	range = range || 1;
	var isDropContainer = false;
	var sources = container.room.find(FIND_SOURCES);

	for (var source of sources) {

		if (source.pos.inRangeTo(container, range)) {

			isDropContainer = true;
			break;
		}
	}

	return isDropContainer;
}

roomTools.createFlag = function(name, colorConstant, positions) {

	if (positions.length > 0) {

		for (var index in positions) {

			var position = new RoomPosition(positions[index].x, positions[index].y, positions[index].roomName);
			var result = Game.rooms[positions[index].roomName].createFlag(position, name, colorConstant);
			debug.highlight(`flag created: ${result} ${name} ${colorConstant}`);
		}
	}
}

roomTools.addObservingRoom = function(roomName) {

	if (!Memory.state.observingRooms) {
		Memory.state.observingRooms = {};
	}

	Memory.state.observingRooms[roomName] = null;
}

roomTools.removeObservingRoom = function(roomName) {

	if (!Memory.state.observingRooms) {
		Memory.state.observingRooms = {};
	}

	delete Memory.state.observingRooms[roomName];
}

roomTools.observeRoom = function(roomName, observerRoomName) {

	var observers = /** @type {StructureObserver[]} */ (Game.rooms[observerRoomName].find(FIND_STRUCTURES, {
		filter: {
			structureType: STRUCTURE_OBSERVER
		}
	}));

	if (observers.length > 0) {

		var result = observers[0].observeRoom(roomName);

		if (result !== OK) {
			debug.warning(`Observe room ${roomName} from observer ${observerRoomName} failed: ${result}`);
		}
	} else {
		debug.warning(`Observer not found in room ${observerRoomName}`);
	}
}


roomTools.initialize = function() {

	// NOTE: Order is important.

	if (!Memory.state.roomTools) {
		Memory.state.roomTools = {};
	}

	var myRooms = _.filter(Game.rooms, room => room.controller && room.controller.my);

	this.buildControllerStats(myRooms);
	this.buildSourcesStats();
	this.buildDroppedStats();
	this.buildSpawnStats();
	this.buildExtensionStats(myRooms);
	this.buildTowerStats(myRooms);
	this.buildStorageStats();
	this.buildContainerStats(myRooms);
	this.buildConstructionSitesStats(myRooms);

	var ignoreObjects = [];

	for (var flagName in Game.flags) {

		if (_.startsWith(flagName, "drop")) {
			ignoreObjects.push(Game.flags[flagName]);
		}
	}

	this.avoidCostCallback = function(roomName, costMatrix) {
		for (var ignoreObject of ignoreObjects) {
			costMatrix.set(ignoreObject.pos.x, ignoreObject.pos.y, 255);
		};
	};
}

roomTools.buildControllerStats = function(myRooms) {

	this.controllerStats = {
		controllersCount: myRooms.length,
		controllers: [],
		highestProgressPercentage: 0,
	};

	if (!_.isEmpty(myRooms)) {

		var highestController = myRooms[0].controller;

		for (var room of myRooms) {

			this.controllerStats.controllers.push(room.controller);

			if (room.controller.level <= 7 && room.controller.level >= highestController.level) {

				if (room.controller.level === highestController.level) {

					if (room.controller.progress > highestController.progress) {
						highestController = room.controller;
					}
				} else {
					highestController = room.controller;
				}
			}
		}

		this.controllerStats.highestProgressPercentage = Math.floor(highestController.progress / highestController.progressTotal * 100);
	}
}

roomTools.getControllersCount = function() {
	return this.controllerStats.controllersCount;
}

roomTools.getControllers = function() {
	return this.controllerStats.controllers;
}

roomTools.hasMyController = function(roomName) {
	return (Game.rooms[roomName] && Game.rooms[roomName].controller && Game.rooms[roomName].controller.my);
}

roomTools.getHighestProgressPercentage = function() {
	return this.controllerStats.highestProgressPercentage;
}

roomTools.buildSourcesStats = function() {

	this.sourcesStats = {};

	for (var roomName in Game.rooms) {

		this.sourcesStats[roomName] = {};
		this.sourcesStats[roomName].sources = Game.rooms[roomName].find(FIND_SOURCES);
	}
}

roomTools.getSourcesStats = function(roomName) {

	return this.sourcesStats[roomName];
}

roomTools.getSources = function(roomName) {

	return this.sourcesStats[roomName].sources;
}

roomTools.buildDroppedStats = function() {

	this.roomsDroppedStats = {};
	var totalDroppedEnergy = 0;

	for (var roomName in Game.rooms) {

		var dropFlag = this.getDropFlag(roomName);
		var sources = this.getSources(roomName);
		var resources = /** @type {ResourceWritable[]} */ (Game.rooms[roomName].find(FIND_DROPPED_RESOURCES));

		var droppedEnergy = 0;
		var dropFlagDroppedEnergy = 0;
		var dropFlagDroppedResources = /** @type {ResourceWritable[]} */ ([]);
		var sourcesDroppedEnergy = 0;
		var sourcesDroppedResources = /** @type {ResourceWritable[]} */ ([]);
		var sourceDroppedResources = {};

		for (var resource of resources) {

			resource.writableAmount = resource.amount;
			droppedEnergy += resource.amount;

			if (dropFlag && resource.pos.inRangeTo(dropFlag, 0)) {

				dropFlagDroppedEnergy += resource.amount;
				dropFlagDroppedResources.push(resource);

			} else {

				for (var source of sources) {
					if (resource.pos.inRangeTo(source, 1)) {

						sourcesDroppedEnergy += resource.amount;
						sourcesDroppedResources.push(resource);

						if (!sourceDroppedResources[source.id]) {
							sourceDroppedResources[source.id] = {
								droppedEnergy: 0,
								droppedResources: /** @type {ResourceWritable[]} */ ([]),
							}
						}

						sourceDroppedResources[source.id].droppedEnergy += resource.amount;
						sourceDroppedResources[source.id].droppedResources.push(resource);
					}
				}
			}
		}

		this.roomsDroppedStats[roomName] = {
			droppedEnergy: droppedEnergy,
			droppedResources: resources,
			dropFlagDroppedEnergy: dropFlagDroppedEnergy,
			dropFlagDroppedResources: dropFlagDroppedResources,
			sourcesDroppedEnergy: sourcesDroppedEnergy,
			sourcesDroppedResources: sourcesDroppedResources,
			sourceDroppedResources: sourceDroppedResources,
		};

		totalDroppedEnergy += droppedEnergy;
	}

	this.roomsDroppedStats.totalDroppedEnergy = totalDroppedEnergy;
}

roomTools.getDroppedEnergy = function(roomName) {

	return (this.roomsDroppedStats[roomName]) ? this.roomsDroppedStats[roomName].droppedEnergy : 0;
}

roomTools.hasMinimumDropFlagDroppedEnergy = function(roomName) {

	return (this.roomsDroppedStats[roomName] && this.roomsDroppedStats[roomName].dropFlagDroppedEnergy > 1000);
}

roomTools.getDropFlagDroppedEnergy = function(roomName) {

	return (this.roomsDroppedStats[roomName]) ? this.roomsDroppedStats[roomName].dropFlagDroppedEnergy : 0;
}

roomTools.getTotalDroppedEnergy = function() {

	return this.roomsDroppedStats.totalDroppedEnergy;
}

roomTools.GetWritableDroppedResources = function(roomName) {

	return this.roomsDroppedStats[roomName].droppedResources;
}

roomTools.GetDropFlagWritableDroppedResources = function(roomName) {

	return this.roomsDroppedStats[roomName].dropFlagDroppedResources;
}

roomTools.GetSourcesWritableDroppedResources = function(roomName) {

	return this.roomsDroppedStats[roomName].sourcesDroppedResources;
}

roomTools.GetSourceWritableDroppedResources = function(roomName, sourceId) {

	var droppedResources = /** @type {ResourceWritable[]} */ ([]);

	if (this.roomsDroppedStats[roomName].sourceDroppedResources[sourceId]) {
		droppedResources = this.roomsDroppedStats[roomName].sourceDroppedResources[sourceId].droppedResources;
	}

	return droppedResources;
}

roomTools.buildSpawnStats = function() {

	this.spawnStats = {
		rooms: {},
	};

	for (var spawnName in Game.spawns) {

		var spawn = Game.spawns[spawnName];

		if (!this.spawnStats.rooms[spawn.room.name]) {
			this.spawnStats.rooms[spawn.room.name] = {
				spawnsCount: 0,
				spawns: [],
				spawn: null,
				areSpawnsFullEnergy: true,
			};
		}

		this.spawnStats.rooms[spawn.room.name].spawnsCount++;
		this.spawnStats.rooms[spawn.room.name].spawns.push(spawn);
		this.spawnStats.rooms[spawn.room.name].spawn = spawn;

		if (spawn.energy < spawn.energyCapacity) {
			this.spawnStats.rooms[spawn.room.name].areSpawnsFullEnergy = false;
		}
	}
}

roomTools.getSpawnsCount = function(roomName) {

	return (this.spawnStats.rooms[roomName]) ? this.spawnStats.rooms[roomName].spawnsCount : 0;
}

roomTools.getSpawns = function(roomName) {

	return (this.spawnStats.rooms[roomName]) ? this.spawnStats.rooms[roomName].spawns : [];
}

roomTools.hasSpawns = function(roomName) {

	return (this.spawnStats.rooms[roomName]) ? !_.isEmpty(this.spawnStats.rooms[roomName].spawns) : false;
}

roomTools.getSpawn = function(roomName) {

	return (this.spawnStats.rooms[roomName]) ? this.spawnStats.rooms[roomName].spawn : null;
}

roomTools.areSpawnsFullEnergy = function(roomName) {

	return (this.spawnStats.rooms[roomName]) ? this.spawnStats.rooms[roomName].areSpawnsFullEnergy : false;
}

roomTools.buildExtensionStats = function(myRooms) {

	this.extensionStats = {
		rooms: {},
	};

	for (var room of myRooms) {

		var roomName = room.name;
		if (!this.extensionStats.rooms[roomName]) {
			this.extensionStats.rooms[roomName] = {
				extensionsCount: 0,
				extensions: [],
			};
		}

		var extensions = /** @type {StructureExtension[]} */ (room.find(FIND_STRUCTURES, {
			filter: structure => structure.structureType === STRUCTURE_EXTENSION
		}));

		for (var extension of extensions) {

			this.extensionStats.rooms[roomName].extensionsCount++;
			this.extensionStats.rooms[roomName].extensions.push(extension);
		}
	}
}

roomTools.getExtensionsCount = function(roomName) {

	return (this.extensionStats.rooms[roomName]) ? this.extensionStats.rooms[roomName].extensionsCount : 0;
}

roomTools.getExtensions = function(roomName) {

	return (this.extensionStats.rooms[roomName]) ? this.extensionStats.rooms[roomName].extensions : [];
}

roomTools.buildTowerStats = function(myRooms) {

	this.towerStats = {
		rooms: {},
	};

	for (var room of myRooms) {

		var roomName = room.name;
		if (!this.towerStats.rooms[roomName]) {
			this.towerStats.rooms[roomName] = {
				towersCount: 0,
				towers: [],
				areTowersFullEnergy: true,
				areTowersLowEnergy: false,
			};
		}

		var towers = /** @type {StructureTower[]} */ (room.find(FIND_STRUCTURES, {
			filter: structure => structure.structureType === STRUCTURE_TOWER
		}));

		for (var tower of towers) {

			this.towerStats.rooms[roomName].towersCount++;
			this.towerStats.rooms[roomName].towers.push(tower);

			if (tower.energy < tower.energyCapacity) {
				this.towerStats.rooms[roomName].areTowersFullEnergy = false;

				if (tower.energyCapacity / tower.energy < .80) {
					this.towerStats.rooms[roomName].areTowersLowEnergy = true;
				}
			}
		}
	}
}

roomTools.getTowersCount = function(roomName) {

	return (this.towerStats.rooms[roomName]) ? this.towerStats.rooms[roomName].towersCount : 0;
}

roomTools.getTowers = function(roomName) {

	return (this.towerStats.rooms[roomName]) ? this.towerStats.rooms[roomName].towers : [];
}

roomTools.areTowersFullEnergy = function(roomName) {

	return (this.towerStats.rooms[roomName]) ? this.towerStats.rooms[roomName].areTowersFullEnergy : false;
}

roomTools.areTowersLowEnergy = function(roomName) {

	return (this.towerStats.rooms[roomName]) ? this.towerStats.rooms[roomName].areTowersLowEnergy : false;
}

roomTools.buildStorageStats = function(myRooms) {

	this.roomsStorageStats = {};
	var totalStoredEnergy = 0;
	var totalStorageCapacity = 0;

	for (var roomName in Game.rooms) {

		var hasStorage = false;
		var storedEnergy = 0;
		var storageCapacity = 0;
		var percentageStoredEnergy = 0;

		var storages = /** @type {StructureStorage[] | StructureTerminal[]} */ (Game.rooms[roomName].find(FIND_STRUCTURES, {
			filter: structure => structure.structureType === STRUCTURE_STORAGE ||
				structure.structureType === STRUCTURE_TERMINAL
		}));

		if (storages.length > 0) {
			for (var storage of storages) {
				storedEnergy += storage.store.energy;
				storageCapacity += storage.storeCapacity;
			}

			percentageStoredEnergy = storedEnergy / storageCapacity * 100;
			hasStorage = true;
		}

		this.roomsStorageStats[roomName] = {
			hasStorage: hasStorage,
			storedEnergy: storedEnergy,
			percentageStoredEnergy: percentageStoredEnergy,
		};

		totalStoredEnergy += storedEnergy;
		totalStorageCapacity += storageCapacity;
	}

	this.roomsStorageStats.totalStoredEnergy = totalStoredEnergy;
	this.roomsStorageStats.totalPercentageStoredEnergy = totalStoredEnergy / totalStorageCapacity * 100 || 0;

	return percentageStoredEnergy;
}

roomTools.getStorageStats = function(roomName) {

	return this.roomsStorageStats[roomName];
}

roomTools.hasStorage = function(roomName) {

	return (this.roomsStorageStats[roomName]) ? this.roomsStorageStats[roomName].hasStorage : false;
}

roomTools.hasMinimumStoredEnergy = function(roomName) {

	return (this.roomsStorageStats[roomName] && this.roomsStorageStats[roomName].percentageStoredEnergy > .5);
}

roomTools.hasMinimumStorageCapacity = function(roomName) {

	return (this.roomsStorageStats[roomName] && this.roomsStorageStats[roomName].hasStorage && this.roomsStorageStats[roomName].percentageStoredEnergy < 98);
}

roomTools.getStoredEnergy = function(roomName) {

	return (this.roomsStorageStats[roomName]) ? this.roomsStorageStats[roomName].storedEnergy : 0;
}

roomTools.getPercentageStoredEnergy = function(roomName) {

	return (this.roomsStorageStats[roomName]) ? this.roomsStorageStats[roomName].percentageStoredEnergy : 0;
}

roomTools.getTotalStoredEnergy = function() {

	return this.roomsStorageStats.totalStoredEnergy;
}

roomTools.getTotalPercentageStoredEnergy = function() {

	return this.roomsStorageStats.totalPercentageStoredEnergy;
}

roomTools.buildContainerStats = function(myRooms) {

	this.roomsContainerStats = {};
	var totalContainedEnergy = 0;

	for (var room of myRooms) {

		var sources = this.getSources(room.name);
		var containers = /** @type {StructureContainerWritable[]} */ room.find(FIND_STRUCTURES, {
			filter: { structureType: STRUCTURE_CONTAINER }
		});

		var sourcesDropContainers = {};

		for (var container of containers) {

			container.writableAmount = container.store.energy;

			for (var source of sources) {
				if (container.pos.inRangeTo(source, 1)) {

					if (!sourcesDropContainers[source.id]) {
						sourcesDropContainers[source.id] = {
							containedEnergy: 0,
							dropContainers: /** @type {StructureContainerWritable[]} */ ([]),
						}
					}

					sourcesDropContainers[source.id].containedEnergy += container.writableAmount;
					sourcesDropContainers[source.id].dropContainers.push(container);
				}
			}

			totalContainedEnergy += container.store.energy;
		}

		this.roomsContainerStats[room.name] = {
			sourcesDropContainers: sourcesDropContainers,
		};
	}

	this.roomsContainerStats.totalContainedEnergy = totalContainedEnergy;
}

roomTools.getTotalContainedEnergy = function(roomName, sourceId) {

	return this.roomsContainerStats.totalContainedEnergy;
}

roomTools.getSourcesWritableDropContainers = function(roomName, sourceId) {

	var dropContainers = /** @type {StructureContainerWritable[]} */ ([]);

	if (this.roomsContainerStats[roomName] && this.roomsContainerStats[roomName].sourcesDropContainers[sourceId]) {
		dropContainers = this.roomsContainerStats[roomName].sourcesDropContainers[sourceId].dropContainers;
	}

	return dropContainers;
}

roomTools.buildConstructionSitesStats = function(myRooms) {

	this.constructionSitesStats = {};

	for (var room of myRooms) {

		var constructionCost = room.find(FIND_CONSTRUCTION_SITES).reduce((cost, constructionSite) =>
			cost += constructionSite.progressTotal - constructionSite.progress, 0);

		this.constructionSitesStats[room.name] = {
			constructionCost: constructionCost,
		};
	}
}

roomTools.hasConstructionSites = function(roomName) {

	return (this.constructionSitesStats[roomName] && this.constructionSitesStats[roomName].constructionCost > 0);
}

roomTools.getConstructionSitesStats = function(roomName) {

	return this.constructionSitesStats[roomName];
}

roomTools.getAvoidCostCallback = function() {
	return this.avoidCostCallback;
}

roomTools.isPlainTerrain = function(x, y, roomName) {

	var isPlainTerrain = false;

	var objects = Game.rooms[roomName].lookForAt(LOOK_TERRAIN, x, y);
	if (objects.length != 1) {
		throw new Error(`One terrain object not found in room ${roomName} at position ${x},${y}`);
	}

	if (objects[0] === "plain") {
		isPlainTerrain = true;
	}

	return isPlainTerrain;
}

roomTools.isOccupiedByCreep = function(x, y, roomName) {

	var objects = Game.rooms[roomName].lookForAt(LOOK_CREEPS, x, y);

	return (objects.length > 0);
}

roomTools.inRangeToAny = function(pos, targets, range) {

	var isInRangeToAny = false;

	for (var target of targets) {
		if (pos.inRangeTo(target, range)) {
			isInRangeToAny = true;
			break;
		}
	}

	return isInRangeToAny;
}

roomTools.getCountResourceHarvestPositions = function(resourceId) {

	if (!Memory.state.roomTools.getCountResourceHarvestPositions) {
		Memory.state.roomTools.getCountResourceHarvestPositions = {};
	}

	var countResourceHarvestPositions = 0;

	if (Memory.state.roomTools.getCountResourceHarvestPositions[resourceId]) {

		countResourceHarvestPositions = Memory.state.roomTools.getCountResourceHarvestPositions[resourceId]

	} else {

		var resource = Game.getObjectById(resourceId);
		var area = resource.room.lookAtArea(resource.pos.y - 1, resource.pos.x - 1, resource.pos.y + 1, resource.pos.x + 1, true);

		countResourceHarvestPositions = area.reduce((countOfPlain, element) => {

			if (element.terrain) {
				if (element.terrain === "plain") {
					countOfPlain++
				}
			}

			return countOfPlain;

		}, 0);

		Memory.state.roomTools.getCountResourceHarvestPositions[resourceId] = countResourceHarvestPositions;
	}

	return countResourceHarvestPositions;
}

roomTools.getCountControllerUpgradePositionsOneDeep = function(controller) {

	if (!Memory.state.roomTools.getCountControllerUpgradePositionsOneDeep) {
		Memory.state.roomTools.getCountControllerUpgradePositionsOneDeep = {};
	}

	var countControllerUpgradePositions = 0;

	if (Memory.state.roomTools.getCountControllerUpgradePositionsOneDeep[controller.id]) {

		countControllerUpgradePositions = Memory.state.roomTools.getCountControllerUpgradePositionsOneDeep[controller.id]

	} else {

		var differentialStart = 3;

		for (var xDifferential = -1 * differentialStart; xDifferential <= differentialStart; xDifferential++) {

			if (roomTools.isPlainTerrain(controller.pos.x + xDifferential, controller.pos.y - differentialStart, controller.room.name)) {
				countControllerUpgradePositions++;
			}

			if (roomTools.isPlainTerrain(controller.pos.x + xDifferential, controller.pos.y + differentialStart, controller.room.name)) {
				countControllerUpgradePositions++;
			}
		}

		for (var yDifferential = -1 * differentialStart + 1; yDifferential <= differentialStart - 1; yDifferential++) {

			if (roomTools.isPlainTerrain(controller.pos.x - differentialStart, controller.pos.y + yDifferential, controller.room.name)) {
				countControllerUpgradePositions++;
			}

			if (roomTools.isPlainTerrain(controller.pos.x + differentialStart, controller.pos.y + yDifferential, controller.room.name)) {
				countControllerUpgradePositions++;
			}
		}

		Memory.state.roomTools.getCountControllerUpgradePositionsOneDeep[controller.id] = countControllerUpgradePositions;
	}

	return countControllerUpgradePositions;
}

roomTools.getCountControllerUpgradePositionsTwoDeep = function(controller) {

	if (!Memory.state.roomTools.getCountControllerUpgradePositionsTwoDeep) {
		Memory.state.roomTools.getCountControllerUpgradePositionsTwoDeep = {};
	}

	var countControllerUpgradePositions = 0;

	if (Memory.state.roomTools.getCountControllerUpgradePositionsTwoDeep[controller.id]) {

		countControllerUpgradePositions = Memory.state.roomTools.getCountControllerUpgradePositionsTwoDeep[controller.id]

	} else {

		for (var differentialStart = 2; differentialStart <= 3; differentialStart++) {

			for (var xDifferential = -1 * differentialStart; xDifferential <= differentialStart; xDifferential++) {

				if (roomTools.isPlainTerrain(controller.pos.x + xDifferential, controller.pos.y - differentialStart, controller.room.name)) {
					countControllerUpgradePositions++;
				}

				if (roomTools.isPlainTerrain(controller.pos.x + xDifferential, controller.pos.y + differentialStart, controller.room.name)) {
					countControllerUpgradePositions++;
				}
			}

			for (var yDifferential = -1 * differentialStart + 1; yDifferential <= differentialStart - 1; yDifferential++) {

				if (roomTools.isPlainTerrain(controller.pos.x - differentialStart, controller.pos.y + yDifferential, controller.room.name)) {
					countControllerUpgradePositions++;
				}

				if (roomTools.isPlainTerrain(controller.pos.x + differentialStart, controller.pos.y + yDifferential, controller.room.name)) {
					countControllerUpgradePositions++;
				}
			}
		}

		Memory.state.roomTools.getCountControllerUpgradePositionsTwoDeep[controller.id] = countControllerUpgradePositions;
	}

	return countControllerUpgradePositions;
}

roomTools.getControllerPositionsWithinEnergizingRange = function(controller) {

	if (!Memory.state.roomTools.getControllerPositionsWithinEnergizingRange) {
		Memory.state.roomTools.getControllerPositionsWithinEnergizingRange = {};
	}

	var controllerPositionsWithinEnergizingRange = [];

	if (Memory.state.roomTools.getControllerPositionsWithinEnergizingRange[controller.id]) {

		controllerPositionsWithinEnergizingRange = Memory.state.roomTools.getControllerPositionsWithinEnergizingRange[controller.id]

	} else {

		var x = controller.pos.x;
		var y = controller.pos.y;

		var objects = controller.room.lookAtArea(y - 2, x - 2, y + 2, x + 2, true);
		objects = objects.filter(object => object.type === "terrain");
		objects = objects.map(object => {
			return {
				x: object.x,
				y: object.y,
			};
		});

		controllerPositionsWithinEnergizingRange = objects;
		Memory.state.roomTools.getControllerPositionsWithinEnergizingRange[controller.id] = controllerPositionsWithinEnergizingRange;
	}

	return controllerPositionsWithinEnergizingRange;
}

roomTools.getDropFlag = function(roomName) {

	return Game.flags[`drop-${roomName}`];
}

roomTools.hasDropFlag = function(roomName) {

	return (Game.flags[`drop-${roomName}`]) ? true : false;
}

// roomTools.lookAt = function() {

// 	var positions =

// 		[{ "x": "24", "y": "7", "roomName": "W6S0" }]

// 	if (positions.length > 0) {

// 		for (var index in positions) {

// 			var position = new RoomPosition(positions[index].x, positions[index].y, positions[index].roomName);

// 			var looked = room.lookAt(position);
// 			// var looked = room.lookAt(positions[index]);
// 			// var looked = room.lookAt(spawn);
// 			// var looked = room.lookAt(15, 15);
// 			// debug.danger(positions[index]);
// 			debug.primary(looked);
// 		}
// 	}
// }

roomTools.consoleEnemies = function() {

	for (var index in Game.rooms) {

		var room = Game.rooms[index];

		const enemies = room.find(FIND_HOSTILE_CREEPS);

		if (enemies.length > 0) {

			var health = "";

			for (var enemy of enemies) {

				health += enemy.hits + " " + Math.ceil((enemy.hits / enemy.hitsMax) * 100) + "% " +
					enemy.ticksToLive + " ";
			}

			debug.danger(room.name + " Enemies!", health);
		}
	}
}


module.exports = roomTools;