function Place(newPlace) {
    this.xCoordinate = newPlace[0];
    this.yCoordinate = newPlace[1];
    this.faceDirection = newPlace[2];
    this.validFaceDirections = ["NORTH", "SOUTH", "WEST", "EAST"];
}

Place.prototype = function() {
    var getPlace = function() {
        return [this.xCoordinate, this.yCoordinate, this.faceDirection].join();
    };

    var isSameAsCurrentPlace = function(table) {
        if (table.isToyRobotPlaced == false) {
            return false;
        } else if (this.xCoordinate == table.currentToyRobotPlace.xCoordinate &&
            this.yCoordinate == table.currentToyRobotPlace.yCoordinate &&
            this.faceDirection == table.currentToyRobotPlace.faceDirection) {
            return true;
        }
        return false;
    };

    var isValidPlace = function() {
        if (!isNaN(parseInt(this.xCoordinate)) && !isNaN(parseInt(this.xCoordinate)) &&
            !isNaN(this.yCoordinate) && !isNaN(this.yCoordinate) &&
            this.xCoordinate >= 0 && this.xCoordinate <= 4 &&
            this.yCoordinate >= 0 && this.yCoordinate <= 4 &&
            this.validFaceDirections.indexOf(this.faceDirection) != -1) {
            return true;
        }
        return false;
    };

    var isValidToMove = function() {
        // Bottom boundary
        if (this.yCoordinate == 0 && this.faceDirection == "SOUTH") {
            return false;
            // Top boundary
        } else if (this.yCoordinate == 4 && this.faceDirection == "NORTH") {
            return false;
            // Left boundary
        } else if (this.xCoordinate == 0 && this.faceDirection == "WEST") {
            return false;
            // Right boundary
        } else if (this.xCoordinate == 4 && this.faceDirection == "EAST") {
            return false;
            // If the toy robot is somehow placed off the table (not permitted) do not let it move
        } else if (!this.isValidPlace()) {
            return false;
        } else {
            return true;
        }
    };

    return {
        getPlace: getPlace,
        isSameAsCurrentPlace: isSameAsCurrentPlace,
        isValidPlace: isValidPlace,
        isValidToMove: isValidToMove
    };
}();

module.exports = Place;