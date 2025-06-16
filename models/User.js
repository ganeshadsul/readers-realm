const validator = require('validator');
const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const schema = {
    firstName: {
        type: String,
        trim: true,
        required: [true, 'First name is required'],
        minLegth: [1, 'First name should have atleast one character.']
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'Last name is required'],
        minLegth: [1, 'Last name should have atleast one character.']
    },
    email: {
        type: String,
        required: [true, 'Email id is required.'],
        lowercase: true,
        trim: true,
        validate: [
            {
                validator: validator.isEmail,
                message: 'Invalid Email'
            }
        ]
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        select: false,
        minLegth: [8, 'Password must of atleast 8 characters'],
        validate: [
            {
                validator: function(val) {
                    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(val)
                },
                message: 'Passowrd must contail atleast one character, one number and one special character.'
            }
        ]
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Confirm password is required'],
        select: false,
        minLegth: [8, 'Confirm password must of atleast 8 characters'],
        validate: [
            {
                validator: function(val) {
                    return val === this.password
                },
                message: 'Confirm password should same as passowrd.'
            }
        ]
    },
    role: {
        type: mongoose.Schema.ObjectId,
        ref: 'Role'
    },
    status: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
}

const userSchema = mongoose.Schema(schema, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})


userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next()
    
    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined
    next()
})

userSchema.methods.validatePassword = async(userPassword, inputPassword) => {
    return await bcrypt.compare(inputPassword, userPassword)
}

const User = mongoose.model('User', userSchema)

module.exports = User