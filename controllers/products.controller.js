const { request } = require("express");
const { Product } = require("../models");


//Traer todos los productos
const productsGet = async(req = request, res) => {
    const { page, limit = 5 } = req.query;
    const query = { status: true };

    const [total, resp] = await Promise.all([
        Product.find(query).countDocuments(),
        Product.find(query)
            .populate('category','name')
            .populate('user')
            .limit(limit)
    ]);

    res.status(200).json({
        total,
        data:resp
    })
    
    
}

//Get un producto
const productsShow = async (req = request, res) => {
    const { id } = req.params;

    const product = await Product.findById(id)
        .populate('category', 'name')
        .populate('user')
    
    
    res.status(200).json({
        data: product
    });

}

//Guardar un producto
const productsPost = async(req = request, res) => {
    const { name, price, category, description } = req.body;
    const user = req.user

    const data = {
        name,
        price,
        category,
        description,
        user
    };

    const product = new Product(data);
    await product.save();

    res.status(201).json({
        data
    })

}

//Actualizar producto
const productsPut = async (req = request, res) => {
    const { id } = req.params;
    const { status, user, ...data } = req.body;

    data.user = req.user

    const product = await Product.findByIdAndUpdate(id, data, { new: true });

    res.status(201).json({
        data:product
    })

    
}



module.exports = {
    productsGet,
    productsPost,
    productsShow,
    productsPut
}
