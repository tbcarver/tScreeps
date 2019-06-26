
var healerToughStrategy = {};

healerToughStrategy.getBodyPartsObject = function(spawnCapacity) {

	var bodyPartsObject = {
		move: 1,
		heal: 1,
	};

	if (spawnCapacity >= 450) {
		bodyPartsObject = {
			move: 3,
			heal: 1,
			tough: 5,
		};
	}

	if (spawnCapacity >= 650) {
		bodyPartsObject = {
			move: 6,
			heal: 1,
			tough: 10,
		};
	}

	if (spawnCapacity >= 900) {
		bodyPartsObject = {
			move: 6,
			heal: 2,
			tough: 10,
		};
	}

	if (spawnCapacity >= 900) {
		bodyPartsObject = {
			move: 6,
			heal: 2,
			tough: 10,
		};
	}

	if (spawnCapacity >= 1250) {
		bodyPartsObject = {
			move: 11,
			heal: 2,
			tough: 20,
		};
	}

	if (spawnCapacity >= 1550) {
		bodyPartsObject = {
			move: 12,
			heal: 3,
			tough: 20,
		};
	}

	return bodyPartsObject
}


module.exports = healerToughStrategy;