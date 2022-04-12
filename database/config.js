const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Online');

    } catch (error) {
        throw new Error('error en la coneccion DB')
            
    }
}


module.exports = {
    dbConnection,
}