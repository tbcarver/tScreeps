
var bodyPartsTools = require("./bodyPartsTools");

var rangedAttackStrategy = {};

rangedAttackStrategy.getBodyPartsObject = function(spawnCapacity) {

	var bodyPartsObject = {
		move: 2,
		rangedAttack: 1,
		tough: 5,
	};

	if (spawnCapacity >= 400) {
		bodyPartsObject = {
			move: 3,
			rangedAttack: 1,
			tough: 10,
		};
	}

	if (spawnCapacity >= 500) {
		bodyPartsObject = {
			move: 3,
			rangedAttack: 2,
			tough: 5,
		};
	}

	if (spawnCapacity >= 700) {
		bodyPartsObject = {
			move: 4,
			rangedAttack: 3,
			tough: 5,
		};
	}

	if (spawnCapacity >= 800) {
		bodyPartsObject = {
			move: 9,
			rangedAttack: 1,
			tough: 17,
		};
	}

	if (spawnCapacity >= 1000) {
		bodyPartsObject = {
			move: 10,
			rangedAttack: 3,
			tough: 15,
		};
	}

	if (spawnCapacity >= 1200) {
		bodyPartsObject = {
			move: 11,
			rangedAttack: 3,
			tough: 20,
		};
	}

	if (spawnCapacity >= 1400) {
		bodyPartsObject = {
			move: 13,
			rangedAttack: 3,
			tough: 30,
		};
	}

	if (spawnCapacity >= 1600) {
		bodyPartsObject = {
			move: 17,
			rangedAttack: 3,
			tough: 30,
		};
	}

	return bodyPartsObject
}


module.exports = rangedAttackStrategy;