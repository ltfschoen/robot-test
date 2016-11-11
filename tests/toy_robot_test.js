var chai = require('chai');
var expect = chai.expect; // use expect style of Chai
var Table = require('../src/table');
var ToyRobot = require('../src/toy_robot');
var InstructionReader = require('../src/instruction_reader');

describe('NewToyRobotHasNoPlaceInitially', function() {
    it('Creates toy robot instance with no place', function() {
        var table = new Table();
        var toyRobot = new ToyRobot();
        expect(toyRobot.reportCurrentPlace(table)).to.equal(",,");
    });
});

describe('NewToyRobotWithValidPlaceAndFacingDirection', function() {
    it('Assigns toy robot to a place on the table', function() {
        var toyRobot = new ToyRobot();
        var commands = "PLACE 0,0,NORTH";
        expect(toyRobot.readCurrentCommand(commands)).to.equal("PLACE");
    });

    it('Updates place on table corresponding to latest place instruction and resets previous place', function() {
        var table = new Table();
        var toyRobot = new ToyRobot();
        var instructionReader = new InstructionReader();
        var instructions = "PLACE 0,0,NORTH\nPLACE 0,2,SOUTH";
        instructionReader.processCommands(table, toyRobot, instructions);
        expect(table.units[[0,0]]).to.equal("");
        expect(table.units[[0,2]]).to.equal("SOUTH");
    });

    it('Reports current place of toy robot on table whenever single REPORT command is read', function() {
        var table = new Table();
        var toyRobot = new ToyRobot();
        var instructionReader = new InstructionReader();
        var instructions = "PLACE 1,1,NORTH\nREPORT";
        instructionReader.processCommands(table, toyRobot, instructions);
        expect(toyRobot.reportCurrentPlace(table)).to.equal("1,1,NORTH");
    });

    it('Reports current place of toy robot on table whenever multiple REPORT commands are read', function() {
        var table = new Table();
        var toyRobot = new ToyRobot();
        var instructionReader = new InstructionReader();
        var instructions = "PLACE 1,1,NORTH\nREPORT\nPLACE 3,3,SOUTH\nREPORT";
        instructionReader.processCommands(table, toyRobot, instructions);
        expect(toyRobot.reportCurrentPlace(table)).to.equal("3,3,SOUTH");
    });

    it('Reports all places the toy has been in on table when multiple REPORT commands are read', function() {
        var table = new Table();
        var toyRobot = new ToyRobot();
        var instructionReader = new InstructionReader();
        var instructions = "PLACE 1,1,NORTH\nREPORT\nPLACE 3,3,SOUTH\nREPORT";
        instructionReader.processCommands(table, toyRobot, instructions);
        expect(toyRobot.reportHistoryOfPlaces(table)).to.equal("1,1,NORTH\n3,3,SOUTH");
    });

    it('Ignores commands before first PLACE command', function() {
        var table = new Table();
        var toyRobot = new ToyRobot();
        var instructionReader = new InstructionReader();
        var instructions = "MOVE\nLEFT\nREPORT\nPLACE 1,1,NORTH";
        instructionReader.processCommands(table, toyRobot, instructions);
        expect(toyRobot.reportHistoryOfPlaces(table)).to.equal("1,1,NORTH");
    });
});

describe('NewToyRobotWithCommandToChangeToInvalidPlaceOrFacingDirection', function() {
    it('Only allows toy robot to be placed on valid table x coordinate (i.e. 0 <= x <= 4)', function () {
        var table = new Table();
        var toyRobot = new ToyRobot();
        var instructionReader = new InstructionReader();
        var instructions = "PLACE 5,0,NORTH";
        instructionReader.processCommands(table, toyRobot, instructions);
        expect(toyRobot.reportCurrentPlace(table)).to.equal(",,");
    });

    it('Only allows toy robot to be placed on valid table y coordinate (i.e. 0 <= x <= 4)', function () {
        var table = new Table();
        var toyRobot = new ToyRobot();
        var instructionReader = new InstructionReader();
        var instructions = "PLACE 4,-1,NORTH";
        instructionReader.processCommands(table, toyRobot, instructions);
        expect(toyRobot.reportCurrentPlace(table)).to.equal(",,");
    });

    it('Only allows toy robot to be placed when valid facing direction provided (i.e. NORTH, SOUTH, EAST, or WEST)', function () {
        var table = new Table();
        var toyRobot = new ToyRobot();
        var instructionReader = new InstructionReader();
        var instructions = "PLACE 4,1,RANDOM_DIRECTION";
        instructionReader.processCommands(table, toyRobot, instructions);
        expect(toyRobot.reportCurrentPlace(table)).to.equal(",,");
    });
});

describe('NewToyRobotWithValidPlaceAndFacingDirectionAndMove', function() {
    it('Moves toy robot in its current facing direction to expected place on the table', function () {
        var table = new Table();
        var toyRobot = new ToyRobot();
        var instructionReader = new InstructionReader();
        var instructions = "PLACE 3,1,NORTH\nMOVE";
        instructionReader.processCommands(table, toyRobot, instructions);
        expect(toyRobot.reportCurrentPlace(table)).to.equal("3,2,NORTH");

        instructions = "PLACE 0,1,EAST\nMOVE";
        instructionReader.processCommands(table, toyRobot, instructions);
        expect(toyRobot.reportCurrentPlace(table)).to.equal("1,1,EAST");

        instructions = "PLACE 1,0,WEST\nMOVE";
        instructionReader.processCommands(table, toyRobot, instructions);
        expect(toyRobot.reportCurrentPlace(table)).to.equal("0,0,WEST");

        instructions = "PLACE 2,1,SOUTH\nMOVE";
        instructionReader.processCommands(table, toyRobot, instructions);
        expect(toyRobot.reportCurrentPlace(table)).to.equal("2,0,SOUTH");
    });
});

describe('NewToyRobotWithValidPlaceAndFacingDirectionAndMove', function() {
    it('Moves toy robot in its current facing direction to expected place on the table', function () {
        var table = new Table();
        var toyRobot = new ToyRobot();
        var instructionReader = new InstructionReader();
        var instructions = "PLACE 4,4,EAST\nMOVE";
        instructionReader.processCommands(table, toyRobot, instructions);
        expect(toyRobot.reportCurrentPlace(table)).to.equal("4,4,EAST");

        instructions = "PLACE 4,0,SOUTH\nMOVE";
        instructionReader.processCommands(table, toyRobot, instructions);
        expect(toyRobot.reportCurrentPlace(table)).to.equal("4,0,SOUTH");

        instructions = "PLACE 0,3,WEST\nMOVE";
        instructionReader.processCommands(table, toyRobot, instructions);
        expect(toyRobot.reportCurrentPlace(table)).to.equal("0,3,WEST");

        instructions = "PLACE 2,4,NORTH\nMOVE";
        instructionReader.processCommands(table, toyRobot, instructions);
        expect(toyRobot.reportCurrentPlace(table)).to.equal("2,4,NORTH");
    });
});

describe('NewToyRobotWithValidPlaceAndFacingDirectionAndRotate', function() {
    it('Rotates toy robot so it has a valid facing direction either 90 degrees to the right or left', function () {
        var table = new Table();
        var toyRobot = new ToyRobot();
        var instructionReader = new InstructionReader();
        var instructions = "PLACE 4,4,EAST\nLEFT";
        instructionReader.processCommands(table, toyRobot, instructions);
        expect(toyRobot.reportCurrentPlace(table)).to.equal("4,4,NORTH");

        instructions = "PLACE 4,0,SOUTH\nLEFT";
        instructionReader.processCommands(table, toyRobot, instructions);
        expect(toyRobot.reportCurrentPlace(table)).to.equal("4,0,EAST");

        instructions = "PLACE 0,3,WEST\nRIGHT";
        instructionReader.processCommands(table, toyRobot, instructions);
        expect(toyRobot.reportCurrentPlace(table)).to.equal("0,3,NORTH");

        instructions = "PLACE 2,4,NORTH\nRIGHT";
        instructionReader.processCommands(table, toyRobot, instructions);
        expect(toyRobot.reportCurrentPlace(table)).to.equal("2,4,EAST");
    });
});