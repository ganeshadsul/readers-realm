const mongoose = require('mongoose');

const schema = {
    name: {
        type: String,
        trim: true,
        required: [true, 'Role name is required.'],
        minLength: [2, 'Role must have atleast 2 characters'],
    },
    value: {
        type: String,
        trim: true,
        lowercase: true
    },
    status: {
        type: Number,
        default: 1
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        default: null 
    },
    updatedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        default: null 
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
}

const roleSchema = mongoose.Schema(schema, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})


roleSchema.pre('save', function(next) {
    this.value = this.name.split(' ').join('_')
    next()
})

const Role = mongoose.model('Role', roleSchema)

module.exports = Role