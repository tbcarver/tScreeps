
var services = require("../../../screeps/services");
var bodyPartsFactory = require("../../../screeps/creeps/bodies/bodyPartsFactory");
global._ = require("lodash");
var constants = require("@screeps/common/lib/constants");

_.forEach(constants, (value, key) => {
	global[key] = value;
})

function getBodyPartsObjectTest() {

	for (var count = 2; count<=8; count++) {	
		
		var baseCapacity = 100 * count;
		
		getBodyPartsObjectTestWithSpawnCapacity(baseCapacity);
		getBodyPartsObjectTestWithSpawnCapacity(baseCapacity + 1);
		getBodyPartsObjectTestWithSpawnCapacity(baseCapacity + 49);
		getBodyPartsObjectTestWithSpawnCapacity(baseCapacity + 50);
		getBodyPartsObjectTestWithSpawnCapacity(baseCapacity + 99);
	}
}

function getBodyPartsObjectTestWithSpawnCapacity(spawnCapacity){

	services.spawnTools = {
		calculateSpawnCapacity: function() {
			return spawnCapacity;
		},
		calculateBodyCost: services.spawnTools.calculateBodyCost
	}
	var bodyPart = bodyPartsFactory.getBodyParts("worker");
	var bodyCost = services.spawnTools.calculateBodyCost(bodyPart);
	console.log(spawnCapacity, bodyCost, JSON.stringify(bodyPart));
}

getBodyPartsObjectTest();