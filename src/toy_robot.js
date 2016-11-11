function ToyRobot() {}

// Inexpensively add methods to prototype of constructor function using Reveal Design Pattern
ToyRobot.prototype = function() {
    var readCurrentCommand = function(command) {
        return command.split(' ').shift();
    };

    var changePlace = function(table, newPlace) {
        return table.changeToyRobotPlace(newPlace);
    };

    var move = function(table) {
        return table.moveToyRobot();
    };

    var rotate = function(table, rotation) {
        return table.rotateToyRobot(rotation);
    };

    var reportCurrentPlace = function(table) {
        return table.reportCurrentToyRobotPlace();
    };

    var reportHistoryOfPlaces = function(table) {
        return table.reportHistoryOfToyRobotPlaces();
    };

    return {
        readCurrentCommand: readCurrentCommand,
        changePlace: changePlace,
        move: move,
        rotate: rotate,
        reportCurrentPlace: reportCurrentPlace,
        reportHistoryOfPlaces: reportHistoryOfPlaces
    };
}();

module.exports = ToyRobot;