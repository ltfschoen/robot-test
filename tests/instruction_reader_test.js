var fs = require('fs');
var chai = require('chai');
var expect = chai.expect; // use expect style of Chai
var InstructionReader = require('../src/instruction_reader');

describe("Instruction Reader", function() {
    describe('WithFilename', function () {
        it('Reads instructions from mock file without error', function (callback) {
            var filename = "example_instructions1";
            var fileLocation = './data/' + filename.toString(); // relative to process.cwd()
            fs.readFile(fileLocation, 'utf8', function (err, instructionBuffer) {
                // Propogate error and exit function
                if (err) {
                    return callback(err);
                }
                try {
                    var instructions = instructionBuffer.toString().trim();
                    expect(instructions).to.equal("PLACE 0,0,NORTH\nMOVE\nREPORT");
                } catch (err) {
                    // Catch conversion errors
                    return callback(err);
                }
                // Propogate output when no errors
                callback(null, instructions);
            });
        });
    });
});