
var spawnTools = require("../tools/spawnTools");
var { rules } = require("../rules/rules");
var creepsSpawner = require("../creeps/creepsSpawner");

var observersController = {};

observersController.tick = function() {

	var observingRooms = [];

	if (Memory.state.observingRooms) {
		observingRooms = [...Object.keys(Memory.state.observingRooms)];
	}

	if (rules.observingRooms) {

		observingRooms = [...observingRooms, ...rules.observingRooms];
		observingRooms = _.uniq(observingRooms);
	}

	var observers = [];

	for (var roomName in Game.rooms) {

		var room = Game.rooms[roomName];
		var structures = room.find(FIND_STRUCTURES, {
			filter: {
				structureType: STRUCTURE_OBSERVER
			}
		});

		if (structures.length > 0) {
			observers = [...observers, ...structures];
		}
	}

	if (observers.length > 0) {
		if ((observingRooms.length > 0) || (Memory.state.nextObservingRooms && Memory.state.nextObservingRooms.length > 0)) {

			if (!Memory.state.nextObservingRooms || Memory.state.nextObservingRooms.length === 0) {
				Memory.state.nextObservingRooms = _.clone(rules.observingRooms);
			}

			if (Memory.state.nextObservingRooms) {
				for (var observer of observers) {

					var observingRoom = Memory.state.nextObservingRooms.shift();
					if (observingRoom) {

						var result = observer.observeRoom(observingRoom);
						if (result !== OK) {
							debug.warning(`Observe room ${observingRoom} from observer ${observer.room.name} failed: ${result}`);
						}
					}
				}
			}
		}
	} else if (observingRooms.length > 0) {

		for (var observingRoom of observingRooms) {

			if (observingRoom) {

				var scheduleId = "observersController" + observingRoom;

				if (!Game.rooms[observingRoom]) {

					var spawn = spawnTools.getRandomSpawn();

					if (spawn) {

						var remoteRoomCreepsSpawnRule = {
							roomName: observingRoom,
							spawnOrderMaxSpawnedCounts: [
								{ healer: 1 },
							],
							partsPerMove: 1,
						}

						creepsSpawner.scheduleOneTimeOneCreepRemoteRoomCreepsSpawnRule(spawn.room.name, remoteRoomCreepsSpawnRule, scheduleId);
					}
				} else {
					creepsSpawner.unscheduleOneTimeOneCreepRemoteRoomCreepsSpawnRule(scheduleId);
				}
			}
		}
	}
}

module.exports = observersController;