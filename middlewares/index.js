const  JWT  = require('../middlewares/jwt');
const validateRoles = require('../middlewares/roles');


module.exports = {
    ...validateRoles,
    ...JWT
}