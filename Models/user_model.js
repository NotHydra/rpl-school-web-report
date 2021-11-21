const mongoose = require('mongoose')
const Schema = mongoose.Schema

const user_schema = new Schema({
    id: {
        type: Number,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model('Users', user_schema)
module.exports = User