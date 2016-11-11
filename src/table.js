var Place = require('./place');
var matrix = require('../utils/matrix');

function Table() {
    this.isToyRobotPlaced = false;
    this.currentToyRobotPlace = new Place("","","");
    this.historyOfToyRobotPlaces = [];
    this.units = matrix.coordinatesAndFacingMatrix();
}

Table.prototype = function() {
   var didMakeFirstPlace = function() {
       return this.isToyRobotPlaced;
   };

   var changeToyRobotPlace = function(newPlace) {
       // Remove facing value from old place in matrix
       this.units[[this.currentToyRobotPlace.xCoordinate, this.currentToyRobotPlace.yCoordinate]] = "";

       // Add new face value associated with new place in matrix
       this.units[[newPlace.xCoordinate, newPlace.yCoordinate]] = newPlace.faceDirection;
       this.currentToyRobotPlace = newPlace;
       this.historyOfToyRobotPlaces.push(newPlace);
       this.isToyRobotPlaced = true;
       return true;
   };

   var getCoordinatesOfPlaceToMoveTo = function() {
       var moveBy = { xMove: 0, yMove: 0 };
       if (this.currentToyRobotPlace.faceDirection == "NORTH") {
           moveBy.yMove += 1;
       } else if (this.currentToyRobotPlace.faceDirection == "SOUTH") {
           moveBy.yMove -= 1;
       } else if (this.currentToyRobotPlace.faceDirection == "EAST") {
           moveBy.xMove += 1;
       } else if (this.currentToyRobotPlace.faceDirection == "WEST") {
           moveBy.xMove -= 1;
       }
       return moveBy;
   };

   var moveToyRobot = function() {
       // Remove facing value from current place in matrix
       this.units[[this.currentToyRobotPlace.xCoordinate, this.currentToyRobotPlace.yCoordinate]] = "";

       var moveBy = this.getCoordinatesOfPlaceToMoveTo();

       // Add new face value associated with new place in matrix
       this.units[[this.currentToyRobotPlace.xCoordinate + moveBy.xMove,
           this.currentToyRobotPlace.yCoordinate + moveBy.yMove]] = this.currentToyRobotPlace.faceDirection;

       // Update current toy robot place with coordinates resulting from the move
       this.currentToyRobotPlace.xCoordinate = parseInt(this.currentToyRobotPlace.xCoordinate) + moveBy.xMove;
       this.currentToyRobotPlace.yCoordinate = parseInt(this.currentToyRobotPlace.yCoordinate) + moveBy.yMove;

       // Remove and replace the current toy robot place object stored in last position of history
       this.historyOfToyRobotPlaces.pop();
       this.historyOfToyRobotPlaces.push(this.currentToyRobotPlace);

       return true;
   };

   var getDirectionForRotation = function(rotation) {
       var currentPlace = this.currentToyRobotPlace;

       var newDirecton;

       if (rotation == "LEFT") {
           if (this.currentToyRobotPlace.faceDirection == "NORTH") {
               newDirecton = "WEST";
           } else if (this.currentToyRobotPlace.faceDirection == "SOUTH") {
               newDirecton = "EAST";
           } else if (this.currentToyRobotPlace.faceDirection == "EAST") {
               newDirecton = "NORTH";
           } else if (this.currentToyRobotPlace.faceDirection == "WEST") {
               newDirecton = "SOUTH";
           }
       } else if (rotation == "RIGHT") {
           if (this.currentToyRobotPlace.faceDirection == "NORTH") {
               newDirecton = "EAST";
           } else if (this.currentToyRobotPlace.faceDirection == "SOUTH") {
               newDirecton = "WEST";
           } else if (this.currentToyRobotPlace.faceDirection == "EAST") {
               newDirecton = "SOUTH";
           } else if (this.currentToyRobotPlace.faceDirection == "WEST") {
               newDirecton = "NORTH";
           }
       }
       return newDirecton;
   };

   var rotateToyRobot = function(rotation) {
       var newDirection = this.getDirectionForRotation(rotation);

       // Add new face value associated with existing place in matrix
       this.units[[this.currentToyRobotPlace.xCoordinate, this.currentToyRobotPlace.yCoordinate]] = newDirection;

       // Update current toy robot place with new direction
       this.currentToyRobotPlace.faceDirection = newDirection;

       // Remove and replace the current toy robot place object stored in last position of history
       this.historyOfToyRobotPlaces.pop();
       this.historyOfToyRobotPlaces.push(this.currentToyRobotPlace);

       return true;
   };

   var reportCurrentToyRobotPlace = function() {
       // Ignore REPORT command prior to first PLACE command
       if (!this.didMakeFirstPlace) { return ""; }
       return this.currentToyRobotPlace.getPlace();
   };

   var reportHistoryOfToyRobotPlaces = function() {
       // Ignore REPORT command prior to first PLACE command
       if (!this.didMakeFirstPlace) { return ""; }

       // Exclude current place when fetching from history
       var onlyPreviousPlaces = this.historyOfToyRobotPlaces.slice(0, -1);
       var onlyPreviousPlacesForReport = [];
       for (var element = 0, totalLength = onlyPreviousPlaces.length; element < totalLength; element++) {
           onlyPreviousPlacesForReport.push(onlyPreviousPlaces[element].getPlace());
       }
       return onlyPreviousPlacesForReport.concat(this.currentToyRobotPlace.getPlace()).join("\n");
   };

   return {
       didMakeFirstPlace: didMakeFirstPlace,
       changeToyRobotPlace: changeToyRobotPlace,
       getCoordinatesOfPlaceToMoveTo: getCoordinatesOfPlaceToMoveTo,
       moveToyRobot: moveToyRobot,
       getDirectionForRotation: getDirectionForRotation,
       rotateToyRobot: rotateToyRobot,
       reportCurrentToyRobotPlace: reportCurrentToyRobotPlace,
       reportHistoryOfToyRobotPlaces: reportHistoryOfToyRobotPlaces
   };
}();

module.exports = Table;