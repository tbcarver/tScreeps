
var storageTransferRule = require("./storageTransferRule");

var calculatedSpawnRules = {};

calculatedSpawnRules.addCalculatedRules = function(creepsSpawnRules) {

	storageTransferRule(creepsSpawnRules);
}


module.exports = calculatedSpawnRules;