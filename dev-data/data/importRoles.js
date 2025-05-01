const mongoose = require('mongoose')
const config = require('../../config/default')
const Role = require('../../models/Role')

const roles = [
    {
        name: 'Admin'
    }
]

mongoose.connect(config.database.mongo.URI).then(con => {
    console.log('MongoDB Connected');
})


const importRoles = async () => {
    try {
        console.log('Importing Roles');
        await Role.create(roles)
        console.log('Roles Added Successfully.'); 
    } catch (error) {
        console.log(error);
    }

    process.exit()
}

const deleteRoles = async () => {
    try {
        console.log('Deleting roles.');
        await Role.deleteMany()
        console.log('Roles deleted Successfully.'); 
    } catch (error) {
        console.log(error);
    }
    process.exit()
}


if(process.argv.includes('--import')) {
    importRoles()
}
if(process.argv.includes('--delete')) {
    deleteRoles()
}