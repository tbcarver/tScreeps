
var debug = require("../debug");

var creepBase = {};

creepBase.act = function(creep) {

	var acted = false;

	// if (creep.ticksToLive < 50) {

	// 	var result = global.spawn.renewCreep(creep);
		
	// 	if (result == OK) {

	// 		debug.highlight("creep was renewed. " + creep.ticksToLive);

	// 	} else if (result == ERR_NOT_IN_RANGE) {
			
	// 		debug.temp("creep going to renew. " + creep.ticksToLive);
	// 		creep.moveTo(global.spawn);
	// 		acted = true;
	// 	}
	// }

	return acted;
}


module.exports = creepBase