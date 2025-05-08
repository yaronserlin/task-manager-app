// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// module.exports = async (req, res, next) => {
//     const header = req.headers.authorization;
//     if (!header) return res.status(401).json({ message: 'No token' });

//     const token = header.split(' ')[1];
//     try {
//         const payload = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = { id: payload.id };
//         next();
//     } catch {
//         res.status(401).json({ message: 'Invalid token' });
//     }
// };
const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');

module.exports = asyncHandler(async (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header) throw { status: 401, message: 'No token provided' };

        const token = header.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: payload.id };
        next();
    } catch (err) {
        next(err);
    }
});