"use strict";
const http = require("http");
var app = require('./app');
var port = normalizePort(process.env.PORT || 8080);
app.set('port', port);
// create http server
var server = http.createServer(app);
server.listen(port);
server.on('listening', onListening);
server.on('error', onError);
function normalizePort(value) {
    var port = parseInt(value, 10);
    if (isNaN(port)) {
        // named pipe
        return value;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
function onListening() {
    var address = server.address();
    var bind = typeof address === 'string'
        ? 'pipe ' + address
        : 'port ' + address.port;
    console.log('Server listening on ' + bind);
}
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    var bind = typeof port === "string"
        ? "Pipe " + port
        : "Port " + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}
