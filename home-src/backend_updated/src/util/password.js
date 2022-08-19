const bcrypt = require('bcryptjs');

const generatePassword = (password = '') => {
    return bcrypt.hashSync(password, 10);
}

const checkPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}

module.exports = {
    generatePassword,
    checkPassword
}