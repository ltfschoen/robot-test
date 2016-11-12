var Table = require('./table');
var ToyRobot = require('./toy_robot');
var InstructionReader = require('./instruction_reader');

var table = new Table();
var toyRobot = new ToyRobot();
var instructionReader = new InstructionReader();
instructionReader.readInstructionFile(table, toyRobot, "example_instructions4", function(err, instructions) {
    instructionReader.interpretCommandsFromInstructions(table, toyRobot, instructions)
});
