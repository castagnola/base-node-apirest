const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generateJWT } = require("../helpers/generate-jwt");
const User = require("../models/user");


const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        //Verificar si el email existe
        const user = await User.findOne({ email });
        if (!user) {

            return res.status(400).json({
                msg: 'usuario o Password no son correctos - email '
            });
        }

        //verificar si esta activo
        if (!user.status) {
            return res.status(400).json({
                msg: 'usuario o Password no son correctos - status '
            });
        }

        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'usuario o Password no son correctos - password '
            });
        }

        //generar JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        })



    } catch (error) {
        console.log(error);
        
    }
    
}

module.exports = {
    login
}