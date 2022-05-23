const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    id: {
        type: String,

    },
    name: {
        type: String,

    },
    email: {
        type: String,

    },
    password: {
        type: String,

    },
    avatar: {
        type: String,

    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})
module.exports = mongoose.model('users', UserSchema)