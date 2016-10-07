"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const indexRoute = require("./routes/index");
class Server {
    constructor() {
        // create the app
        this.app = express();
        // configure application
        this.config();
        // configure routes
        this.routes();
    }
    static bootstrap() {
        return new Server();
    }
    config() {
        // mount json form parser
        this.app.use(bodyParser.json());
        // mount query string parser
        this.app.use(bodyParser.urlencoded({ extended: true }));
        // add static path
        this.app.use(express.static(path.join(__dirname, 'public')));
        // catchall route
        this.app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
        });
    }
    routes() {
        // get router
        let router;
        router = express.Router();
        // create routes
        var index = new indexRoute.Index();
        // home page
        router.get('/', index.index.bind(index.index));
        // use router middleware
        this.app.use(router);
    }
}
var server = Server.bootstrap();
module.exports = server.app;
