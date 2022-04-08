const { response } = require('express');

const usersGet = (req, res = response) => {
    
    const { start_date, end_date, page,limit } = req.query; //desustructuracion de argumentos
    const data = {
        start_date,
        end_date,
    };

    res.json({
        'msg': "get API - Controller",
        "data":data
    })
}

const usersPost = (req, res = response) => {
    const { nombre, edad, fecha } = req.body;
    const data = {
        nombre,
        edad,
        fecha
    };

    res.json({
        'msg': "Post API - Controller",
        "data": data
    })

}

const usersPut = (req, res = response) => {

    const {id} = req.params;
    res.json({
        'msg': "Put API - Controller",
        "data":id
    })

}

const usersPatch = (req, res = response) => {
    res.json({
        'msg': "Patch API - Controller",
        "data":null
    })

}

const usersDelete = (req, res = response) => {
    res.json({
        'msg': "Delete API - Controller",
        "data":null
    })

}

module.exports = {
    usersGet,
    usersPost,
    usersPatch,
    usersPut,
    usersDelete
}