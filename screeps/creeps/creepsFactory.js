
var creepsConstructors = require("./creepsConstructors");

var creepsFactory = {};

creepsFactory.buildCreep = function(creep) {

	var constructor = creepsConstructors[creep.memory.type];
	var customCreep = new constructor(creep);

	// if (creep.memory.type === "remoteClaimer") {
	// 	// creep.memory.state = "suicide";
	// 	creep.suicide();
	// 	// debug.temp("creep:", creep)
	// 	// debug.temp("creep memory:", creep.memory)
	// }

	return customCreep;
}


module.exports = creepsFactory;