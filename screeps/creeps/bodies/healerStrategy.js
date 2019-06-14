
var rangedAttackStrategy = {};

rangedAttackStrategy.getBodyPartsObject = function(spawnCapacity) {

	var bodyPartsObject = {
		move: 1,
		heal: 1,
	};

	if (spawnCapacity >= 600) {
		bodyPartsObject = {
			move: 2,
			heal: 2,
		};
	}

	if (spawnCapacity >= 900) {
		bodyPartsObject = {
			move: 3,
			heal: 3,
		};
	}

	return bodyPartsObject
}


module.exports = rangedAttackStrategy;