
var creepsConstructors = require("./creepsConstructors");

var creepsFactory = {};

/** @param {Creep} creep */
creepsFactory.buildCreep = function(creep) {

	if (creep.memory.type && creepsConstructors[creep.memory.type]) {

		var constructor = creepsConstructors[creep.memory.type];
		var baseCreep = new constructor(creep);

		// if (!baseCreep.isTrooper) {
		// if (creep.memory.type === "controllerEnergizer") {
			// if (creep.room.name === "W12N17") {
		// 		// if (creep.memory.remoteRoomName && creep.memory.state === "movingToSpawnedRoom") {
		// 			// creep.memory.takeStepsIntoRoom = 6
		// 					creep.memory.spawnedRoomName = "W8N9";
							// creep.memory.state = "suicide"
							// creep.suicide();
		// 					// creep.say("ok")
		// // // 			// // 		// debug.temp("creep:", creep)
		// // // 			debug.temp("creep memory:", creep.memory)
		// 		// }
		// // 	}
		// 	}
		// }

	} else {
		debug.danger("Creep constructor not found for creep type: " + creep.memory.type);
	}

	return baseCreep;
}


module.exports = creepsFactory;