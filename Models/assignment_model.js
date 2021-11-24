const mongoose = require('mongoose')
const Schema = mongoose.Schema

const assignment_schema = new Schema({
    assignment_id: {
        type: Number,
        required: true
    },

    assignment_lesson_name: {
        type: String,
        required: true
    },

    assignment_lesson_count: {
        type: Number,
        required: true
    },
    
    assignment_description: {
        type: String
    },

    assignment_picture: {
        type: String
    },

    assignment_is_for_muslim: {
        type: Boolean,
        required: true
    },

    assignment_in_week: {
        type: Number,
        required: true
    },

    assignment_in_month: {
        type: Number,
        required: true
    },

    assignment_has_due_date: {
        type: Boolean
    },

    assignment_total_done: {
        type: Number,
        required: true
    },

    assignment_done: {
        type: Array,
        required: true
    }
})

const Assignment = mongoose.model('Assignments', assignment_schema)
module.exports = Assignment