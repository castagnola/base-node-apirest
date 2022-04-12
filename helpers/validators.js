const Role = require('../models/role');
const User = require('../models/user');


const isRoleValidate = async (role = '') => {
    const existRol = await Role.findOne({ role });
    if (!existRol) {
        throw new Error(`El ${role} no existe!`);
    }
}

const isEmail = async (email = '') => {
    const existEmail = await User.findOne({ email });
    if (existEmail) {
        console.log('entra');
        throw new Error(`El correo: ${email} ya esta registrado!`);
    }
};
const isUser = async (id) => {
    const existId = await User.findById(id);
    if (!existId) {
        throw new Error(`El ${id} no existe!`);
    }
}
    
module.exports = {
    isRoleValidate,
    isEmail,
    isUser
}