const { response } = require("express");
const { request } = require("express");


const isAdmin = (req = request, res = response, next) => {
    console.log('entra');
    if (!req.user) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token'
        });
        
    }

    const { role } = req.user;
    console.log('entra');
    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: 'No tiene permisos suficientes'
        });
    }

    next();
};

const hasRole = (...roles) => { //es para recibir muchos parametros como arreglo
    
    return (req, res = response, next) => {

        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                msg: `No tiene el role necesario: ${roles}`
            });
        }
        next();
    };
}

module.exports = {
    isAdmin,
    hasRole
}