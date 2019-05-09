
var assert = require("assert");
var simple = require("simple-mock");

var Builder = require("../../../../screeps/creeps/energyWorkers/builder");

describe("/screeps/creeps/energyWorkers/builder", function() {
	before(() => {
		require("../../../mocks/screepsGlobals");
	});

	describe("Builder()", function() {
		it("should return a new Builder object", function() {

			var creep = {
				memory: {
					type: "builder",
					state: {}
				}
			}

			var builder = new Builder(creep);

			assert.notStrictEqual(builder, undefined);
			assert.strictEqual(builder.creep, creep);
			assert.strictEqual(builder.memory, creep.memory);
			assert.strictEqual(builder.type, creep.memory.type);
			assert.strictEqual(builder.state, creep.memory.state);
		});
	});

	describe("initializeSpawnCreepMemory()", function() {
		it("should return undefined with no construction sites", function() {

			global.room = {};
			simple.mock(global.room, "find").returnWith([]);

			var memory = Builder.initializeSpawnCreepMemory();

			assert.strictEqual(memory, undefined);
		});

		it("should return creepMemory with construction sites", function() {

			global.room = {};
			simple.mock(global.room, "find").returnWith([{}]);

			var memory = Builder.initializeSpawnCreepMemory();

			assert.notStrictEqual(memory, undefined);
			assert.strictEqual(memory.type, "builder");
			assert.strictEqual(memory.bodyPartsType, "energyWorker");
		});
	});
});