const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        
        //Paths para rutas raiz
        this.usersRoutes = '/api/users';
        this.authRoutes = '/api/auth';

        //Conectar a base de datos
        this.connectionDB();

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();

    }

    async connectionDB() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors())

        //Parseo y lectura
        this.app.use(express.json())

        //directorio publico
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.authRoutes, require('../routes/auth'));
        this.app.use(this.usersRoutes, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port)
    }
}

module.exports = Server;