const { Category, Product } = require('../models');
const Role = require('../models/role');
const User = require('../models/user');

/**
 * Validadores de usuarios
 * @param {*} role 
 */
const isRoleValidate = async (role = '') => {
    const existRol = await Role.findOne({ role });
    if (!existRol) {
        throw new Error(`El ${role} no existe!`);
    }
}

/**
 * 
 * @param {*} email 
 */
const isEmail = async (email = '') => {
    const existEmail = await User.findOne({ email });
    if (existEmail) {
        throw new Error(`El correo: ${email} ya esta registrado!`);
    }
};

/**
 * 
 * @param {*} id 
 */
const isUser = async (id='') => {
    const existId = await User.findById(id);
    if (!existId) {
        throw new Error(`El ${id} no existe!`);
    }
}

/**
 * Validadores de categorias
 * @param {*} id 
 */
const isCategory = async (id='') => {
    const existId = await Category.findById(id);
    if (!existId) {
        throw new Error(`El id: ${id}, no es valido para ninguna categoria`)
    }
}

/**
 * 
 * @param {*} name 
 */
const existCategoryName = async (name = '') => {
    const existCat = await Category.findOne({ name: name.toUpperCase(), status:true });

    if (existCat) {
        throw new Error(`La categoria con el nombre ${name} ya existe`)
    }
}

const isProduct = async (id = '') => {
    const existProduc = await Product.findById(id);
    console.log(existProduc);

    if (!existProduc) {
        throw new Error(`El id: ${id}, no es valido para ningun Producto`)
    }
}

/**
 * 
 * @param {*} collection 
 * @param {*} collections 
 */
const isCollections =  (collection='',collections=[]) => {
    
    const include = collections.include(collection);
    if (!include) {
        throw new Error(`La collección ${collection} no es permitida - ${collections}`);
    }

    return true;
}


module.exports = {
    isRoleValidate,
    isEmail,
    isUser,
    isCategory,
    isProduct,
    isCollections,
    existCategoryName
}