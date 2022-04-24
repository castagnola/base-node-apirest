const { Router } = require('express');
const { check } = require('express-validator');
const { loadFile, updateFile } = require('../controllers/uploads.controller');
const { isCollections } = require('../helpers/validators');
const { validateFile, JWT } = require('../middlewares');
const  validateInputs = require('../middlewares/validate');
const router = Router();

router.post('/', [
], loadFile);

router.put('/:collection/:id', [
    JWT,
    validateFile,
    check('id', 'No es un ID valido').isMongoId(),
    check('collection').custom(c => isCollections(c, ['users', 'products'])),
    validateInputs
],updateFile)



module.exports = router;