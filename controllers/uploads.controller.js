const { response } = require("express");
const { path } = require("path");
const fs = require('fs');
const { uploadFile } = require("../helpers/upload-file");
const User = require("../models/user");


const loadFile = async(req, res = response) => {

    try {
        
        const pathFile = await uploadFile(req.files);

        res.status(201).json({
            msg: pathFile
        });

    } catch (error) {
        res.status(400).json({
            msg:error
        })
    }
    
}

const updateFile = async (req, res = response) => {
    const { id, collection } = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `Ùsuario no encontrado con el id ${id}`
                });
                
            }
            break;
        
        case 'products':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `Producto no encontrado con el id ${id}`
                });
                    
            }
            break;
    
        default:
            return res.status(500).json({
                msg: `Validacion no encontrada`
            });
    }

    //limpiar img previas
    if (model.img) {
        const pathImage = path.join(__dirname, '../uploads', collection, model.img);
        if (fs.existsSync(pathImage)) {
            fs.unlinkSync(pathImage);
            
        }
        
    }


    const nameFile = await uploadFile(req.files, undefined, collection);
    model.img = nameFile;
    await model.save();

    return res.status(201).json({
        data: model
    });
}



module.exports = {
    loadFile,
    updateFile
}