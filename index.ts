import Server from "./clases/server";
//import { router } from "./routes/router";
import router from "./routes/router";
//import bodyParser from "body-parser";
import cors from 'cors';

var bodyParser = require('body-parser')

const server = new Server();

// bodyParser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

server.app.use( cors({ origin: true, credentials: true }) );

// rutas de servicios
server.app.use('/', router);

server.start( () => {
    console.log(`Servidor corriendo en el puerto ${ server.port }`);
});