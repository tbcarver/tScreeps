
var creepsConstructors = require("./creepsConstructors");

var creepsFactory = {};

/** @param {Creep} creep */
creepsFactory.buildCreep = function(creep) {

	if (creep.memory.type && creepsConstructors[creep.memory.type]) {

		var constructor = creepsConstructors[creep.memory.type];
		var baseCreep = new constructor(creep);

		// // if (creep.name === "a31078") {
		// if (creep.memory.type === "builder") {
		// 	if (baseCreep.spawnedRoomName === "W7N8") {
		// // 		if (!baseCreep.remoteRoomName) {
		// 					creep.memory.state = "suicide";
		// // 			// 		// creep.suicide();
		// // // 			// // 		// debug.temp("creep:", creep)
		// // // 			debug.temp("creep memory:", creep.memory)
		// // 		}
		// // 	}
		// }

		// }

	} else {
		debug.danger("Creep constructor not found for creep type: " + creep.memory.type);
	}

	return baseCreep;
}


module.exports = creepsFactory;