const { validationResult } = require('express-validator');


const validateInputs = (req, res, next) => { //los middleware tienen una funcion extra que indica que puede continuar con el siguiente middleware

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
        
    }

    next();
}

module.exports = validateInputs

