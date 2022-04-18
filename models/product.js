const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es requerido'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
        
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        
    },
    price: {
        type: Number,
        default: 0,
        
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: { type: String },
    available: {
        type: Boolean,
        default: true,
        
    }
});

//Remueve valores en la respuesta
ProductSchema.methods.toJSON = function () {
    const { __v, _id, status, ...data } = this.toObject();
    data.uid = _id;
    return data;
}
module.exports = model('Product', ProductSchema);