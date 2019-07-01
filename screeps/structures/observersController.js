
var { rules } = require("../rules/rules");

var observersController = {};

observersController.tick = function() {

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
		if ((rules.observingRooms && rules.observingRooms.length > 0) || (Memory.state.nextObservingRooms && Memory.state.nextObservingRooms.length > 0)) {

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
	}
}

module.exports = observersController;