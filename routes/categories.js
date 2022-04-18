const { Router } = require('express');
const { check } = require('express-validator');

const  validateInputs  = require('../middlewares/validate')
const { JWT, isAdmin } = require('../middlewares');
const { categoriePost, categorieGet, categorieShow, categoryPut, categoryDelete } = require('../controllers/categories.controller');
const { isCategory, existCategoryName } = require('../helpers/validators');

const router = Router();

//Obtener todas las categorias - publica 
router.get('/',
    categorieGet);

//Obtener una categoria - publica
router.get('/:id', [
    check('id', 'No es un id valido').isMongoId().custom(isCategory),
    validateInputs
],categorieShow);

//Crear categoria - Privado con token
router.post('/', [
    JWT,
    check('name', 'El nombre es obligatorio').notEmpty(),
    validateInputs
],
    categoriePost);

//Actualizar una categoria - Privado
router.put('/:id', [
    JWT,
    check('id', 'No es un id valido').isMongoId().custom(isCategory),
    check('name','El nombre es requerido').notEmpty().custom(existCategoryName),
    validateInputs
],categoryPut);

//Delete una categoria solo si es admin
router.delete('/id', [
    JWT,
    isAdmin,
    check('id', 'No es un id valido').isMongoId().custom(isCategory),
],categoryDelete);

module.exports = router;