
var towersController = {};

towersController.tick = function() {

	for (var roomName in Game.rooms) {

		var room = Game.rooms[roomName];
		var towers = room.find(FIND_STRUCTURES, {
			filter: structure => structure.structureType === STRUCTURE_TOWER
		});

		if (towers.length > 0) {

			var enemies = room.find(FIND_HOSTILE_CREEPS);
			if (enemies.length > 0) {

				for (var tower of towers) {
					tower.attack(enemies[0]);
				}
			} else {

				var structures = room.find(FIND_STRUCTURES, {
					filter: structure => structure.hits < structure.hitsMax &&
						!(structure.structureType === STRUCTURE_WALL || structure.structureType === STRUCTURE_RAMPART)
				});

				if (structures.length > 0) {
					for (var index = 0; index < towers.length; index++) {

						if (structures.length >= index + 1) {
							towers[index].repair(structures[index]);
						}
					}
				}
			}
		}
	}
}

towersController.repair = function(towers) {
}


module.exports = towersController;