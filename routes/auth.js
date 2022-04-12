const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const validateInputs = require('../middlewares/validate');
const router = Router();

router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio y mas de 6 letras').notEmpty().isLength({ min: 6 }),
    validateInputs
], login);

module.exports = router;