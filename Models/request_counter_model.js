const mongoose = require('mongoose')
const Schema = mongoose.Schema

const request_counter_schema = new Schema({
    id: {
        type: Number,
        required: true
    },

    home: {
        type: Number,
        required: true
    },

    classcode: {
        type: Number,
        required: true
    },

    leaderboard: {
        type: Number,
        required: true
    },

    statistics: {
        type: Number,
        required: true
    },

    changelog: {
        type: Number,
        required: true
    },

    contributor: {
        type: Number,
        required: true
    },

    operator: {
        type: Number,
        required: true
    },

    login: {
        type: Number,
        required: true
    }
})

const Request_Counter = mongoose.model('request_counters', request_counter_schema)
module.exports = Request_Counter