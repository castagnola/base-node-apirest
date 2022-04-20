const { response } = require("express");
const { uploadFile } = require("../helpers/upload-file");


const loadFile = async(req, res = response) => {

    try {
        if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
            res.status(400).json({ msg: 'El archivo es requerido' });
            return;
        }
        const pathFile = await uploadFile(req.files);

        res.status(201).json({
            msg: pathFile
        });

    } catch (error) {
        res.status(400).json({
            msg:'msg'
        })
    }
    
}

const updateFile = async (req,res=response) => {

    res.status(201).json({
        data:'ok'
    })
    
}



module.exports = {
    loadFile,
    updateFile
}