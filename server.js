var restify = require('restify');
var server = restify.createServer();

var logRequest = false; 
var logResponse = false; 

server.listen(8080, function() {
    console.log("Listening at %s", server.url);
    console.log(server.toString());
});

//Runs method pre-request
server.pre(function (req, res, next) {
    req.headers.accept = 'application/json';
    next();
});

//Health Check Route on root
server.get('/', function (req, res, next) {
    console.log("\n Health Check route hit.");
    res.send(server.getDebugInfo());
    res.status(200);
    logReqRes(req, res); 
    next();
});

//Sample GET Route
server.get('/foo', function (req, res, next) {
    console.log("\n Sample GET route hit.");
    res.send({
        "Foo" : 50,
        "Bar" : 30
    })
    res.status(200);
    logReqRes(req, res); 
    next();
});

//Sample POST Route
server.post('/bar', function (req, res, next) {
    console.log("\n Sample POST route hit.");
    res.status(200);
    logReqRes(req, res); 
    next();
});

//Sample Redirect Route
server.get('/redirect', function (req, res, next) {
    console.log("\n Redirect route hit.");
    res.redirect('')
    logReqRes(req, res); 
    next();
});

//Log Request and Response to console
function logReqRes(m, res) {
    if (logRequest === true) {
        console.log("---------------------- \n", req);
    }   
    if (logResponse === true) {
        console.log("---------------------- \n", res); 
    }
}