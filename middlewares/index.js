const  JWT  = require('../middlewares/jwt');
const validateRoles = require('../middlewares/roles');
const validateFile = require('../middlewares/validate-file');


module.exports = {
    ...validateRoles,
    ...JWT,
    ...validateFile
}