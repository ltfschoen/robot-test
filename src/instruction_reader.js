// Load filesystem module
var fs = require('fs');
var Place = require('./place');

function InstructionReader() {}

InstructionReader.prototype = function() {
    var processCommands = function(table, toyRobot, instructions) {
        var commands = instructions.split('\n');
        var place;

        // Cache length of array to avoid recalculating total on each iteration
        for (var element = 0, totalLength = commands.length; element < totalLength; element++) {
            // Case insensitive RegEx match
            if (commands[element].match(/PLACE/gi) != null) {
                // Extract PLACE arguments (i.e. 0,0,NORTH)
                var placeArgs = commands[element].split(" ").slice(-1).join().split(",");
                place = new Place(placeArgs);

                // Validation place is valid and that new place is not the same as current place (unless unplaced)
                if (place.isValidPlace() && !place.isSameAsCurrentPlace(table)) {
                    toyRobot.changePlace(table, place);
                }
            }

            if (commands[element].match(/REPORT/gi) != null) {
                // Validate place is valid prior to reporting to standard output
                if (typeof place !== "undefined") {
                    var currentPlace = toyRobot.reportCurrentPlace(table);
                    if (currentPlace != ",,") {
                        process.stdout.write(currentPlace + "\n");
                    }
                }
            }

            if (commands[element].match(/MOVE/gi) != null) {
                // Validate place is valid prior to moving
                if (typeof place !== "undefined") {
                    // Ignore move when not on the table or move would cause toy robot to fall off the table
                    if(place.isValidToMove()) {
                        toyRobot.move(table);
                    }
                }
            }

            if (commands[element].match(/LEFT|RIGHT/gi) != null) {
                // Validate place is valid prior to moving
                if (typeof place !== "undefined") {
                    // Ignore rotation when not on the table
                    if(place.isValidPlace()) {
                        var rotation = commands[element];
                        toyRobot.rotate(table, rotation);
                    }
                }
            }
        }
        return true;
    };

    var readInstructionFile = function(table, toyRobot, filename, callback) {
        // Configure relative to process.cwd() to allow running in IntelliJ IDEA from within src directory or from root directory via commandline
        var fileLocation = (process.cwd().split("/").pop() == "src") ? '../data/' + filename.toString() : './data/' + filename.toString();

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
        processCommands: processCommands
    };
}();

module.exports = InstructionReader;