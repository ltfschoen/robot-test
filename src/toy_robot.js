function ToyRobot() {}

ToyRobot.prototype.changePlace = function(table, newPlace) {
    table.changeToyRobotPlace(newPlace);
    return true;
};

ToyRobot.prototype.move = function(table) {
    table.moveToyRobot();
    return true;
};

ToyRobot.prototype.rotate = function(table, rotation) {
    table.rotateToyRobot(rotation);
    return true;
};

// Inexpensively add method to prototype of constructor function
ToyRobot.prototype.reportCurrentPlace = function(table) {
    return table.reportCurrentToyRobotPlace();
};

ToyRobot.prototype.reportHistoryOfPlaces = function(table) {
    return table.reportHistoryOfToyRobotPlaces();
};

ToyRobot.prototype.readCurrentCommand = function(command) {
    return command.split(' ').shift();
};

module.exports = ToyRobot;