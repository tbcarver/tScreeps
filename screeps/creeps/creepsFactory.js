
var creepsConstructors = require("./creepsConstructors");

var creepsFactory = {};

/** @param {Creep} creep */
creepsFactory.buildCreep = function(creep) {

	if (creep.memory.type && creepsConstructors[creep.memory.type]) {

		var constructor = creepsConstructors[creep.memory.type];
		var baseCreep = new constructor(creep);

		// if (creep.name === "a31078") {
		// if (creep.memory.type === "remoteSpawnedStorageTransferer") {
			// if (baseCreep.spawnedRoomName === "W7N8") {
				// if (creep.memory.state === "energizing") {
					// creep.memory.state = "transferring"
							// creep.memory.remoteRoomName = "W9N9";
							// creep.memory.state = "suicide"
		// 			// 		// creep.suicide();
		// // 			// // 		// debug.temp("creep:", creep)
		// // 			debug.temp("creep memory:", creep.memory)
				// }
		// 	}
		// }
	// }

	} else {
		debug.danger("Creep constructor not found for creep type: " + creep.memory.type);
	}

	return baseCreep;
}


module.exports = creepsFactory;