
var rangedAttackStrategy = {};

rangedAttackStrategy.getBodyPartsObject = function(spawnCapacity) {

	var bodyPartsObject = {
		move: 2,
		rangedAttack: 1,
		tough: 1,
	};

	if (spawnCapacity >= 380) {
		bodyPartsObject = {
			move: 4,
			rangedAttack: 1,
			tough: 3,
		};
	}

	if (spawnCapacity >= 520) {
		bodyPartsObject = {
			move: 4,
			rangedAttack: 2,
			tough: 2,
		};
	}

	if (spawnCapacity >= 720) {
		bodyPartsObject = {
			move: 5,
			rangedAttack: 3,
			tough: 2,
		};
	}

	if (spawnCapacity >= 920) {
		bodyPartsObject = {
			move: 6,
			rangedAttack: 4,
			tough: 2,
		};
	}

	return bodyPartsObject
}


module.exports = rangedAttackStrategy;