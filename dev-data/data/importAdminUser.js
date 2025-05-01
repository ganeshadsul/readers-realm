const mongoose = require('mongoose')
const config = require('../../config/default')
const Role = require('../../models/Role')
const User = require('../../models/User')
const user = {
    firstName: "Admin",
    lastName: "Overseer",
    email: 'admin@gmail.com',
    password: 'admin@1234',
    passwordConfirm: 'admin@1234',
}
mongoose.connect(config.database.mongo.URI).then(con => {
    console.log('MongoDB Connected');
})

const importAdmin = async () => {
    try {
        const role = await Role.findOne({value: 'admin'})
        user.role = role.id
        await User.create(user)
        console.log('User created successfully');
    } catch (error) {
        console.log(error);
    }
    process.exit()
}

const deleteAdmin = async () => {
    try {
        console.log('deleting admin user.');
        await User.deleteMany({email: user.email})
        console.log('user deleted.');
    } catch (error) {
        console.log(error);
    }
    process.exit()
}

if(process.argv.includes('--import')) {
    importAdmin()
}
if(process.argv.includes('--delete')) {
    deleteAdmin()
}