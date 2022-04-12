const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const user = require('../models/user');

const usersGet = async(req, res = response) => {
    
    const { start_date, end_date, page, limit = 5 } = req.query; //desustructuracion de argumentos
    query = {status:true}

    const [total, resp]  = await Promise.all([ //Anidar promesas para generar una sola peticion
        User.countDocuments(query),
        User.find(query)
            .limit(limit)
    ])

    res.json({
        total,
        "data": resp
    });
}

const usersPost = async(req, res = response) => {

    const {name,email,password,role} = req.body;
    const user = new User({ name, email, password, role });
    
    //Encriptar password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.status(201).json({ "data": user });

}

const usersPut = async(req, res = response) => {

    const { id } = req.params;
    const { password, google, ...body } = req.body;
    
    //TODO validar contra base de datos

    if (password) {
        const salt = bcryptjs.genSaltSync();
        body.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate( id, body, {new: true} ); //Devuelve l registro actualizado
    res.status(201).json({
        "data":user
    })

}

const usersPatch = (req, res = response) => {
    res.json({
        "data":null
    })

}

const usersDelete = async(req, res = response) => {

    const { id } = req.params;
    
    //Borrado fisdico
    // const user = await User.findByIdAndDelete(id);

    //Camnbiar estado
    const user = await User.findByIdAndUpdate(id, { status: false }, { new: true });

    res.json({
        "data": user,
    })

}

module.exports = {
    usersGet,
    usersPost,
    usersPatch,
    usersPut,
    usersDelete
}