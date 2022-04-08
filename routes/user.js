const { Router } = require('express');
const {usersPost, usersPut, usersGet, usersDelete } = require('../controllers/users.controller');

const router = Router();

router.get('/', usersGet);

router.put('/:id',usersPut);

router.post('/', usersPost);

router.delete('/:id', usersDelete);


module.exports = router;