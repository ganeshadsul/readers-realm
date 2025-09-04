const jwt= require('jsonwebtoken')
const wrapAsync = require('../utils/wrapAsync')
const AppError = require('../utils/AppError')
const User = require('../models/User')
const { INVALID_CREDENTIALS } = require('../constants/errorMessages')
const { LOGIN_SUCCESSFUL } = require('../constants/ApiResponseMessages')
const { SUCCESS, AUTH_TOKEN_TYPE } = require('../constants/appConstants')

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY_DURATION
    })
}

// Login api
exports.login = wrapAsync(async(req, res, next) => {
    const { email, password } = req.body
    if(!email || !password) {
        return next(new AppError(400, 'Please provide email and password!'))
    }

    const user = await User.findOne({ email }).select('+password')
    if(!user || !(await user.validatePassword(user.password, password))) {
        return next(new AppError(401, INVALID_CREDENTIALS))
    }

    const access_token = generateToken(user.id)

    return res.status(200).json({
        status: SUCCESS,
        message: LOGIN_SUCCESSFUL,
        payload: {
            access_token,
            token_type: AUTH_TOKEN_TYPE
        },

    })
    next()
})