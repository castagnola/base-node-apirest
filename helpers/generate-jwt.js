const jwt = require('jsonwebtoken');

const generateJWT = async(uid = '') => {
    const payload = { uid };
    const token = jwt.sign(payload, process.env.SECRET_OR_PRIVATE_KEY, {
        expiresIn: '1h'
    });

    return token;
}

module.exports = {
    generateJWT
}