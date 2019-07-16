
var flagTools = {};

flagTools.getDropFlag = function(roomName) {

	return Game.flags[`drop-${roomName}`];
}

flagTools.hasDropFlag = function(roomName) {

	return (Game.flags[`drop-${roomName}`]) ? true : false;
}

module.exports = flagTools;