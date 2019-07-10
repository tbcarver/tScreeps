
var roomTools = require("./roomTools");
var { rules } = require("../rules/rules");

var enemyTools = {};

enemyTools.manageEnemies = function() {

	this.enemyStats = buildEnemyStats();
	this.hasEnemies = this.enemyStats.countRoomsWithEnemies > 0;
	this.mobPostsMobAttackRooms = {};

	if (!Memory.state.mobPostsMobAttackRooms) {
		Memory.state.mobPostsMobAttackRooms = {};
	}

	for (var mobPostRoomName in Memory.state.mobPostsMobAttackRooms) {

		var mobAttackRoom = Memory.state.mobPostsMobAttackRooms[mobPostRoomName];

		if (!this.enemyStats.roomNameEnemyStats[mobPostRoomName]) {
			mobAttackRoom.coolDownCount--;
		}

		if (mobAttackRoom.coolDownCount <= 0) {
			delete Memory.state.mobPostsMobAttackRooms[mobPostRoomName];
		} else {
			this.mobPostsMobAttackRooms[mobPostRoomName] = Memory.state.mobPostsMobAttackRooms[mobPostRoomName];
		}
	}
}

enemyTools.hasRoomEnemies = function(roomName) {

	if (this.hasEnemies > 0 && this.enemyStats.roomNameEnemyStats[roomName]) {
		return true;
	} else {
		return false;
	}
}

enemyTools.hasRoomEnemiesAndNoTower = function(roomName) {

	if (this.hasEnemies > 0 && this.enemyStats.roomNameEnemyStats[roomName] && !this.enemyStats.roomNameEnemyStats[roomName].hasTower) {
		return true;
	} else {
		return false;
	}
}

enemyTools.getMobAttackRoomName = function(mobPostRoomName) {

	var mobAttackRoomName;

	if (this.mobPostsMobAttackRooms[mobPostRoomName]) {

		mobAttackRoomName = this.mobPostsMobAttackRooms[mobPostRoomName].mobAttackRoomName;

	} else if (this.hasEnemies) {

		var watchRoomNames = roomTools.getAdjacentRoomNames(mobPostRoomName);
		watchRoomNames.push(mobPostRoomName);

		var watchedEnemyStats = _.filter(this.enemyStats.roomNameEnemyStats, roomNameEnemyStat => !roomNameEnemyStat.hasTower &&
			watchRoomNames.includes(roomNameEnemyStat.roomName));

		if (watchedEnemyStats.length > 0) {

			// Boolean sorted false then true, integer sorted lowest then highest
			watchedEnemyStats = _.sortBy(watchedEnemyStats, ["isRoomOwned", "enemyCount"]);
			this.mobPostsMobAttackRooms[mobPostRoomName] = {
				mobAttackRoomName: watchedEnemyStats[watchedEnemyStats.length - 1].roomName,
				coolDownCount: rules.mobAttackRoomCoolDownCount
			}

			Memory.state.mobPostsMobAttackRooms[mobPostRoomName] = this.mobPostsMobAttackRooms[mobPostRoomName]
		}
	}

	return mobAttackRoomName;
}

function buildEnemyStats() {

	var enemyStats = {
		countRoomsWithEnemies: 0,
		roomNameEnemyStats: {}
	};

	for (var roomName in Game.rooms) {

		var room = Game.rooms[roomName];

		const enemies = room.find(FIND_HOSTILE_CREEPS);

		if (enemies.length > 0) {

			enemyStats.roomNameEnemyStats[roomName] = {
				roomName: roomName,
				enemyCount: enemies.length,
				isRoomOwned: (room.controller && room.controller.my) ? true : false,
			}

			var towers = room.find(FIND_MY_STRUCTURES, {
				filter: { structureType: STRUCTURE_TOWER }
			});

			enemyStats.roomNameEnemyStats[roomName].hasTower = towers.length > 0;

			enemyStats.countRoomsWithEnemies++;

			var health = "";
			for (enemy of enemies) {
				health += enemy.hits + " " + Math.ceil((enemy.hits / enemy.hitsMax) * 100) + "% " +
					enemy.ticksToLive + " ";
			}

			debug.danger(room.name + " Enemies!", health);
		}
	}

	return enemyStats;
}


module.exports = enemyTools;