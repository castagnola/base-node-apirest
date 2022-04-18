const { response } = require("express");
const { Category } = require('../models');


//obtener categorias - paginado - total - populate
const categorieGet = async(req, res = response) => {
    
    const { page, limit = 5 } = req.query;
    query = { status: true };

    const [total, resp] = await Promise.all([ //Anidar promesas para generar una sola peticion
        Category.countDocuments(query),
        Category.find(query)
            .populate('user')
            .limit(limit)
    ]);
    
    res.status(200).json({
        total,
        data:resp
    })
    
}

//obtener 1 categoria -  populate{}
const categorieShow = async(req, res= response) => {
    const { id } = req.params;

    const category = await Category.findById(id)
        .populate('user',);

    res.status(200).json({
        data:category
    })
}

//Crear una categoria
const categoriePost = async(req, res=response) => {
    const name = req.body.name.toUpperCase();

    // const categoryDB = Category.findOne({ name });

    // if (categoryDB.status) { //validar si existe y esta activa
    //     res.status(400).json({
    //         msg: `La categoria ${categoryDB.name} ya existe`
    //     });
    // }

    //generar la data a guardar
    const data = {
        name,
        user: req.user._id
    }
    const category = new Category(data);

    //Guardar DB
    await category.save();

    res.status(201).json({
        data: category
    })
}

//Actualizar categoria
const categoryPut = async(req, res = response) => {

    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findByIdAndUpdate(id, { name: name.toUpperCase() }, { new: true });

    res.status(201).json({
        data: category
    })
}

//Borrar categoria
const categoryDelete = async(req, res= response) => {
    const { id } = req.body;
    
    const category = await Category.findByIdAndUpdate(id, { status: false }, { new: true });

    res.status(200).json({
        data: category
    });
    
}

//Borrar categoria - estado

module.exports = {
    categoriePost,
    categorieGet,
    categorieShow,
    categoryPut,
    categoryDelete
}