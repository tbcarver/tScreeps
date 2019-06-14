
var roomTools = require("../../tools/roomTools");
var { rules, roomNamesCreepsSpawnRules } = require("../../rules/rules");

function BaseCreep(creep) {

	this.creep = creep;
	this.memory = creep.memory;
	this.type = creep.memory.type;
	this.isDying = this.creep.ticksToLive < 25;
	this.spawnedRoomName = creep.memory.spawnedRoomName;
	this.remoteRoomName = creep.memory.remoteRoomName;
	this.isRemoteCreep = false;
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
			var creepsSpawnRule;

			if (this.remoteRoomName) {
				creepsSpawnRule = roomNamesCreepsSpawnRules[this.spawnedRoomName].remoteRooms[this.remoteRoomName];
			} else {
				creepsSpawnRule = roomNamesCreepsSpawnRules[this.spawnedRoomName];
			}

			return creepsSpawnRule;
		}
	});

	Object.defineProperty(this, 'spawnedRoomCreepsSpawnRule', {
		get: function() {
			return roomNamesCreepsSpawnRules[this.spawnedRoomName];
		}
	});
}

BaseCreep.prototype.act = function() {

	var acted = false;

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

		var hasCarry = this.creep.body.some(bodyPart => bodyPart.type === "carry");

		if (this.creep.carry[RESOURCE_ENERGY] === 0 || !hasCarry) {

			this.creep.say("😡 " + this.creep.ticksToLive);

			if (Game.flags["graveyard"]) {

				this.creep.moveTo(Game.flags["graveyard"].pos);

			} else {

				this.creep.moveTo(this.creep.room.controller);
			}

		} else {

			this.creep.say("😰 " + this.creep.ticksToLive);
			this.transferEnergy();
		}

		acted = true;

	} else if (this.memory.takeStepsIntoRoom && this.memory.takeStepsIntoRoom > 0) {

		this.moveIntoRoom();
		this.memory.takeStepsIntoRoom--;
		acted = true;

	} else if (rules.evacuateRemoteRooms && !this.isTrooper && this.state !== "movingToSpawnedRoom" && this.creep.room.name === this.remoteRoomName && roomTools.isRoomUnderAttack(this.creep.room.name)){
		this.state = "movingToSpawnedRoom";
		acted = true;

	} else if (!this.isRemoteCreep) {

		if (this.state === "movingToRemoteRoom") {


			if (this.creep.room.name === this.remoteRoomName) {

				this.state = this.getInitialState();
				this.memory.takeStepsIntoRoom = 2;

				// NOTE: Creep must step off the exit edge of the room immediately
				//  or will be sent back to the other room
				this.moveIntoRoom();
				acted = true;

			} else {

				if (!(rules.evacuateRemoteRooms && !this.isTrooper && roomTools.isRoomUnderAttack(this.remoteRoomName))) {
					this.moveToExit(this.remoteRoomName);
				}

				acted = true;
			}
		} else if (this.state === "movingToSpawnedRoom") {

			if (this.creep.room.name === this.spawnedRoomName) {

				this.state = this.getInitialState();
				this.memory.takeStepsIntoRoom = 2;

				// NOTE: Creep must step off the exit edge of the room immediately
				//  or will be sent back to the other room
				this.moveIntoRoom();
				acted = true;

			} else {
				this.moveToExit(this.spawnedRoomName);
				acted = true;
			}
		} else if (this.remoteRoomName && this.creep.room.name !== this.remoteRoomName) {
			this.state = "movingToRemoteRoom";
			acted = true;

		} else if (!this.remoteRoomName && this.creep.room.name !== this.spawnedRoomName) {
			this.state = "movingToSpawnedRoom";
			acted = true;
		}
	}

	return acted;
}

BaseCreep.prototype.getInitialState = function() {
	return "initial";
}

BaseCreep.prototype.moveToExit = function(exitRoomName) {

	var exitFlag = Game.flags[`exit-from-${this.creep.room.name}-to-${exitRoomName}`];
	var isAtFlag = false;

	if (exitFlag) {

		if (this.creep.pos.inRangeTo(exitFlag, 2)) {
			isAtFlag = true;
		} else {
			this.creep.moveTo(exitFlag);
		}
	}

	if (isAtFlag || !exitFlag) {

		var exitDirection = this.creep.room.findExitTo(exitRoomName);

		if (exitDirection && exitDirection >= OK) {

			var exit = this.creep.pos.findClosestByPath(exitDirection);

			if (exit) {

				this.creep.moveTo(exit);

			} else {
				debug.warning(`${this.type} can't find a path to the exit to ${exitRoomName}`);
			}
		} else {
			debug.warning(`${this.type} can't find an exit direction to ${exitRoomName}`);
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

	var target = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
		filter: structure => structure.structureType == STRUCTURE_STORAGE &&
			structure.storeCapacity - structure.store[RESOURCE_ENERGY] > this.creep.carry.energy
	});

	if (!target) {
		target = this.creep.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: structure => structure.structureType == STRUCTURE_CONTAINER &&
				structure.storeCapacity - structure.store[RESOURCE_ENERGY] > this.creep.carry.energy
		});
	}

	if (!target) {
		target = this.creep.room.controller;
	}

	if (this.creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

		this.creep.moveTo(target);
	}
}


module.exports = BaseCreep