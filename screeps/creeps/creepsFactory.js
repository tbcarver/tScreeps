
var creepsConstructors = require("./creepsConstructors");

var creepsFactory = {};

creepsFactory.buildCreep = function(creep) {

	if (creep.memory.type && creepsConstructors[creep.memory.type]) {

		var constructor = creepsConstructors[creep.memory.type];
		var baseCreep = new constructor(creep);

		// TEMP
		if (baseCreep.state === "movingToRoom") {
			baseCreep.state = "movingToSpawnedRoom";
		}
	
		// if (creep.memory.type === "builder") {
		// 	if (baseCreep.remoteRoomName === "W7N10") {
		// 		creep.memory.state = "suicide";
		// 		// creep.suicide();
		// // 		// debug.temp("creep:", creep)
		// // 		// debug.temp("creep memory:", creep.memory)
		// 	}
		// }

	} else {
		debug.error("Creep constructor not found for creep type: " + creep.memory.type);
	}

	return baseCreep;
}


module.exports = creepsFactory;