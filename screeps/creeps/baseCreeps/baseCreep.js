
var coreArray = require("../../../lib/core/extensions/coreArray");
var creepsSpawnRuleTools = require("../../rules/creepsSpawnRuleTools");
var enemyTools = require("../../tools/enemyTools");
var findTools = require("../../tools/findTools");
var spawnTools = require("../../tools/spawnTools");
var roomTools = require("../../tools/roomTools");
var visualizeTools = require("../../tools/visualizeTools");
var { rules } = require("../../rules/rules");

class BaseCreep {

	/** @param {Creep} creep */
	constructor(creep) {

		this.creep = creep;
		this.memory = creep.memory;
		this.type = creep.memory.type;
		this.isDying = this.creep.ticksToLive < 25;

		this.roomName = this.creep.room.name;
		this.spawnedRoomName = creep.memory.spawnedRoomName;
		this.remoteRoomName = creep.memory.remoteRoomName;

		var creepsSpawnRuleKey = this.memory.creepsSpawnRuleKey;
		if (!creepsSpawnRuleKey) {
			creepsSpawnRuleKey = creepsSpawnRuleTools.buildCreepsSpawnRuleKey(this.spawnedRoomName, this.remoteRoomName, "remote-room");
		}

		this.creepsSpawnRule = (Memory.state.ruleKeyCreepsSpawnRules && creepsSpawnRuleKey) ? Memory.state.ruleKeyCreepsSpawnRules[creepsSpawnRuleKey] : undefined;
		this.spawnedRoomCreepsSpawnRule = (Memory.state.ruleKeyCreepsSpawnRules) ? Memory.state.ruleKeyCreepsSpawnRules[this.spawnedRoomName] : undefined;

		this.suppressReturnToRooms = false;
		this.isTrooper = false;

		if (this.memory.travel && (this.memory._move ||
			(this.memory.travel.pathDestination.roomName !== this.roomName) ||
			(this.memory.travel.pathDestination.x === this.creep.pos.x &&
				this.memory.travel.pathDestination.y === this.creep.pos.y))) {
			delete this.memory.travel;
		}
	}

	get state() {
		return this.memory.state;
	}

	set state(state) {
		this.memory.state = state;
	}

	get hasCarry() {
		return this.creep.body.some(bodyPart => bodyPart.type === "carry");
	}

	act() {

		var acted = false;

		if (this.isDying){
			this.creep.say("😡  " + this.creep.ticksToLive, true);
		}

		if (this.state === "suicide") {

			this.creep.say("😡 .|.");

			if (this.creep.carry && this.creep.carry.energy > 0) {

				this.transferEnergy();

			} else {

				this.creep.say("I hate you .|.");
				this.creep.suicide();
			}

			acted = true;

		} else if (this.shouldTransferResourcesOnDying()) {

			this.creep.say(`😰 ${this.creep.carry.energy} ${this.creep.ticksToLive}`);
			this.transferEnergy();

			if (this.creep.carry && this.creep.carry.energy === 0) {
				this.creep.suicide();
			}

			acted = true;

		} else if (this.memory.takeStepsIntoRoom && this.memory.takeStepsIntoRoom > 0) {

			this.moveIntoRoom();
			this.memory.takeStepsIntoRoom--;
			acted = true;

		} else if (this.memory.pause) {

			if (Game.time >= this.memory.pause) {
				delete this.memory.pause;
			}

			acted = true;

		} else if (this.memory.evacuateToRoom) {

			if (this.roomName === this.memory.evacuateToRoom) {

				// NOTE: Creep must step off the exit edge of the room immediately
				//  or will be sent back to the other room
				this.moveIntoRoom();
				this.memory.takeStepsIntoRoom = 4;

				this.memory.pause = Game.time + rules.mobAttackRoomCoolDownCount;
				this.state === "movingToRemoteRoom";

				delete this.memory.evacuateToRoom
				acted = true;

			} else {
				this.moveToExit(this.memory.evacuateToRoom);
				acted = true;
			}
		} else if (this.shouldEvacuateRoom(this.roomName)) {

			var routes = findTools.findRoute(this.roomName, this.spawnedRoomName);

			if (routes !== ERR_NO_PATH && routes.length > 0 && routes[0].exit >= OK) {

				this.memory.evacuateToRoom = routes[0].room;
			}
		} else if (this.memory.travel && !this.memory.travel.isStuck) {

			if (this.creep.fatigue <= 2 && this.memory.travel.previousX === this.creep.pos.x && this.memory.travel.previousY === this.creep.pos.y) {
				this.memory.travel.stuckCount++;
			}

			if (this.memory.travel.stuckCount < 2) {

				var path = Room.deserializePath(this.memory.travel.path);
				var result = this.creep.moveByPath(path);

				if (result === OK) {
					if (rules.visualizeTravelPaths) {
						// visualizeTools.visualizePath(this.creep.room, path, "lightblue");
					}
					acted = true;
				}

				this.memory.travel.previousX = this.creep.pos.x;
				this.memory.travel.previousY = this.creep.pos.y;

			} else {

				var occupied = roomTools.isOccupiedByCreep(this.memory.travel.pathDestination.x,
					this.memory.travel.pathDestination.y, this.memory.travel.pathDestination.roomName);

				if (occupied) {
					this.avoidCreepsOnTravel = true;
					delete this.memory.travel;
				} else {
					var finalDestinationPos = new RoomPosition(this.memory.travel.finalDestination.x,
						this.memory.travel.finalDestination.y, this.memory.travel.finalDestination.roomName);

					this.travelTo(finalDestinationPos, this.memory.travel.range, true);
					acted = true;
				}
			}
		} else if (this.state === "movingToSpawnedRoom") {

			if (this.roomName === this.spawnedRoomName) {

				// NOTE: Creep must step off the exit edge of the room immediately
				//  or will be sent back to the other room
				this.moveIntoRoom();
				this.arrivedAtSpawnedRoom();
				this.memory.takeStepsIntoRoom = 2;
				acted = true;

			} else {
				this.moveToExit(this.spawnedRoomName);
				acted = true;
			}
		} else if (this.state === "movingToRemoteRoom") {


			if (this.roomName === this.remoteRoomName) {

				// NOTE: Creep must step off the exit edge of the room immediately
				//  or will be sent back to the other room
				this.moveIntoRoom();
				this.arrivedAtRemoteRoom();
				this.memory.takeStepsIntoRoom = 2;
				acted = true;

			} else {

				if (!(rules.evacuateRooms && !this.isTrooper && enemyTools.hasRoomEnemies(this.remoteRoomName))) {
					this.moveToExit(this.remoteRoomName);
				}

				acted = true;
			}
		} else if (!this.suppressReturnToRooms && this.remoteRoomName && this.roomName !== this.remoteRoomName) {
			this.state = "movingToRemoteRoom";
			acted = true;

		} else if (!this.suppressReturnToRooms && !this.remoteRoomName && this.roomName !== this.spawnedRoomName) {
			this.state = "movingToSpawnedRoom";
			acted = true;
		}

		return acted;
	}

	getInitialState() {
		return "initial";
	}

	arrivedAtRemoteRoom() {
		this.state = this.getInitialState();
	}

	arrivedAtSpawnedRoom() {
		this.state = this.getInitialState();
	}

	moveToExit(exitRoomName) {

		var routes = findTools.findRoute(this.roomName, exitRoomName);
		if (routes !== ERR_NO_PATH && routes.length > 0 && routes[0].exit >= OK) {

			var routeRoomName = routes[0].room;
			var routeExit = routes[0].exit
			var moveToTarget;

			if (!this.shouldEvacuateRoom(routeRoomName)) {

				var exitFlag = Game.flags[`exit-from-${this.roomName}-to-${routeRoomName}`];
				var findPathAndExit = false;

				if (exitFlag) {

					// NOTE: Flags must be next to exits, alternating between 1 and 2 help the
					//  creeps from getting stuck.
					if (this.isInTravelDistance(exitFlag)) {
						this.travelTo(exitFlag);
					} else if (this.creep.pos.inRangeTo(exitFlag, Game.time % 4 >= 2 ? 1 : 2)) {
						findPathAndExit = true;
					} else {
						this.creep.moveTo(exitFlag);
					}
				} else {

					var exit = this.creep.pos.findClosestByRange(routeExit);

					if (this.isInTravelDistance(exit)) {
						this.travelTo(exit);
					} else {
						findPathAndExit = true;
					}
				}

				if (findPathAndExit) {

					exit = this.creep.pos.findClosestByPath(routeExit);
					if (exit) {

						this.creep.moveTo(exit);

					} else {
						debug.warning(`${this.type} ${this.creep.name} can't find a path from ${this.roomName} to the exit to ${routeRoomName} with exit ${routeExit}`);
					}
				}
			}
		} else {
			debug.warning(`${this.type} ${this.creep.name} can't find a rout from ${this.roomName} to ${exitRoomName}`);
		}
	}

	moveIntoRoom() {

		var path = this.creep.pos.findPathTo(25, 25, {
			costCallback: roomTools.getAvoidCostCallback(),
		});

		if (!path) {

			var target = roomTools.getSpawn(this.roomName);

			if (!target) {
				target = this.creep.room.controller;
			}

			if (!target) {
				var targets = roomTools.getSources(this.roomName);
				target = targets.length > 0 ? targets[0] : null;
			}

			if (!target) {
				target = this.creep.pos.findClosestByPath(FIND_STRUCTURES);
			}

			if (target) {
				path = this.creep.pos.findPathTo(target, {
					costCallback: roomTools.getAvoidCostCallback(),
				});
			}
		}

		if (path) {
			this.creep.moveByPath(path);
		}
	}

	travelTo(target, range, avoidCreeps) {

		var pos = target.pos;
		var room = target.room;

		if (!pos) {
			pos = target;
		}

		if (!room) {
			room = Game.rooms[pos.roomName];
		}

		if (this.avoidCreepsOnTravel) {
			avoidCreeps = true;
		}

		var options = {
			reusePath: 100,
			ignoreCreeps: !avoidCreeps,
			ignoreRoads: (this.memory.partsPerMove && this.memory.partsPerMove === 1) ? true : false,
			range: 0,
			maxRooms: 1,
			costCallback: roomTools.getAvoidCostCallback(),
		}

		var path = room.findPath(this.creep.pos, pos, options);
		var pathColor = options.ignoreCreeps ? "blue" : "yellow";

		if (range) {
			if (path.length > range) {
				path.splice(path.length - range);
			} else {
				path = undefined;
			}
		}

		if (path) {

			var result = this.creep.moveByPath(path);

			if (result === OK || result === ERR_TIRED) {

				if (rules.visualizeTravelPaths) {
					visualizeTools.visualizePath(this.creep.room, path, pathColor);
				}

				var pathDestinationPos = path[path.length - 1];

				this.memory.travel = {
					finalDestination: {
						x: pos.x,
						y: pos.y,
						roomName: pos.roomName,
					},
					pathDestination: {
						x: pathDestinationPos.x,
						y: pathDestinationPos.y,
						roomName: pos.roomName,
					},
					path: Room.serializePath(path),
					range: range || 0,
					previousX: -1,
					previousY: -1,
					stuckCount: 0,
				}

				delete this.memory._move;
			} else {
				debug.warning(`${this.type} ${this.creep.name} could not move by path: ${result} ${path.length}`)
			}
		}

		return result;
	}

	travelNearTo(target, avoidCreeps,) {
		this.travelTo(target, 3, avoidCreeps);
	}

	isInTravelDistance(target, range = 3) {
		return !this.creep.pos.inRangeTo(target, range);
	}

	travelToWaitFlag() {

		var waitFlag = Game.flags[`wait-${this.roomName}`];
		if (waitFlag) {
			this.travelTo(waitFlag, 1, true);
		} else {
			// debug.warning(`${this.type} ${this.creep.name} ${this.roomName} can't find any resource to harvest`);
		}
	}

	moveToAndAvoid(target) {

		var path = this.creep.pos.findPathTo(target, {
			costCallback: roomTools.getAvoidCostCallback(),
		});

		return this.creep.moveByPath(path);
	}

	// creepTo(target) {

	// 	var result = this.creep.moveTo(target, {
	// 		reusePath: 1,
	// 	});

	// 	return result;
	// }

	transferEnergy() {

		if (roomTools.hasMinimumStorageCapacity(this.roomName)) {

			var resource = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: structure => (structure.structureType == STRUCTURE_STORAGE ||
					structure.structureType == STRUCTURE_TERMINAL) &&
					structure.storeCapacity - structure.store[RESOURCE_ENERGY] > this.creep.carry.energy
			});

			if (resource) {
				if (this.isInTravelDistance(resource)) {
					this.travelNearTo(resource, true);

				} else {

					var transferResult = this.creep.transfer(resource, RESOURCE_ENERGY);

					if (transferResult === ERR_NOT_IN_RANGE) {

						this.creep.moveTo(resource);

					} else if (transferResult === OK) {

						this.creep.moveTo(this.creep.room.controller);

					} else {
						debug.warning(`${this.type} ${this.creep.name} ${this.roomName} couldn't transfer energy ${transferResult}`);
					}
				}
			} else {
				this.creep.drop(RESOURCE_ENERGY);
			}

		} else {

			var dropFlag = roomTools.getDropFlag(this.roomName);
			if (dropFlag) {
				if (this.isInTravelDistance(dropFlag)) {
					this.travelNearTo(dropFlag, true);
				} else if (this.creep.pos.inRangeTo(dropFlag, 0)) {
					this.creep.drop(RESOURCE_ENERGY);
					this.creep.moveTo(this.creep.room.controller);
				} else {
					this.creep.moveTo(dropFlag);
				}
			} else {
				this.creep.drop(RESOURCE_ENERGY);
			}
		}
	}

	shouldTransferResourcesOnDying() {

		if (this.isDying && !this.creep.memory.shouldTransferResourcesOnDying) {
			if (this.hasCarry && (this.creep.carry.energy / this.creep.carryCapacity > .10)) {
	
				var transferTarget;
				if (roomTools.hasMinimumStorageCapacity(this.roomName)) {
	
					transferTarget = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
						filter: structure => (structure.structureType == STRUCTURE_STORAGE ||
							structure.structureType == STRUCTURE_TERMINAL) &&
							structure.storeCapacity - structure.store[RESOURCE_ENERGY] > this.creep.carry.energy
					});
				} else {
					transferTarget = roomTools.getDropFlag(this.roomName);
				}
	
				if (transferTarget) {
					var path = this.creep.pos.findPathTo(transferTarget, {
						costCallback: roomTools.getAvoidCostCallback(),
					});
	
					if (this.creep.ticksToLive - 3 <= path.length) {
						this.creep.memory.shouldTransferResourcesOnDying = true;
					}
				}
			}
		}

		return this.creep.memory.shouldTransferResourcesOnDying;
	}

	shouldEvacuateRoom(roomName) {

		return rules.evacuateRooms && !this.isTrooper && this.roomName !== this.spawnedRoomName && enemyTools.hasRoomEnemiesAndNoTower(roomName);
	}
}

module.exports = BaseCreep