
var enemyTools = require("../../tools/enemyTools");
var BaseCreep = require("../baseCreeps/baseCreep");

class TrooperCreep extends BaseCreep {

	/** @param {Creep} creep */
	constructor(creep) {
		super(creep);

		this.isTrooper = true;
		this.isMobTrooper = this.memory.isMobTrooper;
		this.mobAttackRoomName = enemyTools.getMobAttackRoomName(this.remoteRoomName);

		if (this.isMobTrooper) {
			this.suppressReturnToRooms = true;
		}
	}

	act() {

		if (this.state === "movingToRemoteRoom" && this.mobAttackRoomName) {
			this.state = "trooping";
		}

		var acted = super.act();

		if (!acted) {

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

		return acted;
	}

	attack() {
	}

	getInitialState() {
		return "trooping";
	}

	static initializeSpawnCreepMemory(room, spawn, creepsSpawnRule, spawnOrderMaxSpawnedCount, currentSpawnedCount) {

		/** @type {CreepMemory} */
		var creepMemory;
		var initializeCreepMemory = false;
		var isMobTrooper = (creepsSpawnRule && creepsSpawnRule.isMobTroopers) ? true : false;

		if (isMobTrooper) {
			initializeCreepMemory = true;
		} else if (!creepsSpawnRule.minTroopersWaiting || currentSpawnedCount < creepsSpawnRule.minTroopersWaiting) {
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
}


module.exports = TrooperCreep