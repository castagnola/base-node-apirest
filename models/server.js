const express = require('express');
const cors = require('cors')

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersRoutes = '/api/users';

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();

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
       this.app.use(this.usersRoutes, require('../routes/user'))
    }

    listen() {
        this.app.listen(this.port)
    }
}

module.exports = Server;