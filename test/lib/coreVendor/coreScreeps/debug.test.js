
var assert = require("assert");
var simple = require("simple-mock");

var debug = require("../../../../lib/coreVendor/coreScreeps/debug");

describe("/lib/coreVendor/coreScreeps/debug", function() {

	describe("toDisplayObject()", function() {
		it("todo", function() {

			global.console = {};
			simple.mock(global.console, "log");

			var structure = [{"type":"structure","structure":{"room":{"name":"W1S0","energyAvailable":700,"energyCapacityAvailable":700,"visual":{"roomName":"W1S0"}},"pos":{"x":36,"y":18,"roomName":"W1S0"},"id":"2166899db048a3e","store":{"energy":2000},"storeCapacity":2000,"ticksToDecay":442,"hits":250000,"hitsMax":250000,"structureType":"container"}},{"type":"terrain","terrain":"plain"}];
			var memory = debug(structure);

			assert(global.console.log)
		});
	});

	describe("toDisplayObject()", function() {
		it("todo", function() {

			global.console = {};
			simple.mock(global.console, "log");

			var structure = [{"type":"structure","structure":{"room":{"name":"W1S0","energyAvailable":506,"energyCapacityAvailable":700,"visual":{"roomName":"W1S0"}},"pos":{"x":32,"y":18,"roomName":"W1S0"},"id":"06cc817b2c2b13f","name":"spawn1","energy":256,"energyCapacity":300,"spawning":null,"owner":{"username":"carver230620"},"my":true,"hits":5000,"hitsMax":5000,"structureType":"spawn"}},{"type":"terrain","terrain":"plain"}];
			var memory = debug(structure);
		});
	});

	describe("toDisplayObject()", function() {
		it("todo", function() {

			global.console = {};
			simple.mock(global.console, "log");

			var structure = {"room":{"name":"W1S0","energyAvailable":700,"energyCapacityAvailable":700,"visual":{"roomName":"W1S0"}},"pos":{"x":32,"y":18,"roomName":"W1S0"},"id":"06cc817b2c2b13f","name":"spawn1","energy":300,"energyCapacity":300,"spawning":null,"owner":{"username":"carver230620"},"my":true,"hits":5000,"hitsMax":5000,"structureType":"spawn"};
			var memory = debug(structure);
		});
	});
});