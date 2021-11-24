const mongoose = require('mongoose')
const Schema = mongoose.Schema

const assignment_range_schema = new Schema({
    weekly: {
        type: Array,
        required: true
    },

    monthly: {
        type: Array,
        required: true
    },

    weeks_in_month: {
        type: Array,
        required: true
    }
})

const Assignment_Range = mongoose.model('Assignment_Ranges', assignment_range_schema)
module.exports = Assignment_Range