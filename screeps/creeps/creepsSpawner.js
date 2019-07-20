
var enemyTools = require("../tools/enemyTools");
var findTools = require("../tools/findTools");
var roomTools = require("../tools/roomTools");
var spawnTools = require("../tools/spawnTools");
var creepConstructors = require("./creepsConstructors");
var { rules, creepsSpawnRules, updateCreepsSpawnRules } = require("../rules/rules");
var calculatedSpawnRules = require("../rules/calculatedSpawnRules/calculatedSpawnRules");
var calculatedSpawnRulesTools = require("../rules/calculatedSpawnRules/calculatedSpawnRulesTools");
var SpawnOrderMaxSpawnedCount = require("../rules/spawnOrderMaxSpawnedCount");
var bodyPartsFactory = require("./bodies/bodyPartsFactory");

var creepsSpawner = {};

creepsSpawner.spawnCreep = function(roomsCurrentSpawnedCounts) {

	var creepsSpawnRulesCopy = _.cloneDeep(creepsSpawnRules);

	calculatedSpawnRules.addCalculatedRules(creepsSpawnRulesCopy, roomsCurrentSpawnedCounts);
	addOneTimeOneCreepSpawnRules(creepsSpawnRulesCopy, roomsCurrentSpawnedCounts);
	updateCreepsSpawnRules(creepsSpawnRulesCopy);

	for (var creepsSpawnRule of creepsSpawnRulesCopy) {

		var room = Game.rooms[creepsSpawnRule.roomName];
		if (room) {

			var spawns = room.find(FIND_MY_SPAWNS);
			if (spawns.length > 0) {
				for (var spawn of spawns) {

					var currentSpawnedCounts = roomsCurrentSpawnedCounts[room.name];

					if (!spawn.spawning && room.energyAvailable >= 300) {

						// debug.primary(`${spawn.room.name} ${spawn.name} spawn chance ${room.energyAvailable}`);

						var spawnResult = {
							waitForSpawn: false,
							spawned: false
						};

						if (creepsSpawnRule.spawnOrderMaxSpawnedCounts) {
							for (spawnOrderMaxSpawnedCount of creepsSpawnRule.spawnOrderMaxSpawnedCounts) {

								var creepTypeKey = SpawnOrderMaxSpawnedCount.getCreepTypeKey(spawnOrderMaxSpawnedCount);
								var creepType = SpawnOrderMaxSpawnedCount.getCreepType(spawnOrderMaxSpawnedCount);
								var creepSubType = SpawnOrderMaxSpawnedCount.getCreepSubType(spawnOrderMaxSpawnedCount);
								var creepConstructor = creepConstructors[creepType];
								var maxSpawnedCount = spawnOrderMaxSpawnedCount[creepType];
								var currentSpawnedCount = (currentSpawnedCounts) ? currentSpawnedCounts[creepTypeKey] || 0 : 0;

								if (currentSpawnedCount < maxSpawnedCount) {

									try {
										spawnResult = trySpawnCreep(room, false, spawn, creepConstructor, creepsSpawnRule, creepsSpawnRule, spawnOrderMaxSpawnedCount, currentSpawnedCount, spawnResult);

										if (spawnResult.spawned) {
											spawnTools.incrementSpawnedCount(roomsCurrentSpawnedCounts, creepType, creepSubType, spawn.room.name);
										}
									} catch (error) {
										if (error instanceof Error) {

											let sourceMap = require("../sourceMap");
											sourceMap.logStackTrace(error);

										} else {
											throw error;
										}
									}
								}
							}
						}

						if (creepsSpawnRule.remoteRooms) {

							for (remoteRoomCreepsSpawnRule of creepsSpawnRule.remoteRooms) {

								var remoteRoom = Game.rooms[remoteRoomCreepsSpawnRule.roomName];

								if (!remoteRoom) {
									remoteRoom = {
										name: remoteRoomCreepsSpawnRule.roomName
									};
								}

								var remoteCurrentSpawnedCounts = undefined;

								if (currentSpawnedCounts && currentSpawnedCounts.remoteRooms) {
									remoteCurrentSpawnedCounts = currentSpawnedCounts.remoteRooms[remoteRoom.name];
								}

								if (remoteRoomCreepsSpawnRule.spawnOrderMaxSpawnedCounts) {
									for (var remoteSpawnOrderMaxSpawnedCount of remoteRoomCreepsSpawnRule.spawnOrderMaxSpawnedCounts) {

										var creepTypeKey = SpawnOrderMaxSpawnedCount.getCreepTypeKey(remoteSpawnOrderMaxSpawnedCount);
										var creepType = SpawnOrderMaxSpawnedCount.getCreepType(remoteSpawnOrderMaxSpawnedCount);
										var creepSubType = SpawnOrderMaxSpawnedCount.getCreepSubType(spawnOrderMaxSpawnedCount);
										var creepConstructor = creepConstructors[creepType];
										var maxSpawnedCount = remoteSpawnOrderMaxSpawnedCount[creepType];
										var currentSpawnedCount = (remoteCurrentSpawnedCounts) ? remoteCurrentSpawnedCounts[creepTypeKey] || 0 : 0;

										if (currentSpawnedCount < maxSpawnedCount) {

											try {
												spawnResult = trySpawnCreep(remoteRoom, true, spawn, creepConstructor, remoteRoomCreepsSpawnRule, creepsSpawnRule, remoteSpawnOrderMaxSpawnedCount, currentSpawnedCount, spawnResult);

												if (spawnResult.spawned) {
													spawnTools.incrementSpawnedCount(roomsCurrentSpawnedCounts, creepType, creepSubType, spawn.room.name, remoteRoom.name);
												}
											} catch (error) {
												if (error instanceof Error) {

													let sourceMap = require("../sourceMap");
													sourceMap.logStackTrace(error);

												} else {
													throw error;
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		} else {
			debug.danger(`Room ${creepsSpawnRule.roomName} not found in Game.rooms for spawn rule `, creepsSpawnRule);
		}
	}
}

function trySpawnCreep(room, isRemoteRoom, spawn, creepConstructor, creepsSpawnRule, spawnedRoomCreepsSpawnRule, spawnOrderMaxSpawnedCount, currentSpawnedCount, previousSpawnResult) {

	if (!previousSpawnResult.waitForSpawn && !previousSpawnResult.spawned) {

		var creepMemory = creepConstructor.initializeSpawnCreepMemory(room, spawn, creepsSpawnRule, spawnOrderMaxSpawnedCount, currentSpawnedCount);

		if (creepMemory) {

			creepMemory.spawnedRoomName = spawn.room.name;

			if (creepsSpawnRule.spawnProviderTo) {
				creepMemory.spawnedRoomName = creepsSpawnRule.spawnProvider;
				creepMemory.spawnProvider = creepsSpawnRule.spawnProvider;
			}

			if (isRemoteRoom) {
				creepMemory.state = "movingToRemoteRoom";
				creepMemory.remoteRoomName = room.name;
			}

			var spawnResult = spawnCreep(spawn, creepMemory, creepsSpawnRule, spawnedRoomCreepsSpawnRule);

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

function spawnCreep(spawn, creepMemory, creepsSpawnRule, spawnedRoomCreepsSpawnRule) {

	var spawnResult = {
		waitForSpawn: false,
		spawned: false
	};

	if (!(rules.evacuateRooms && !creepMemory.isTrooper && enemyTools.hasRoomEnemies(creepMemory.remoteRoomName))) {

		var spawnCapacity = spawnTools.calculateSpawnCapacity(spawn);

		if (roomTools.getPercentageStoredEnergy(spawn.room.name) > 15 &&
			creepMemory.minimumSpawnCapacity && spawnCapacity < creepMemory.minimumSpawnCapacity) {

			spawnResult.waitForSpawn = true;

		} else {

			var plannedSpawnCapacity = spawnCapacity;
			if (creepMemory.maximumSpawnCapacity && spawnCapacity > creepMemory.maximumSpawnCapacity) {

				plannedSpawnCapacity = creepMemory.maximumSpawnCapacity;
			}

			if (plannedSpawnCapacity <= spawnCapacity) {

				var partsPerMove = 2;
				if (creepsSpawnRule.partsPerMove) {
					partsPerMove = creepsSpawnRule.partsPerMove;
				}

				var id = getNextCreepId();
				var bodyParts = bodyPartsFactory.getBodyParts(creepMemory.bodyPartsType, plannedSpawnCapacity, partsPerMove);
				var bodyCost = spawnTools.calculateBodyCost(bodyParts);

				if (bodyCost <= spawnCapacity) {

					delete creepMemory.bodyPartsType;
					delete creepMemory.maximumSpawnCapacity;
					delete creepMemory.minimumSpawnCapacity;

					var result = spawn.spawnCreep(bodyParts, id, {
						memory: creepMemory,
						energyStructures: findTools.findAllEnergyStructures(spawn)
					});

					if (result === OK) {

						spawnResult.spawned = true;
						removeOneTimeOneCreepSpawnRules(creepsSpawnRule);
						var remoteRoomName = creepMemory.remoteRoomName ? "for remote " + creepMemory.remoteRoomName : "";

						debug.highlight(` ${creepMemory.type} ${id} spawning at ${creepMemory.spawnedRoomName} ${remoteRoomName}
							cost: ${spawnTools.calculateBodyCost(bodyParts)}<br>memory:`, creepMemory);

					} else if (ERR_NOT_ENOUGH_ENERGY && creepMemory.waitForSpawn) {

						spawnResult.waitForSpawn = true;

					} else {

						debug.warning(`${creepMemory.type} did not spawn: ${result}`);
					}
				} else {

					debug.warning(`${creepMemory.type} body cost: ${bodyCost} was more than the spawned capacity: ${spawnCapacity}`);
				}
			} else {

				debug.warning(`${creepMemory.type} planned spawn capacity: ${plannedSpawnCapacity} was more than the spawned capacity: ${spawnCapacity}`);
			}
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

	return "a" + nextCreepId;
}

creepsSpawner.scheduleOneTimeOneCreepRemoteRoomCreepsSpawnRule = function(spawnRoomName, remoteRoomCreepsSpawnRule, scheduleId) {

	if (spawnRoomName && remoteRoomCreepsSpawnRule) {

		if (!Memory.state.oneTimeOneCreepRemoteRoomCreepsSpawnRules) {
			Memory.state.oneTimeOneCreepRemoteRoomCreepsSpawnRules = {};
		}

		if (remoteRoomCreepsSpawnRule.spawnOrderMaxSpawnedCounts.length === 1) {

			if (!scheduleId) {
				scheduleId = Math.random().toString();
			}

			remoteRoomCreepsSpawnRule.oneTimeOneCreep = scheduleId;

			var spawnRoomRemoteRoomCreepsSpawnRule = {
				[spawnRoomName]: {
					roomName: spawnRoomName,
					remoteRooms: []
				}
			}

			spawnRoomRemoteRoomCreepsSpawnRule[spawnRoomName].remoteRooms.push(remoteRoomCreepsSpawnRule);

			Memory.state.oneTimeOneCreepRemoteRoomCreepsSpawnRules[scheduleId] = spawnRoomRemoteRoomCreepsSpawnRule;

		} else {
			debug.error("Add one time rule: single remote rule not found: ", spawnRoomRemoteRoomCreepsSpawnRule);
		}
	} else {
		debug.error(`Did not schedule one time creep remote rule: spawnRoomName: ${spawnRoomName} remoteRoomCreepsSpawnRule:`, remoteRoomCreepsSpawnRule)
	}

	return scheduleId;
}

creepsSpawner.unscheduleOneTimeOneCreepRemoteRoomCreepsSpawnRule = function(scheduleId) {

	if (Memory.state.oneTimeOneCreepRemoteRoomCreepsSpawnRules) {
		delete Memory.state.oneTimeOneCreepRemoteRoomCreepsSpawnRules[scheduleId];
	}
}

function addOneTimeOneCreepSpawnRules(creepsSpawnRules) {

	if (Memory.state.oneTimeOneCreepRemoteRoomCreepsSpawnRules) {
		for (var scheduleId in Memory.state.oneTimeOneCreepRemoteRoomCreepsSpawnRules) {

			calculatedSpawnRulesTools.prependRemoteRoomCreepsSpawnRules(creepsSpawnRules, Memory.state.oneTimeOneCreepRemoteRoomCreepsSpawnRules[scheduleId]);
		}
	}

}

function removeOneTimeOneCreepSpawnRules(creepsSpawnRules) {

	if (creepsSpawnRules.oneTimeOneCreep && Memory.state.oneTimeOneCreepRemoteRoomCreepsSpawnRules) {

		delete Memory.state.oneTimeOneCreepRemoteRoomCreepsSpawnRules[creepsSpawnRules.oneTimeOneCreep];
	}
}


module.exports = creepsSpawner;