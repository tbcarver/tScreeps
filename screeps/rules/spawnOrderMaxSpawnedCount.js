
// NOTE: The design is to keep the object literal notation simple while allowing more properties.
//  i.e. simple type with count
//  { spawnEnergizer: 3 }
//  i.e. complex type with count
//  { dropTransferer: 2, creepSubType: "5d2746bf1a7f3a1ac0a973da", creepMemory: { sourceId: "5d2746bf1a7f3a1ac0a973da" } }

// Because Objects do not have a guaranteed order, check for nonCreepTypes to find the unknown creepType
function SpawnOrderMaxSpawnedCount() {
}

SpawnOrderMaxSpawnedCount.nonCreepTypeProperties = [
	"creepMemory",
	"creepSubType",
];

SpawnOrderMaxSpawnedCount.getCreepTypeKey = function(spawnOrderMaxSpawnedCount) {

	var creepType = SpawnOrderMaxSpawnedCount.getCreepType(spawnOrderMaxSpawnedCount);

	return SpawnOrderMaxSpawnedCount.buildCreepTypeKey(creepType, spawnOrderMaxSpawnedCount.creepSubType);
}

SpawnOrderMaxSpawnedCount.getCreepType = function(spawnOrderMaxSpawnedCount) {

	var type;

	for (var key in spawnOrderMaxSpawnedCount) {
		if (!SpawnOrderMaxSpawnedCount.nonCreepTypeProperties.includes(key)) {
			type = key;
			break;
		}
	}

	return type;
}

SpawnOrderMaxSpawnedCount.getCreepSubType = function(spawnOrderMaxSpawnedCount) {

	return spawnOrderMaxSpawnedCount.creepSubType;
}

SpawnOrderMaxSpawnedCount.buildCreepTypeKey = function(creepType, creepSubType) {

	var creepTypeKey = creepType;

	if (creepSubType) {
		creepTypeKey = creepTypeKey + "-" + creepSubType;
	}

	return creepTypeKey;
}

SpawnOrderMaxSpawnedCount.find = function(spawnOrderMaxSpawnedCounts, creepType, creepSubType) {

	var spawnOrderMaxSpawnedCount;

	if (creepSubType) {

		spawnOrderMaxSpawnedCounts = _.filter(spawnOrderMaxSpawnedCounts, spawnOrderMaxSpawnedCount => SpawnOrderMaxSpawnedCount.getCreepType(spawnOrderMaxSpawnedCount) === creepType);
		spawnOrderMaxSpawnedCount = _.find(spawnOrderMaxSpawnedCounts, { creepSubType: creepSubType });

	} else {
		spawnOrderMaxSpawnedCount = _.find(spawnOrderMaxSpawnedCounts, spawnOrderMaxSpawnedCount => SpawnOrderMaxSpawnedCount.getCreepType(spawnOrderMaxSpawnedCount) === creepType);
	}

	return spawnOrderMaxSpawnedCount;
}

SpawnOrderMaxSpawnedCount.filter = function(spawnOrderMaxSpawnedCounts, creepType) {

	return _.filter(spawnOrderMaxSpawnedCounts, spawnOrderMaxSpawnedCount => SpawnOrderMaxSpawnedCount.getCreepType(spawnOrderMaxSpawnedCount) === creepType);
}


module.exports = SpawnOrderMaxSpawnedCount;