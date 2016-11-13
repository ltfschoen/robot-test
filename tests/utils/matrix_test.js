var chai = require('chai');
var expect = chai.expect;
var matrix = require('../../utils/matrix');

describe("Matrix", function() {
    it('Returns a hash with 5x5 table coordinates as keys, and values to store current direction', function () {
        var hash = {
                "0,0": "", "0,1": "", "0,2": "", "0,3": "", "0,4": "",
                "1,0": "", "1,1": "", "1,2": "", "1,3": "", "1,4": "",
                "2,0": "", "2,1": "", "2,2": "", "2,3": "", "2,4": "",
                "3,0": "", "3,1": "", "3,2": "", "3,3": "", "3,4": "",
                "4,0": "", "4,1": "", "4,2": "", "4,3": "", "4,4": ""
        };
        expect( JSON.stringify(matrix.coordinatesAndFacingMatrix()) ).to.equal( JSON.stringify(hash) );
    });
});
