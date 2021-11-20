const mongoose = require('mongoose')
const Schema = mongoose.Schema

const student_schema = new Schema({
    student_id: {
        type: Number,
        required: true
    },

    student_name: {
        type: String,
        required: true
    },

    student_is_muslim: {
        type: Boolean,
        required: true
    },
    
    student_total_asssignment_done: {
        type: String,
        required: true
    },

    student_assignment_done: {
        type: Array,
        required: true
    }
})

const Student = mongoose.model('Students', student_schema)
module.exports = Student