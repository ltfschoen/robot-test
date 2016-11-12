var Table = require('./client/app/modules/table');
var ToyRobot = require('./client/app/modules/toy_robot');
var InstructionReader = require('./client/app/modules/instruction_reader');

var table = new Table();
var toyRobot = new ToyRobot();
var instructionReader = new InstructionReader();
instructionReader.readInstructionFile(table, toyRobot, "example_instructions4", function(err, instructions) {
    instructionReader.interpretCommandsFromInstructions(table, toyRobot, instructions)
});
