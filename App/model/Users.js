const mongoose = require('mongoose')
const Schema =mongoose.Schema

const UserSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique:true,
    },
    name: {
        type: String,
        required: true,
        unique:true,
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    
})
module.exports = mongoose.model('users', UserSchema)