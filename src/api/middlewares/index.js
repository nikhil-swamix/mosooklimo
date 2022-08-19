const { verifyToken } = require('../../util/token');
const { generateError } = require('../../util/error');
const dotenv = require('dotenv');

dotenv.config();

const userAuthGuard = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const key = process.env.USER_AUTH_KEY;
        const decoded = verifyToken(token, key);
        req._user = decoded;
        next();
    } catch(err) {
        const error = generateError('Unauthorized access.', 401);
        next(error);
    }
}

module.exports = {
    userAuthGuard
}