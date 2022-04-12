const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { json } = require("express/lib/response");
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google");
const User = require("../models/user");


const login = async (req, res = response) => {

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
    
};

const googleSignIn = async (req, res = response) => {
    
    const { id_token } = req.body;

    try {
        const { name, img, email } = await googleVerify(id_token);

        let user = await User.findOne({ email });

        if (!user) {
            //Crear user
            const data = {
                name,
                email,
                password: 'xyz',
                role:'USER_ROLE',
                img,
                google: true
            };

            user = new User(data);
            await user.save();
        }

        //Si el usuario en DB esta desactivado
        if (!user.status) {
            return res.status(401).json({
                ok: false,
                msg: 'Favor comunicarse con un administrador, usuario bloquedo'
            });
        }
        //JWT token
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        });
    }
    

};

module.exports = {
    login,
    googleSignIn
}