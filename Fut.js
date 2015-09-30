var child_process = require('child_process');

process.on('message', function(input) {
    console.log("Going to parse "+input);
    console.log(JSON.parse(input));
});

