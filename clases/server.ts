import { SERVER_PORT } from '../global/enviroments';

import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import * as socket from '../socket/socket';

export default class Server {

    private static _instance: Server;

    public app: express.Application;
    private httpServer: http.Server;
    public io: socketIO.Server;

    public port: number;
    
    private constructor() {
        this.app = express();
        this.httpServer = new http.Server(this.app);
        this.io = new socketIO.Server(this.httpServer, { cors: { origin: true, credentials: true } });
        this.port = SERVER_PORT;
        this.escucharSocket();
    }

    public static get instance() {

        return this._instance || (this._instance = new this());
    }

    private escucharSocket() {

        console.log('Escuchando conexiones - sockets');

        this.io.on('connection', cliente => {

            // conectar cliente
            socket.conectarCliente(cliente);

            //Configurar-usuario
            socket.configurarUsuario(cliente, this.io);
            
            //Mensajes
            socket.mensaje(cliente, this.io);

            // Desconectar
            socket.desconectar(cliente);

        });

    }

    start(callback: any){
        //this.app.listen(this.port, callback);
        this.httpServer.listen(this.port, callback);
    }

}