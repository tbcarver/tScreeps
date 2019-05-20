
var { creepConstructors } = require("./creepTypes");

var customCreepFactory = {};

customCreepFactory.buildCreep = function(creep) {

	var constructor = creepConstructors[creep.memory.type];
	var customCreep = new constructor(creep);

	// if (creep.memory.type === "remoteHarvester") {
	// 	creep.suicide();
	// 	// debug.temp("creep:", creep)
	// 	// debug.temp("creep memory:", creep.memory)
	// }

	return customCreep;
}


module.exports = customCreepFactory;