const { Router } = require('express');
const { check } = require('express-validator');

const { productsGet, productsPost, productsShow, productsPut } = require('../controllers/products.controller');
const { isCategory, isProduct } = require('../helpers/validators');
const { JWT } = require('../middlewares');
const  validateInputs  = require('../middlewares/validate')

const router = Router();

router.get('/', productsGet);

router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId().custom(isProduct),
    validateInputs
], productsShow)

router.post('/',[
    JWT,
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('price', 'El precio es obligatorio').notEmpty(),
    check('category', 'La categoria es obligatoria').notEmpty(),
    check('category','La categoria debe ser un Id valido').isMongoId().custom(isCategory),
    validateInputs
], productsPost);

router.put('/:id', [
    JWT,
    check('id', 'No es un ID valido').isMongoId().custom(isProduct),
    validateInputs
],productsPut)




module.exports = router;