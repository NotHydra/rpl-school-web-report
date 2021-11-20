const mongoose = require('mongoose')
const Schema = mongoose.Schema

const operator_history_schema = new Schema({
    changes: {
        type: Array,
        required: true
    },

    reports: {
        type: Array,
        required: true
    }
})

const Operator_History = mongoose.model('operator_histories', operator_history_schema)
module.exports = Operator_History