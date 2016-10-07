
import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";

import * as indexRoute from "./routes/index";

class Server {
        
    public app: express.Application;

    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        // create the app
        this.app = express();

        // configure application
        this.config();

        // configure routes
        this.routes();
    }

    private config() {

        // mount json form parser
        this.app.use(bodyParser.json());

        // mount query string parser
        this.app.use(bodyParser.urlencoded({ extended: true }));

        // add static path
        this.app.use(express.static(path.join(__dirname, 'public')));

        // catchall route
        this.app.get('*', (req: express.Request, res: express.Response) => {
            res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
        });
    }

    private routes() {
        // get router
        let router: express.Router;
        router = express.Router();

        // create routes
        var index: indexRoute.Index = new indexRoute.Index();

        // home page
        router.get('/', index.index.bind(index.index));

        // use router middleware
        this.app.use(router);
    }
}

var server = Server.bootstrap();
export = server.app;