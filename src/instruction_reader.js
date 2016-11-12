// Load filesystem module
var fs = require('fs');
var Place = require('./place');

function InstructionReader() {}

InstructionReader.prototype = function() {
    var place;

    var getPlaceArgumentsFromPlaceCommand = function(command) {
        return command.split(" ").slice(-1).join().split(",");
    };

    var processPlaceCommand = function(command, table, toyRobot) {
        place = new Place(getPlaceArgumentsFromPlaceCommand(command));
        // Validate place and that new place is not same as current place (unless unplaced)
        if (place.isValidPlace() && !place.isSameAsCurrentPlace(table)) { toyRobot.changePlace(table, place); }
    };

    var processRotateCommand = function(command, table, toyRobot) {
        // Validate place is valid prior to moving
        if (typeof place !== "undefined" && table.isToyRobotPlaced) {
            // Ignore rotation when not on the table
            if(place.isValidPlace()) { toyRobot.rotate(table, command); }
        }
    };

    var processMoveCommand = function(table, toyRobot) {
        // Validate place is valid prior to moving
        if (typeof place !== "undefined" && table.isToyRobotPlaced) {
            // Ignore move when not on the table or move would cause toy robot to fall off table
            if(place.isValidToMove()) { toyRobot.move(table); }
        }
    };

    var processReportCommand = function(table, toyRobot) {
        // Validate has been placed and place is valid prior to reporting to standard output
        if (typeof place !== "undefined" && table.isToyRobotPlaced) {
            var currentPlace = toyRobot.reportCurrentPlace(table);
            // Additional assurance to not print output if still has initial unplaced value
            if (currentPlace != ",,") { process.stdout.write(currentPlace + "\n"); }
        }
    };

    var interpretCommandsFromInstructions = function(table, toyRobot, instructions) {
        var commands = instructions.split('\n');

        // Cache length of array to avoid recalculating total on each iteration
        for (var element = 0, totalLength = commands.length; element < totalLength; element++) {
            // Case insensitive RegEx match
            if (commands[element].match(/PLACE/gi) != null) {
                this.processPlaceCommand(commands[element], table, toyRobot);
            }
            if (commands[element].match(/LEFT|RIGHT/gi) != null) {
                this.processRotateCommand(commands[element], table, toyRobot);
            }
            if (commands[element].match(/MOVE/gi) != null) {
                this.processMoveCommand(table, toyRobot);
            }
            if (commands[element].match(/REPORT/gi) != null) {
                this.processReportCommand(table, toyRobot);
            }
        }
        return true;
    };

    var readInstructionFile = function(table, toyRobot, filename, callback) {
        // Configure relative to process.cwd() to allow running in IntelliJ IDEA from within src directory
        // or from root directory via commandline
        var fileLocation = (process.cwd().split("/").pop() == "src") ?
            '../data/' + filename.toString() : './data/' + filename.toString();

        // Read contents of file asynchronously (non-blocking I/O) into memory and then invoke callback
        fs.readFile(fileLocation, 'utf8', function (err, instructionBuffer) {
            // Propogate error and exit function
            if (err) { return callback(err); }

            try {
                // Convert instruction data from Buffer (array of bytes) into string
                var instructions = instructionBuffer.toString().trim();
            } catch(err) {
                // Catch conversion errors
                return callback(err);
            }

            // Propogate output when no errors
            callback(null, instructions);
        });
    };

    return {
        readInstructionFile: readInstructionFile,
        interpretCommandsFromInstructions: interpretCommandsFromInstructions,
        processPlaceCommand: processPlaceCommand,
        processRotateCommand: processRotateCommand,
        processMoveCommand: processMoveCommand,
        processReportCommand: processReportCommand
    };
}();

module.exports = InstructionReader;