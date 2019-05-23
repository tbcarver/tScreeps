
var findTools = require("../tools/findTools");
var spawnTools = require("../tools/spawnTools");
var creepConstructors = require("./creepsConstructors");
var creepsSpawnRules = require("./creepsSpawnRules");
var bodyPartsFactory = require("./bodies/bodyPartsFactory");

var creepsSpawner = {};

creepsSpawner.spawnCreep = function(roomsCurrentSpawnedCounts) {

	for (creepsSpawnRule of creepsSpawnRules) {

		var room = Game.rooms[creepsSpawnRule.roomName];

		if (!room) {
			throw new Error(`Spawn rule room name not found in Game.rooms`);
		}

		var spawns = room.find(FIND_MY_SPAWNS);

		if (spawns.length > 0) {
			for (var spawn of spawns) {

				var currentSpawnedCounts = roomsCurrentSpawnedCounts[room.name];

				if (!spawn.spawning && room.energyAvailable >= 300) {

					debug.primary(`${spawn.name} spawn chance ${room.energyAvailable}`);

					var spawnResult = {
						waitForSpawn: false,
						spawned: false
					};

					for (spawnOrderMaxSpawnedCount of creepsSpawnRule.spawnOrderMaxSpawnedCounts) {

						var creepType = Object.keys(spawnOrderMaxSpawnedCount)[0];
						var creepConstructor = creepConstructors[creepType];
						var maxSpawnedCount = spawnOrderMaxSpawnedCount[creepType];
						var currentSpawnedCount = (currentSpawnedCounts) ? currentSpawnedCounts[creepType] || 0 : 0;

						if (currentSpawnedCount < maxSpawnedCount) {
							spawnResult = trySpawnCreep(room, spawn, creepConstructor, creepsSpawnRule, currentSpawnedCount, spawnResult);
						}
					}

					for (remoteRoomCreepsSpawnRule of creepsSpawnRule.remoteRooms) {

						var room = Game.rooms[remoteRoomCreepsSpawnRule.roomName];

						if (!room) {
							room = {
								name: remoteRoomCreepsSpawnRule.roomName
							};
						}

						if (currentSpawnedCounts && currentSpawnedCounts.remoteRooms) {
							currentSpawnedCounts = currentSpawnedCounts.remoteRooms[room.name];
						} else {
							currentSpawnedCounts = undefined;
						}

						for (spawnOrderMaxSpawnedCount of remoteRoomCreepsSpawnRule.spawnOrderMaxSpawnedCounts) {

							var creepType = Object.keys(spawnOrderMaxSpawnedCount)[0];
							var creepConstructor = creepConstructors[creepType];
							var maxSpawnedCount = spawnOrderMaxSpawnedCount[creepType];
							var currentSpawnedCount = (currentSpawnedCounts) ? currentSpawnedCounts[creepType] || 0 : 0;

							if (currentSpawnedCount < maxSpawnedCount) {
								spawnResult = trySpawnCreep(room, spawn, creepConstructor, creepsSpawnRule, currentSpawnedCount, spawnResult);
							}
						}
					}
				}
			}
		}
	}
}

function trySpawnCreep(room, spawn, creepConstructor, creepsSpawnRule, currentSpawnedCount, previousSpawnResult) {

	if (!previousSpawnResult.waitForSpawn && !previousSpawnResult.spawned) {

		var creepMemory = creepConstructor.initializeSpawnCreepMemory(room, spawn, creepsSpawnRule, currentSpawnedCount);

		if (creepMemory) {

			creepMemory.spawnedRoomName = spawn.room.name;

			if (room.name != spawn.room.name) {
				creepMemory.state = "movingToRemoteRoom";
				creepMemory.remoteRoomName = room.name;
			}

			var spawnResult = spawnCreep(spawn, creepMemory);

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

function spawnCreep(spawn, creepMemory) {

	var spawnResult = {
		waitForSpawn: false,
		spawned: false
	};

	var spawnCapacity = spawnTools.calculateSpawnCapacity(spawn);

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
			energyStructures: findTools.findAllEnergyStructures(spawn)
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


module.exports = creepsSpawner;