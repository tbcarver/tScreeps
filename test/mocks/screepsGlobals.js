
var _ = require("lodash");
global._ = _;

var constants = require("@screeps/common/lib/constants");
_.forEach(constants, (value, key) => {
	global[key] = value;
})

global.Game = {};
global.Memory = {};

global.debug = function(){};
global.spawn = {}
global.room = {};
global.controller = {};