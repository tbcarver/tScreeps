
var findTools = require("../tools/findTools");
var spawnTools = require("../tools/spawnTools");
var creepConstructors = require("./creepsConstructors");
var creepsSpawnRules = require("./creepsSpawnRules");
var bodyPartsFactory = require("./bodies/bodyPartsFactory");

var customCreepSpawner = {};

customCreepSpawner.spawnCreep = function(roomsCurrentSpawnedCounts) {

	for (creepsSpawnRule of creepsSpawnRules) {

		var room = Game.rooms[creepsSpawnRule.roomName];
		var spawn = room.spawn;
		var currentSpawnedCounts = roomsCurrentSpawnedCounts[room];

		if (!spawn.spawning && room.energyAvailable >= 300) {

			debug.primary(`${spawn.name} spawn chance ${room.energyAvailable}`);

			var spawnResult = {
				waitForSpawn: false,
				spawned: false
			};

			for (orderMaxSpawnedCount of creepsSpawnRule.orderMaxSpawnedCounts) {

				var creepType = Object.keys(orderMaxSpawnCount)[0];
				var creepConstructor = creepConstructors[creepType];
				var maxSpawnedCount = orderMaxSpawnedCount[creepType];
				var currentSpawnedCount = currentSpawnedCounts[creepType];

				if (currentSpawnedCount < maxSpawnedCount) {
					spawnResult = trySpawnCreep(room, spawn, creepConstructor, creepsSpawnRule, currentSpawnedCount, spawnResult);
				}
			}

			for (remoteRoom of remoteRooms) {
				
				var room = Game.rooms[remoteRoom.roomName];
				currentSpawnedCounts = currentSpawnedCounts[room];

				for (orderMaxSpawnedCount of remoteRoom.creepsSpawnRule.orderMaxSpawnedCounts) {
	
					var creepType = Object.keys(orderMaxSpawnCount)[0];
					var creepConstructor = creepConstructors[creepType];
					var maxSpawnedCount = orderMaxSpawnedCount[creepType];
					var currentSpawnedCount = currentSpawnedCounts[creepType];
	
					if (currentSpawnedCount < maxSpawnedCount) {
						spawnResult = trySpawnCreep(room, spawn, creepConstructor, creepsSpawnRule, currentSpawnedCount, spawnResult);
					}
				}
			}
		}
	}
}

function trySpawnCreep(room, spawn, creepConstructor, creepsSpawnRule, currentSpawnedCount, previousSpawnResult) {

	if (!previousSpawnResult.waitForSpawn && !previousSpawnResult.spawned) {

		var creepMemory = creepConstructor.initializeSpawnCreepMemory(room, creepsSpawnRule, currentSpawnedCount);

		if (creepMemory) {

			creepMemory.spawnedRoomName = spawn.room.name;

			if (room.name != spawn.room.name) {
				creepMemory.state = "movingToRemoteRoom";
				creepMemory.remoteRoomName = room.name;
			}

			var spawnResult = spawnCreep(creepMemory);

			if (spawnResult && spawnResult.waitForSpawn) {
				previousSpawnResult.waitForSpawn = spawnResult.waitForSpawn;
			}

			if (spawnResult && spawnResult.spawned) {
				previousSpawnResult.spawned = spawnResult.spawned;
			}
		}
	}

	return previousSpawnResult;
}

function spawnCreep(creepMemory) {

	var spawnResult = {
		waitForSpawn: false,
		spawned: false
	};

	var spawnCapacity = spawnTools.calculateSpawnCapacity();

	if (creepMemory.minimumSpawnCapacity && spawnCapacity < creepMemory.minimumSpawnCapacity) {

		spawnResult.waitForSpawn = true;

	} else {

		if (creepMemory.maximumSpawnCapacity && spawnCapacity > creepMemory.maximumSpawnCapacity) {

			spawnCapacity = creepMemory.maximumSpawnCapacity;
		}

		var id = getNextCreepId();
		var bodyParts = bodyPartsFactory.getBodyParts(creepMemory.bodyPartsType, spawnCapacity);

		var result = spawn.spawnCreep(bodyParts, id, {
			memory: creepMemory,
			energyStructures: findTools.findAllEnergyStructures()
		});

		if (result === OK) {

			spawnResult.spawned = true;
			debug.highlight(`${creepMemory.type} spawning: ${id} cost: ${spawnTools.calculateBodyCost(bodyParts)}
					memory:`, creepMemory);

		} else if (ERR_NOT_ENOUGH_ENERGY && creepMemory.waitForSpawn) {

			spawnResult.waitForSpawn = true;

		} else {

			debug.warning(`${creepMemory.type} did not spawn: ${result}`);
		}
	}

	return spawnResult;
}

function getNextCreepId() {

	if (!Memory.state.nextCreepId) {

		Memory.state.nextCreepId = 1;
	}

	var nextCreepId = parseInt(Memory.state.nextCreepId);
	nextCreepId++

	Memory.state.nextCreepId = nextCreepId;

	return nextCreepId;
}


module.exports = customCreepSpawner;