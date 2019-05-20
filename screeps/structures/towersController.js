
var towersController = {};

towersController.tick = function() {

	var towers = room.find(FIND_STRUCTURES, {
		filter: structure => structure.structureType === STRUCTURE_TOWER
	});

	if (towers.length > 0){

		for (var tower of towers){
			this.act(tower);
		}
	}
}

towersController.act = function(tower) {

	this.attack(tower);
}

towersController.attack = function(tower) {

	const enemies = room.find(FIND_HOSTILE_CREEPS);

	if (enemies.length > 0) {
		
		tower.attack(enemies[0]);
	}
}


module.exports = towersController;