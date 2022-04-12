const { request, response } = require("express");
const jwt = require('jsonwebtoken');
const User = require("../models/user");

const JWT = async(req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }
    
    try {
        const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
        //llerr usuario que corresponde al uid
        const user = await User.findById(uid);

        //verificar si el uid no es false
        if (!user.status) {
            return res.status(401).json({
                msg: 'Token no valido - del usuario'
            })
        }

        req.user = user;
        next();
        
    } catch (error) {
        return res.status(401).json({
            msg: 'Token no valido'
        })
    }
    next();
}

module.exports = {
    JWT
};