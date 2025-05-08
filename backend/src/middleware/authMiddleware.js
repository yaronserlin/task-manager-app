
const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');

module.exports = asyncHandler(async (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header) throw { status: 401, message: 'No token provided' };

        const token = header.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: payload.id, token: token };
        next();
    } catch (err) {
        next(err);
    }
});