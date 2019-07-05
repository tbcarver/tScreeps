
var gameTools = {};

gameTools.hasCoolOffed = function(coolOffKey, coolOffCount) {

	var hasCoolOffed = false;

	if (!Memory.state.gameCoolOffs) {
		Memory.state.gameCoolOffs = {};
	}

	if (!Memory.state.gameCoolOffs[coolOffKey]) {

		Memory.state.gameCoolOffs[coolOffKey] = Game.time;

	} else if (Game.time - Memory.state.gameCoolOffs[coolOffKey] > coolOffCount) {

		hasCoolOffed = true;
		Memory.state.gameCoolOffs[coolOffKey] = Game.time;
	}

	return hasCoolOffed;
}


module.exports = gameTools;