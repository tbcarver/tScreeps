
var enemyTools = require("../../tools/enemyTools");
var findTools = require("../../tools/findTools");
var spawnTools = require("../../tools/spawnTools");
var { rules } = require("../../rules/rules");

/** @param {Creep} creep */
function BaseCreep(creep) {

	this.creep = creep;
	this.memory = creep.memory;
	this.type = creep.memory.type;
	this.isDying = this.creep.ticksToLive < 25;
	this.spawnedRoomName = creep.memory.spawnedRoomName;
	this.remoteRoomName = creep.memory.remoteRoomName;
	this.isTrooper = false;

	Object.defineProperty(this, 'state', {
		get: function() {
			return this.memory.state;
		},
		set: function(state) {
			this.memory.state = state
		}
	});

	Object.defineProperty(this, 'creepsSpawnRule', {
		get: function() {

			if (this.remoteRoomName) {
				return Memory.state.roomNamesCreepsSpawnRules[this.spawnedRoomName].remoteRooms[this.remoteRoomName];
			} else {
				return Memory.state.roomNamesCreepsSpawnRules[this.spawnedRoomName];
			}
		}
	});

	Object.defineProperty(this, 'spawnedRoomCreepsSpawnRule', {
		get: function() {
			return Memory.state.roomNamesCreepsSpawnRules[this.spawnedRoomName];
		}
	});
}

BaseCreep.prototype.act = function() {

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

	} else if (rules.evacuateRemoteRooms && !this.isTrooper && this.state !== "movingToSpawnedRoom" && this.creep.room.name === this.remoteRoomName && enemyTools.hasRoomEnemies(this.creep.room.name)) {

		this.state = "movingToSpawnedRoom";
		acted = true;

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

			if (!(rules.evacuateRemoteRooms && !this.isTrooper && enemyTools.hasRoomEnemies(this.remoteRoomName))) {
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

BaseCreep.prototype.getInitialState = function() {
	return "initial";
}

BaseCreep.prototype.arrivedAtRemoteRoom = function() {
	this.state = this.getInitialState();
}

BaseCreep.prototype.arrivedAtSpawnedRoom = function() {
	this.state = this.getInitialState();
}

BaseCreep.prototype.moveToExit = function(exitRoomName) {

	var exitFlag = Game.flags[`exit-from-${this.creep.room.name}-to-${exitRoomName}`];
	var isAtFlag = false;

	if (!exitFlag) {

		var routes = findTools.findRoute(this.creep.room.name, exitRoomName);

		// debug.creep(creep, "");
		if (routes.length > 0) {
			exitFlag = Game.flags[`exit-from-${this.creep.room.name}-to-${routes[0].room}`];
		}
	}

	if (exitFlag) {

		// NOTE: Flags must be next to exits, alternating between 1 and 2 help the
		//  creeps from getting stuck.
		if (this.creep.pos.inRangeTo(exitFlag, Game.time % 4 >= 2 ? 1 : 2)) {
			isAtFlag = true;
		} else {
			this.creep.moveTo(exitFlag);
		}
	}

	if (isAtFlag || !exitFlag) {

		var routes = findTools.findRoute(this.creep.room.name, exitRoomName);
		// var exitDirection = this.creep.room.findExitTo(exitRoomName);

		if (routes.length > 0 && routes[0].exit >= OK) {

			var exit = this.creep.pos.findClosestByPath(routes[0].exit);

			if (exit) {

				this.creep.moveTo(exit);

			} else {
				debug.warning(`${this.type} ${this.creep.name} can't find a path from ${this.creep.room.name} to the exit to ${exitRoomName} with exit ${routes[0].exit}`);
			}
		} else {
			debug.warning(`${this.type} ${this.creep.name} can't find an exit direction from ${this.creep.room.name} to ${exitRoomName}`);
		}
	}
}

BaseCreep.prototype.moveIntoRoom = function() {

	var target = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
		filter: { structureType: STRUCTURE_CONTROLLER }
	});

	if (!target) {
		var target = this.creep.pos.findClosestByPath(FIND_SOURCES);
	}

	if (!target) {
		var target = this.creep.pos.findClosestByPath(FIND_STRUCTURES);
	}

	if (target) {
		this.creep.moveTo(target);
	} else {
		this.creep.moveTo(25, 25);
	}
}

BaseCreep.prototype.transferEnergy = function() {

	var dropFlag = Game.flags[`drop-${this.creep.room.name}`];

	if (dropFlag) {
		if (this.creep.pos.inRangeTo(dropFlag, 1)) {
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

BaseCreep.prototype.debug = function(creepName, ...logs) {
	debug.creep(this.creep, creepName, ...logs);
}


module.exports = BaseCreep