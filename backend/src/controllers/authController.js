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
    const { _id, firstName, lastName, email } = req.user;
    res.json({ _id, firstName, lastName, email });
});


// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const { registerSchema, loginSchema } = require('../validators/authValidator');

// exports.register = async (req, res, next) => {
//     try {
//         const { error } = registerSchema.validate(req.body);
//         if (error) return res.status(400).json({ message: error.details[0].message });

//         const { name, email, password } = req.body;
//         console.log('Register attempt for:', email);
//         const existing = await User.findOne({ email });
//         if (existing) return res.status(400).json({ message: 'Email in use' });

//         const hash = await bcrypt.hash(password, 10);
//         const user = new User({ name, email, password: hash });
//         await user.save();

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//         console.log('User registered:', user._id);
//         res.status(201).json({ token });
//     } catch (err) {
//         next(err);
//     }
// };

// exports.login = async (req, res, next) => {
//     try {
//         const { error } = loginSchema.validate(req.body);
//         if (error) return res.status(400).json({ message: error.details[0].message });

//         const { email, password } = req.body;
//         console.log('Login attempt for:', email);
//         const user = await User.findOne({ email });
//         if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//         const match = await bcrypt.compare(password, user.password);
//         if (!match) return res.status(400).json({ message: 'Invalid credentials' });

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//         console.log('User logged in:', user._id);
//         res.json({ token });
//     } catch (err) {
//         next(err);
//     }
// };

// exports.profile = async (req, res, next) => {
//     try {
//         const { error } = loginSchema.validate(req.body);
//         if (error) return res.status(400).json({ message: error.details[0].message });

//         const { id } = req.user;
//         console.log('Profile attempt for id:', id);
//         const user = await User.findById(id);
//         if (!user) return res.status(400).json({ message: 'Invalid credentials' });
//         res.json({ id: user._id, name: user.name, email: user.email });
//     } catch (err) {
//         next(err);
//     }
// };

