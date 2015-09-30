var child_process = require('child_process');

// returns child object for IPC.
function SafeFork(filename, onFail, onComplete) {
    var cp;
    try {
        cp = child_process.fork(filename);
    } catch (ini_err) {
        onFail(ini_err);
    }
    cp.on('close', function(code){
        if (code === 0) { onComplete(); }
        else { onFail(code); }
    });
    cp.on('error', function(err){
        onFail(err);
    });
    return cp;
}

// Some examples:
var good = SafeFork("Healthy", function(e){console.dir(e);}, function(){console.log("done");});

var kb = SafeFork("KaBoom", function(e){console.dir(e);}, function(){console.log("done");});

var fut = SafeFork("Fut", function(e){console.dir(e);}, function(){console.log("done");});
fut.send('{"hello":"world"}');
fut.send("}[[}");

var gone = SafeFork("NotHere", function(e){console.dir(e);}, function(){console.log("?");});

(function loop(){
    console.log('.');
    setTimeout(loop, 1000);
})();

