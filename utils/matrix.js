module.exports = {
    coordinatesAndFacingMatrix: function () {
        var hash = {};
        for (var col = 0; col < 5; col++) {
            for (var row = 0; row < 5; row++) {
                hash[[col, row]] = "";
            }
        }
        return hash;
    }
};