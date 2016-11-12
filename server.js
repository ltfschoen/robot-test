var express = require('express');
var path = require('path');

var app = express();
var isProduction = (process.env.NODE_ENV === 'production');
app.set('port', (isProduction ? process.env.PORT : 3000));
var publicPath = path.resolve(__dirname, 'src/client');

app.use(express.static(publicPath));

app.listen(app.get('port'), function () {
    console.log('Node.js app running on port ' + app.get('port'));
});