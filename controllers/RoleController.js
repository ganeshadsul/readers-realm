const { SUCCESS, FAIL } = require("../constants/appConstants");
const wrapAsync = require("../utils/wrapAsync");
const Role = require('../models/Role');
const { ROLES_FOUND } = require("../constants/ApiResponseMessages");
const { Types } = require("mongoose");
const AppError = require("../utils/AppError");
const User = require("../models/User");

exports.getRoles = wrapAsync(async(req, res, next) => {

    const {id, name, status, value, sortBy = 'name', sortOrder = 'asc', page = 1, pageSize = 10} = req.query
    let filter = {}

    if(id) {
        filter._id = id.split(',').map(val => Types.ObjectId.createFromHexString(val))
    }
    if(status) {
        filter.status = { $in: status.split(',')}
    }
    if(name) {
        filter.name = { $regex: `^${name}`, $options: `i` }
    }
    if(value) {
        filter.value = { $regex: `^${value}`, $options: `i` }
    }

    const roles = await Role.find(filter)
        .sort({ [sortBy] : sortOrder === 'asc' ? 1 : -1 })
        .skip((parseInt(page) - 1) * parseInt(pageSize))
        .limit(parseInt(pageSize))

    const total = await Role.countDocuments(filter)
    return res.status(200).json({
        status: SUCCESS,
        message: ROLES_FOUND,
        payload: {
            meta: {
                id,
                name,
                status,
                sortBy,
                sortOrder,
                page: parseInt(page),
                pageSize: parseInt(pageSize),
                total,
            },
            data: {
                roles,
            },
        }
    })
})

exports.createRole = wrapAsync(async(req, res, next) => {

    const role = new Role(req.body)
    try {
        await role.save()
    } catch(err) {
        if(err.name === "ValidationError") {
            const errors = Object.entries(err.errors).map(([field, error]) => ({
                field,
                message: error.message
            }));
            return res.status(422).json({
                status: FAIL,
                message: 'Something Went Wrong!',
                errors
            })
        }
        else {
            return res.status(422).json({
                status: FAIL,
                message: 'Something Went Wrong!',
            })
        }
    }

    return res.status(200).json({
        status: SUCCESS,
        body: req.body,
        role
    })

    next()
})