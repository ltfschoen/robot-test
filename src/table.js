var Place = require('./place');
var matrix = require('../utils/matrix');

function Table() {
    this.isToyRobotPlaced = false;
    this.currentToyRobotPlace = new Place("","","");
    this.historyOfToyRobotPlaces = [];
    this.units = matrix.coordinatesAndFacingMatrix();
}

Table.prototype.changeToyRobotPlace = function(newPlace) {
    // Remove facing value from old place in matrix
    var oldPlace = this.currentToyRobotPlace;
    this.units[[oldPlace.xCoordinate, oldPlace.yCoordinate]] = "";

    // Add new face value associated with new place in matrix
    this.units[[newPlace.xCoordinate, newPlace.yCoordinate]] = newPlace.faceDirection;
    this.currentToyRobotPlace = newPlace;
    this.historyOfToyRobotPlaces.push(newPlace);
    this.isToyRobotPlaced = true;
    return true;
};

Table.prototype.getCoordinatesOfPlaceToMoveTo = function() {
    var moveBy = { xMove: 0, yMove: 0 };

    var oldPlace = this.currentToyRobotPlace;
    if (oldPlace.faceDirection == "NORTH") {
        moveBy.yMove += 1;
    } else if (oldPlace.faceDirection == "SOUTH") {
        moveBy.yMove -= 1;
    } else if (oldPlace.faceDirection == "EAST") {
        moveBy.xMove += 1;
    } else if (oldPlace.faceDirection == "WEST") {
        moveBy.xMove -= 1;
    }
    return moveBy;
};

Table.prototype.moveToyRobot = function() {
    // Remove facing value from old place in matrix
    var oldPlace = this.currentToyRobotPlace;
    this.units[[oldPlace.xCoordinate, oldPlace.yCoordinate]] = "";

    var moveBy = this.getCoordinatesOfPlaceToMoveTo();

    // Add new face value associated with new place in matrix
    this.units[[oldPlace.xCoordinate + moveBy.xMove, oldPlace.yCoordinate + moveBy.yMove]] = oldPlace.faceDirection;

    // Update current toy robot place with coordinates resulting from the move
    this.currentToyRobotPlace.xCoordinate = parseInt(this.currentToyRobotPlace.xCoordinate) + moveBy.xMove;
    this.currentToyRobotPlace.yCoordinate = parseInt(this.currentToyRobotPlace.yCoordinate) + moveBy.yMove;

    // Remove and replace the current toy robot place object stored in last position of history
    this.historyOfToyRobotPlaces.pop();
    this.historyOfToyRobotPlaces.push(oldPlace);

    return true;
};

Table.prototype.getDirectionForRotation = function(rotation) {
    var oldPlace = this.currentToyRobotPlace;
    var newDirecton;

    if (rotation == "LEFT") {
        if (oldPlace.faceDirection == "NORTH") {
            newDirecton = "WEST";
        } else if (oldPlace.faceDirection == "SOUTH") {
            newDirecton = "EAST";
        } else if (oldPlace.faceDirection == "EAST") {
            newDirecton = "NORTH";
        } else if (oldPlace.faceDirection == "WEST") {
            newDirecton = "SOUTH";
        }
    } else if (rotation == "RIGHT") {
        if (oldPlace.faceDirection == "NORTH") {
            newDirecton = "EAST";
        } else if (oldPlace.faceDirection == "SOUTH") {
            newDirecton = "WEST";
        } else if (oldPlace.faceDirection == "EAST") {
            newDirecton = "SOUTH";
        } else if (oldPlace.faceDirection == "WEST") {
            newDirecton = "NORTH";
        }
    }
    return newDirecton;
};

Table.prototype.rotateToyRobot = function(rotation) {
    var oldPlace = this.currentToyRobotPlace;
    var newDirection = this.getDirectionForRotation(rotation)

    // Add new face value associated with existing place in matrix
    this.units[[oldPlace.xCoordinate, oldPlace.yCoordinate]] = newDirection;

    // Update current toy robot place with new direction
    this.currentToyRobotPlace.faceDirection = newDirection;

    // Remove and replace the current toy robot place object stored in last position of history
    this.historyOfToyRobotPlaces.pop();
    this.historyOfToyRobotPlaces.push(oldPlace);

    return true;
};

Table.prototype.reportCurrentToyRobotPlace = function() {
    // Ignore REPORT command prior to first PLACE command
    if (!this.didMakeFirstPlace) { return ""; }
    return this.currentToyRobotPlace.getPlace();
};

Table.prototype.reportHistoryOfToyRobotPlaces = function() {
    // Ignore REPORT command prior to first PLACE command
    if (!this.didMakeFirstPlace) { return ""; }

    var currentPlace = this.currentToyRobotPlace.getPlace();
    // Exclude current place when fetching from history
    var prevPlaces = this.historyOfToyRobotPlaces.slice(0, -1);
    var prevPlacesArr = [];
    for (var element = 0, totalLength = prevPlaces.length; element < totalLength; element++) {
        prevPlacesArr.push(prevPlaces[element].getPlace());
    }
    return prevPlacesArr.concat(currentPlace).join("\n");
};

Table.prototype.didMakeFirstPlace = function() {
    return this.isToyRobotPlaced;
};

module.exports = Table;