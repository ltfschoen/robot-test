if (process.env.NODE_ENV === 'production') {
    var child_process = require('child_process');
    child_process.exec("./node_modules/.bin/webpack -p --config webpack.prod.config.js",
        function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) { console.log('exec error: ' + error); }
        }
    );
}