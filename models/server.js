const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        
        //Paths para rutas raiz
        this.usersRoutes = '/api/users';
        this.authRoutes = '/api/auth';
        this.categoriesRouter = '/api/categories';
        this.productsRoutes = '/api/products';
        this.uploadsRoutes = '/api/uploads';

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

        //File upload
        this.app.use(fileUpload({
            limits: { fileSize: 50 * 1024 * 1024 },
          }));
    }

    routes() {
        this.app.use(this.authRoutes, require('../routes/auth'));
        this.app.use(this.usersRoutes, require('../routes/users'));
        this.app.use(this.productsRoutes, require('../routes/products'));
        this.app.use(this.uploadsRoutes, require('../routes/uploads'));
        this.app.use(this.categoriesRouter, require('../routes/categories'));

    }

    listen() {
        this.app.listen(this.port)
    }
}

module.exports = Server;