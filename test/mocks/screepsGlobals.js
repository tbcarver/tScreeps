
var _ = require("lodash");
global._ = _;

var constants = require("@screeps/common/lib/constants");
_.forEach(constants, (value, key) => {
	global[key] = value;
})