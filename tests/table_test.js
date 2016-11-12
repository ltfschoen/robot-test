var chai = require('chai');
var expect = chai.expect; // use expect style of Chai (BDD style)
var Table = require('../src/client/app/modules/table');
var arrayEquality = require('../src/client/app/utils/array_equality');

describe('NewTableHasDefaultDimensions', function() {
    it('Creates default table size', function() {
        var table = new Table();
        // Store facing direction in value
        var expectedUnits = {
            "0,0": "", "0,1": "", "0,2": "", "0,3": "", "0,4": "",
            "1,0": "", "1,1": "", "1,2": "", "1,3": "", "1,4": "",
            "2,0": "", "2,1": "", "2,2": "", "2,3": "", "2,4": "",
            "3,0": "", "3,1": "", "3,2": "", "3,3": "", "3,4": "",
            "4,0": "", "4,1": "", "4,2": "", "4,3": "", "4,4": ""
        };
        expect(arrayEquality.areArraysEqual(table.units, expectedUnits)).to.equal(true);
    });
});