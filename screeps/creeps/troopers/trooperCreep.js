
var enemyTools = require("../../tools/enemyTools");
var BaseCreep = require("../baseCreeps/baseCreep");

function TrooperCreep(creep) {

	BaseCreep.call(this, creep);

	this.isTrooper = true;
	this.isMobTrooper = this.memory.isMobTrooper;
	this.mobAttackRoomName = enemyTools.getMobAttackRoomName(this.remoteRoomName);

	if (this.isMobTrooper) {
		this.suppressReturnToRooms = true;
	}
}

TrooperCreep.prototype = Object.create(BaseCreep.prototype);

TrooperCreep.prototype.act = function() {
	
	if (this.state === "movingToRemoteRoom" && this.mobAttackRoomName) {
		this.state = "trooping";
	}

	if (!BaseCreep.prototype.act.call(this)) {

		var acted = false;

		if (this.isMobTrooper) {
			if (!this.mobAttackRoomName && this.creep.room.name !== this.remoteRoomName) {

				this.state = "movingToRemoteRoom";
				acted = true;

			} else if (!this.mobAttackRoomName && this.creep.room.name === this.remoteRoomName) {

				this.state = "trooping";

			} else if (this.state === "movingToMobRoom") {

				if (this.creep.room.name === this.mobAttackRoomName) {
					// NOTE: Creep must step off the exit edge of the room immediately
					//  or will be sent back to the other room
					this.moveIntoRoom();
					this.memory.takeStepsIntoRoom = 2;
					this.state = "trooping";

				} else {
					this.moveToExit(this.mobAttackRoomName);
				}

				acted = true;
			} else if (this.creep.room.name != this.mobAttackRoomName) {

				this.state = "movingToMobRoom"
				acted = true;
			}
		}

		if (!acted) {

			if (enemyTools.hasRoomEnemies(this.creep.room.name)) {

				this.attack();

			} else {

				if (Game.flags["post-" + this.creep.room.name]) {
					this.creep.moveTo(Game.flags["post-" + this.creep.room.name].pos);
				} else {
					this.creep.moveTo(this.creep.room.controller);
				}
			}
		}
	}
}

TrooperCreep.prototype.attack = function() {
}

TrooperCreep.prototype.getInitialState = function() {
	return "trooping";
}

TrooperCreep.initializeSpawnCreepMemory = function(room, spawn, creepsSpawnRule, spawnOrderMaxSpawnedCount, currentSpawnedCount) {

	var creepMemory;
	var initializeCreepMemory = false;
	var isMobTrooper = (creepsSpawnRule && creepsSpawnRule.isMobTroopers) ? true : false;

	if (isMobTrooper) {
		initializeCreepMemory = true;
	} else if (creepsSpawnRule.minTroopersWaiting && currentSpawnedCount < creepsSpawnRule.minTroopersWaiting) {
		initializeCreepMemory = true;
	} else if (enemyTools.hasRoomEnemies(room.name)) {
		initializeCreepMemory = true;
	}

	if (initializeCreepMemory) {
		creepMemory = {
			isTrooper: true,
			isMobTrooper: isMobTrooper,
		}
	}

	return creepMemory;
}


module.exports = TrooperCreep