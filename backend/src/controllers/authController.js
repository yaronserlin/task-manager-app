/**
 * Auth controller
 * ---------------
 * Registration, login, and profile retrieval.
 */

const asyncHandler = require('../utils/asyncHandler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// @route  POST /api/auth/register
exports.registerUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (await User.findOne({ email })) {
        res.status(400);
        throw new Error('Email already in use');
    }

    const hashed = await bcrypt.hash(password, 12);

    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashed,
    });

    res.status(201).json({
        _id: user._id,
        firstName,
        lastName,
        email,
        token: generateToken(user._id),
    });
};

// @route  POST /api/auth/login
exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(401);
        throw new Error('Invalid credentials');
    }

    res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateToken(user._id),
    });
});

// @route  GET /api/auth/me
exports.getMe = asyncHandler(async (req, res) => {
    const { id, token } = req.user;
    const user = await User.findById(id).select('-password');
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }
    const { _id, firstName, lastName, email } = user;
    console.log('User profile:', _id, firstName, lastName, email);

    res.json({ _id, email, firstName, lastName, token });
});