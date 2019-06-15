
var attackerStrategy = {};

attackerStrategy.getBodyPartsObject = function(spawnCapacity) {

	var bodyPartsObject = {
		move: 4,
		attack: 1,
		tough: 3,
	};

	if (spawnCapacity >= 500) {
		bodyPartsObject = {
			move: 6,
			attack: 2,
			tough: 4,
		};
	}

	if (spawnCapacity >= 690) {
		bodyPartsObject = {
			move: 8,
			attack: 3,
			tough: 5,
		};
	}

	return bodyPartsObject
}


module.exports = attackerStrategy;