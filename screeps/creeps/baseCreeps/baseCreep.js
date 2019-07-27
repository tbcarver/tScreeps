
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
		this.spawnedRoomName = creep.memory.spawnedRoomName;
		this.remoteRoomName = creep.memory.remoteRoomName;
		this.suppressReturnToRooms = false;
		this.isTrooper = false;

		debug.temp("pre", this.creep.name, this.memory.state, !!this.memory.travel)

		if (this.memory.travel && (this.memory._move ||
			(this.memory.travel.roomName !== this.creep.room.name) ||
			(this.memory.travel.x === this.creep.pos.x && this.memory.travel.y === this.creep.pos.y))) {
			delete this.memory.travel;
			debug.temp("DELETED")
		}

		// if (this.memory.travel && this.memory._move) {
		// 	if (!(this.memory.travel.x === this.memory._move.dest.x &&
		// 		this.memory.travel.y === this.memory._move.dest.y)) {

		// 		delete this.memory.travel;
		// 		debug.temp("DELETED")
		// 	} else if (this.memory.travel.x === this.creep.pos.x &&
		// 		this.memory.travel.y === this.creep.pos.y) {

		// 		delete this.memory.travel;
		// 		debug.temp("DELETED arrived")
		// 	}
		// }
		// debug.temp("post", !!this.memory.travel, !!this.memory._move)
	}

	get state() {
		return this.memory.state;
	}

	set state(state) {
		this.memory.state = state
	}

	get creepsSpawnRule() {
		var creepsSpawnRule;

		if (Memory.state.roomNamesCreepsSpawnRules) {

			if (this.remoteRoomName) {
				creepsSpawnRule = Memory.state.roomNamesCreepsSpawnRules[this.spawnedRoomName].remoteRooms[this.remoteRoomName];
			} else {
				creepsSpawnRule = Memory.state.roomNamesCreepsSpawnRules[this.spawnedRoomName];
			}
		}
		return creepsSpawnRule;
	}

	get spawnedRoomCreepsSpawnRule() {

		if (Memory.state.roomNamesCreepsSpawnRules) {
			return Memory.state.roomNamesCreepsSpawnRules[this.spawnedRoomName];
		} else {
			return undefined;
		}
	}

	get isTraveling() {

		var isTraveling = false;

		if (this.memory.travel && this.memory.travel.roomName === this.creep.room.name) {

			isTraveling = (this.memory.travel && this.memory._move && this.memory.travel.x === this.memory._move.dest.x &&
				this.memory.travel.y === this.memory._move.dest.y);
		}

		return isTraveling;
	}

	act() {

		var acted = false;

		if (spawnTools.isCreepInSpawnBuffer(this.creep)) {
			this.creep.say("🙋" + this.creep.ticksToLive);
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

		} else if (this.isDying) {

			this.creep.room.visual.circle(this.creep.pos, { radius: .15, stroke: "red", fill: "red", opacity: 1 });
			this.creep.say("😡 " + this.creep.ticksToLive);

			var hasCarry = this.creep.body.some(bodyPart => bodyPart.type === "carry");

			if (hasCarry) {

				if (this.creep.carry[RESOURCE_ENERGY] === 0) {

					var waitFlag = Game.flags[`wait-${this.creep.room.name}`];
					if (waitFlag) {
						this.creep.moveTo(waitFlag);
					} else {
						this.creep.moveTo(this.creep.room.controller);
					}
				} else {

					this.creep.say("😰 " + this.creep.ticksToLive);
					this.transferEnergy();
				}

				acted = true;
			}
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

			if (this.creep.room.name === this.memory.evacuateToRoom) {

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
		} else if (this.shouldEvacuateRoom(this.creep.room.name)) {

			var routes = findTools.findRoute(this.creep.room.name, this.spawnedRoomName);

			if (routes !== ERR_NO_PATH && routes.length > 0 && routes[0].exit >= OK) {

				this.memory.evacuateToRoom = routes[0].room;
			}
		} else if (this.memory.travel && !this.memory.travel.isStuck) {

			debug.temp("isTraveling", this.creep.name, this.memory.travel);

			if (this.creep.fatigue <= 2 && this.memory.travel.previousX === this.creep.pos.x && this.memory.travel.previousY === this.creep.pos.y) {
				this.memory.travel.stuckCount++;
			}

			if (this.memory.travel.stuckCount <= 2) {

				var path = Room.deserializePath(this.memory.travel.path);
				var result = this.creep.moveByPath(path);

				// var pos = new RoomPosition(this.memory.travel.x, this.memory.travel.y, this.memory.travel.roomName);

				// var result = this.creep.moveTo(pos, {
				// 	reusePath: 100,
				// });

				if (result === OK) {
					if (rules.visualizeTravelPaths) {
						visualizeTools.visualizePath(this.creep.room, path, "lightblue");
					}
					acted = true;
				}

				this.memory.travel.previousX = this.creep.pos.x;
				this.memory.travel.previousY = this.creep.pos.y;

			} else {
				this.memory.travel.isStuck = true;
			}
		} else if (this.state === "movingToSpawnedRoom") {

			if (this.creep.room.name === this.spawnedRoomName) {

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


			if (this.creep.room.name === this.remoteRoomName) {

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
		} else if (!this.suppressReturnToRooms && this.remoteRoomName && this.creep.room.name !== this.remoteRoomName) {
			this.state = "movingToRemoteRoom";
			acted = true;

		} else if (!this.suppressReturnToRooms && !this.remoteRoomName && this.creep.room.name !== this.spawnedRoomName) {
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

		var routes = findTools.findRoute(this.creep.room.name, exitRoomName);
		if (routes !== ERR_NO_PATH && routes.length > 0 && routes[0].exit >= OK) {

			var routeRoomName = routes[0].room;
			var routeExit = routes[0].exit
			var moveToTarget;

			if (!this.shouldEvacuateRoom(routeRoomName)) {

				var exitFlag = Game.flags[`exit-from-${this.creep.room.name}-to-${routeRoomName}`];
				var findPathAndExit = false;

				if (exitFlag) {

					// NOTE: Flags must be next to exits, alternating between 1 and 2 help the
					//  creeps from getting stuck.
					if (!this.creep.pos.inRangeTo(exitFlag, 3)) {
						this.travelTo(exitFlag);
					} else if (this.creep.pos.inRangeTo(exitFlag, Game.time % 4 >= 2 ? 1 : 2)) {
						findPathAndExit = true;
					} else {
						this.creep.moveTo(exitFlag);
					}
				} else {

					var exit = this.creep.pos.findClosestByRange(routeExit);

					if (!this.creep.pos.inRangeTo(exit, 3)) {
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
						debug.warning(`${this.type} ${this.creep.name} can't find a path from ${this.creep.room.name} to the exit to ${routeRoomName} with exit ${routeExit}`);
					}
				}
			}
		} else {
			debug.warning(`${this.type} ${this.creep.name} can't find a rout from ${this.creep.room.name} to ${exitRoomName}`);
		}
	}

	moveIntoRoom() {

		
		debug.temp("moveIntoRoom")

		var path = this.creep.pos.findPathTo(25, 25);

		if (path) {

			this.creep.moveByPath(path);

		} else {

			var target = roomTools.getSpawn(this.creep.room.name);

			if (!target) {
				target = this.creep.room.controller;
			}

			if (!target) {
				var targets = roomTools.getSources(this.creep.room.name);
				target = targets.length > 0 ? targets[0] : null;
			}

			if (!target) {
				target = this.creep.pos.findClosestByPath(FIND_STRUCTURES);
			}

			if (target) {
				this.creep.moveTo(target);
			}
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

		if (!avoidCreeps) {
			avoidCreeps = (this.memory.travel && this.memory.travel.isStuck) ? true : false;
		}

		var options = {
			reusePath: 100,
			ignoreCreeps: !avoidCreeps,
			ignoreRoads: (this.memory.partsPerMove && this.memory.partsPerMove === 1) ? true : false,
			range: 0,
			maxRooms: 1,
		}

		var path = room.findPath(this.creep.pos, pos, options);

		if (range) {
			if (path.length > range) {
				path.splice(path.length - range);
			} else {
				path = undefined;
			}
		}

		if (path) {

			var result = this.creep.moveByPath(path);

			if (result === OK) {

				if (rules.visualizeTravelPaths) {
					visualizeTools.visualizePath(this.creep.room, path, "blue");
				}

				this.memory.travel = {
					x: pos.x,
					y: pos.y,
					roomName: pos.roomName,
					path: Room.serializePath(path),
					previousX: -1,
					previousY: -1,
					stuckCount: 0,
					isStuck: false,
				}

				delete this.memory._move;

				debug.temp("travel to", this.creep.name, result, pos, options, this.memory.travel);
			}
		}

		return result;
	}

	travelNearTo(target, avoidCreeps) {
		this.travelTo(target, 3, avoidCreeps);
	}

	travelRemainingTo(target) {
		this.travelTo(target);
	}

	isInTravelDistance(target) {
		return !this.creep.pos.inRangeTo(target, 3);
	}

	// creepTo(target) {

	// 	var result = this.creep.moveTo(target, {
	// 		reusePath: 1,
	// 	});

	// 	return result;
	// }

	transferEnergy() {

		var dropFlag = Game.flags[`drop-${this.creep.room.name}`];

		if (dropFlag) {
			if (this.creep.pos.inRangeTo(dropFlag, 0)) {
				this.creep.drop(RESOURCE_ENERGY);
			} else {
				this.creep.moveTo(dropFlag);
			}
		} else {

			var target = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: structure => (structure.structureType == STRUCTURE_STORAGE ||
					structure.structureType == STRUCTURE_TERMINAL) &&
					structure.storeCapacity - structure.store[RESOURCE_ENERGY] > this.creep.carry.energy
			});

			if (!target) {
				target = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
					filter: structure => structure.structureType == STRUCTURE_CONTAINER &&
						structure.storeCapacity - structure.store[RESOURCE_ENERGY] > this.creep.carry.energy
				});
			}

			if (target) {
				if (this.creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					this.creep.moveTo(target);
				}
			} else {
				this.creep.drop(RESOURCE_ENERGY);
			}
		}
	}

	shouldEvacuateRoom(roomName) {

		return rules.evacuateRooms && !this.isTrooper && this.creep.room.name !== this.spawnedRoomName && enemyTools.hasRoomEnemiesAndNoTower(roomName);
	}
}

module.exports = BaseCreep