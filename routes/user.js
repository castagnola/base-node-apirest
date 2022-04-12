const { Router } = require('express');
const { check } = require('express-validator');
const {usersPost, usersPut, usersGet, usersDelete } = require('../controllers/users.controller');
const { isRoleValidate, isEmail, isUser } = require('../helpers/validators');

const { hasRole, JWT } = require('../middlewares');
const validateInputs = require('../middlewares/validate');

const router = Router();

router.get('/', usersGet);

router.post('/', [
    check('email','El correo es obligatorio').notEmpty().custom(isEmail),
    check('name', 'El nombre es obligatoriao').notEmpty(),
    check('password', 'El password es obligatorio y mas de 6 letras').notEmpty().isLength({ min: 6 }),
    check('role').custom(isRoleValidate),
    validateInputs
]
    , usersPost);

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId().custom(isUser),
    check('role').custom(isRoleValidate),
    validateInputs
],
    usersPut);


router.delete('/:id', [
    JWT,
    hasRole('ADMIN_ROLE','VENTAS_ROLE'),
    //isAdmin,
    check('id', 'No es un id valido').isMongoId().custom(isUser),
    validateInputs
], usersDelete);


module.exports = router;