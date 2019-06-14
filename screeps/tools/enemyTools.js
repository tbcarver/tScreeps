
var enemyTools = {};

enemyTools.manageEnemies = function() {

	this.enemyStats = buildEnemyStats();
	this.hasEnemies = this.enemyStats.countRoomsWithEnemies > 0;

	if (!this.enemyStats.roomNameEnemyStats[Memory.state.currentMobAttackRoomName]) {		
		Memory.state.currentMobAttackRoomName = null;
	}

	if (Memory.state.currentMobAttackRoomName === null && this.hasEnemies) {

		var sortedEnemyStats = _.sortBy(this.enemyStats.roomNameEnemyStats, ["isRoomOwned", "enemyCount"]);

		Memory.state.currentMobAttackRoomName = sortedEnemyStats[sortedEnemyStats.length - 1].roomName;
	}
}

enemyTools.hasRoomEnemies = function(roomName) {

	if (this.hasEnemies > 0 && this.enemyStats.roomNameEnemyStats[roomName]) {
		return true;
	} else {
		return false;
	}
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