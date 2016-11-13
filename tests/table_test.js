var chai = require('chai');
var expect = chai.expect; // use expect style of Chai (BDD style)
var Table = require('../src/table');
var ToyRobot = require('../src/toy_robot');
var Place = require('../src/place');
var InstructionReader = require('../src/instruction_reader');
var arrayEquality = require('../utils/array_equality');

describe("Table", function() {
    describe('HasDefaultDimensions', function () {
        it('Creates default table size', function () {
            var table = new Table();
            // Store facing direction in value
            var expectedUnits = {
                "0,0": "", "0,1": "", "0,2": "", "0,3": "", "0,4": "",
                "1,0": "", "1,1": "", "1,2": "", "1,3": "", "1,4": "",
                "2,0": "", "2,1": "", "2,2": "", "2,3": "", "2,4": "",
                "3,0": "", "3,1": "", "3,2": "", "3,3": "", "3,4": "",
                "4,0": "", "4,1": "", "4,2": "", "4,3": "", "4,4": ""
            };
            expect(arrayEquality.areArraysEqual(JSON.stringify(table.units), JSON.stringify(expectedUnits))).to.equal(true);
        });

        describe('WithoutToyRobot', function() {
            describe('NotYetPlaced', function () {
                it('Returns toy robot not placed', function () {
                    var table = new Table();
                    expect(table.didMakeFirstPlace()).to.equal(false);
                });
            });

            describe('ChangePlace', function () {
                it('Should not allow a non-existent robot instance to be placed', function () {
                    var table = new Table();
                    table.changeToyRobotPlace("PLACE 1,1,EAST");
                    expect(table.didMakeFirstPlace()).to.equal(false);
                });
            });

            describe('GetCoordinatesOfPlaceToMoveTo', function () {
                it('Should not return any units to move by when no toy robot instance and not placed', function () {
                    var table = new Table();
                    var instructionReader = new InstructionReader();
                    var command = "PLACE 1,1,EAST";
                    var place = instructionReader.getPlaceArgumentsFromPlaceCommand(command);
                    var proposedPlace = new Place(place);
                    var moveBy = table.getCoordinatesOfPlaceToMoveTo(proposedPlace);
                    expect(moveBy.xMove).to.equal(0);
                    expect(moveBy.yMove).to.equal(0);
                });
            });
        });

        describe('WithToyRobot', function() {
            describe('IncorrectlyPlaced', function () {
                it('Returns toy robot not placed', function () {
                    var table = new Table();
                    var toyRobot = new ToyRobot();
                    var instructionReader = new InstructionReader();
                    var instructions = "PLACE -1,1,EAST";
                    instructionReader.interpretCommandsFromInstructions(table, toyRobot, instructions);
                    expect(table.didMakeFirstPlace()).to.equal(false);
                });
            });

            describe('PlacedWithInvalidCoordinates', function () {
                it('Returns toy robot not placed', function () {
                    var table = new Table();
                    var toyRobot = new ToyRobot();
                    var instructionReader = new InstructionReader();
                    var instructions = "PLACE ,,";
                    instructionReader.interpretCommandsFromInstructions(table, toyRobot, instructions);
                    expect(table.didMakeFirstPlace()).to.equal(false);
                });
            });

            describe('CorrectlyPlaced', function () {
                it('Returns toy robot placed', function () {
                    var table = new Table();
                    var toyRobot = new ToyRobot();
                    var instructionReader = new InstructionReader();
                    var instructions = "PLACE 1,1,EAST";
                    instructionReader.interpretCommandsFromInstructions(table, toyRobot, instructions);
                    expect(table.didMakeFirstPlace()).to.equal(true);
                });
            });

            describe('GetCoordinatesOfPlaceToMoveTo', function () {
                it('Should return positive units to move along table for given direction when next position on table', function () {
                    var table = new Table();
                    var toyRobot = new ToyRobot();
                    var instructionReader = new InstructionReader();
                    var command = "PLACE 1,1,EAST";
                    var place = instructionReader.getPlaceArgumentsFromPlaceCommand(command);
                    var proposedPlace = new Place(place);
                    table.currentToyRobotPlace = proposedPlace;
                    var moveBy = table.getCoordinatesOfPlaceToMoveTo(proposedPlace);
                    expect(moveBy.xMove).to.equal(1);
                    expect(moveBy.yMove).to.equal(0);
                });
            });

            describe('GetCoordinatesOfPlaceToMoveTo', function () {
                it('Should return zero units to move along table for given direction to prevent falling off table', function () {
                    var table = new Table();
                    var toyRobot = new ToyRobot();
                    var instructionReader = new InstructionReader();
                    var command = "PLACE 4,1,EAST";
                    var place = instructionReader.getPlaceArgumentsFromPlaceCommand(command);
                    var proposedPlace = new Place(place);
                    var moveBy = table.getCoordinatesOfPlaceToMoveTo(proposedPlace);
                    expect(moveBy.xMove).to.equal(0);
                    expect(moveBy.yMove).to.equal(0);
                });
            });
        });
    });
});