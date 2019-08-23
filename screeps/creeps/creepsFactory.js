
var creepsConstructors = require("./creepsConstructors");

var creepsFactory = {};

/** @param {Creep} creep */
creepsFactory.buildCreep = function(creep) {

	if (creep.memory.type && creepsConstructors[creep.memory.type]) {

		var constructor = creepsConstructors[creep.memory.type];
		var baseCreep = new constructor(creep);

		adjustCreep(creep, creep.memory, baseCreep);

	} else {
		debug.danger("Creep constructor not found for creep type: " + creep.memory.type);
	}

	return baseCreep;
}

function adjustCreep(creep, memory, baseCreep) {

	// if (!baseCreep.isTrooper) {
	// if (memory.type === "controllerEnergizer") {
		// if (creep.room.name === "W11N17") {
			// 		// if (memory.remoteRoomName && memory.state === "movingToSpawnedRoom") {
			// 			// memory.takeStepsIntoRoom = 6
			// memory.spawnedRoomName = "W10N17";
			// memory.remoteRoomName = "W11N17";
			// memory.state = "movingToRemoteRoom"
			// memory.state = "suicide"
			// memory.canPickup = true;
			// memory.canBuild = false;
			// creep.suicide();
			// 					// creep.say("ok")
			// // // 			// // 		// debug.temp("creep:", creep)
			// // // 			debug.temp("creep memory:", memory)
			// 		// }
			// // 	}
		// }
	// }
}


module.exports = creepsFactory;