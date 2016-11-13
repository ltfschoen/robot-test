var chai = require('chai');
var expect = chai.expect;
var arrayEquality = require('../../utils/array_equality');

describe("ArrayEquality", function() {
    it('Returns true when two deeply nested arrays are equal', function () {
        var array1 = [
            {
                "0,0": "NORTH", "0,1": "", "0,2": "", "0,3": "", "0,4": "",
                "1,0": "", "1,1": "", "1,2": "", "1,3": "", "1,4": "",
                "2,0": "", "2,1": "", "2,2": "", "2,3": "", "2,4": "",
                "3,0": "", "3,1": "", "3,2": "", "3,3": "", "3,4": "",
                "4,0": "", "4,1": "", "4,2": "", "4,3": "", "4,4": ""
            }
        ];
        var array2 = [
            {
                "0,0": "NORTH", "0,1": "", "0,2": "", "0,3": "", "0,4": "",
                "1,0": "", "1,1": "", "1,2": "", "1,3": "", "1,4": "",
                "2,0": "", "2,1": "", "2,2": "", "2,3": "", "2,4": "",
                "3,0": "", "3,1": "", "3,2": "", "3,3": "", "3,4": "",
                "4,0": "", "4,1": "", "4,2": "", "4,3": "", "4,4": ""
            }
        ];
        expect(arrayEquality.areArraysEqual(JSON.stringify(array1), JSON.stringify(array2))).to.equal(true);
    });
});