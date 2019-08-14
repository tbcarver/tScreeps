
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
				if (!this.mobAttackRoomName && this.roomName !== this.remoteRoomName) {

					this.state = "movingToRemoteRoom";
					acted = true;

				} else if (!this.mobAttackRoomName && this.roomName === this.remoteRoomName) {

					this.state = "trooping";

				} else if (this.state === "movingToMobRoom") {

					if (this.roomName === this.mobAttackRoomName) {
						// NOTE: Creep must step off the exit edge of the room immediately
						//  or will be sent back to the other room
						this.moveIntoRoom();
						this.memory.takeStepsIntoRoom = 2;
						this.state = "trooping";

					} else {
						this.moveToExit(this.mobAttackRoomName);
					}

					acted = true;
				} else if (this.roomName != this.mobAttackRoomName) {

					this.state = "movingToMobRoom"
					acted = true;
				}
			}

			if (!acted) {

				if (enemyTools.hasRoomEnemies(this.roomName)) {

					this.attack();

				} else {

					var pos = Game.flags["post-" + this.roomName] ? Game.flags["post-" + this.roomName].pos : undefined;

					if (!pos) {
						pos = new RoomPosition(25, 25, this.roomName);
					}

					if (this.isInTravelDistance(pos, 2)) {
						this.travelNearTo(pos, true, 2);
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