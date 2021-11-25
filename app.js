if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const Student = require('./Models/student_model')
const Assignment = require('./Models/assignment_model')
const Assignment_Range = require('./Models/assignment_range_model')
const Operator_History = require('./Models/operator_history_model')
const User = require('./Models/user_model')
const Request_Counter = require('./Models/request_counter_model')

const app = express()
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended:false }))
app.use(express.static('public'))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session()) 
app.use(methodOverride('_method'))

const dbURI = 'mongodb+srv://Hydra:UjidwtkA7TTJ9A1g@rpl-class-web-database.2rqk3.mongodb.net/RPL-Class-Web?retryWrites=true&w=majority'
mongoose.connect(process.env.MONGODB_URI || dbURI)
    .then(() => {
        const port = process.env.PORT || 5000
        app.listen(port, () => {console.log(`Listening in http://localhost:${port}`)})
    })

    .catch((err) => console.log(err))


var users
User.find()
    .then((result) => {
        users = result  

        const initializePassport = require('./passport-config')
        initializePassport(
            passport,
            username => users.find(user => user.username === username),
            id => users.find(user => user.id === id)
        )
    })

    
function translate_data(list_of_assignment_data, list_of_student_data) {
    for (let i = 0; i < list_of_assignment_data.length; i++) {
        for (let j = 0; j < list_of_student_data.length; j++) {
            if (list_of_assignment_data[i].assignment_done[j] == 0) {
                list_of_assignment_data[i].assignment_done[j] = null
                list_of_student_data[j].student_assignment_done[i] = null
            }

            if (list_of_assignment_data[i].assignment_done[j] == 1) {
                list_of_assignment_data[i].assignment_done[j] = "ü"
                list_of_student_data[j].student_assignment_done[i] = "ü"
            }

            if (list_of_assignment_data[i].assignment_done[j] == 2) {
                list_of_assignment_data[i].assignment_done[j] = "ü"
                list_of_student_data[j].student_assignment_done[i] = "ü"
            }

            if (list_of_assignment_data[i].assignment_done[j] == 3) {
                list_of_assignment_data[i].assignment_done[j] = "NON-MUS"
                list_of_student_data[j].student_assignment_done[i] = "NON-MUS"
            }
        }
    }
}

function detranslate_data(list_of_assignment_data, list_of_student_data) {
    for (let i = 0; i < list_of_assignment_data.length; i++) {
        for (let j = 0; j < list_of_assignment_data[0].assignment_done.length; j++) {
            if (list_of_assignment_data[i].assignment_done[j] == "NON-MUS") {
                list_of_assignment_data[i].assignment_done[j] = 3
            }

            if (list_of_assignment_data[i].assignment_done[j] == "ü") {
                list_of_assignment_data[i].assignment_done[j] = 2
            }

            if (list_of_assignment_data[i].assignment_done[j] == "ü") {
                list_of_assignment_data[i].assignment_done[j] = 1
            }

            if (list_of_assignment_data[i].assignment_done[j] == null) {
                list_of_assignment_data[i].assignment_done[j] = 0
            }
        }
    }

    for (let i = 0; i < list_of_student_data.length; i++) {
        for (let j = 0; j < list_of_student_data[0].student_assignment_done.length; j++) {
            if (list_of_student_data[i].student_assignment_done[j] == "NON-MUS") {
                list_of_student_data[i].student_assignment_done[j] = 3
            }

            if (list_of_student_data[i].student_assignment_done[j] == "ü") {
                list_of_student_data[i].student_assignment_done[j] = 2
            }

            if (list_of_student_data[i].student_assignment_done[j] == "ü") {
                list_of_student_data[i].student_assignment_done[j] = 1
            }

            if (list_of_student_data[i].student_assignment_done[j] == null) {
                list_of_student_data[i].student_assignment_done[j] = 0
            }
        }
    }
}

function create_new_object_for_list_of_assignment(list_of_assignment_data, list_of_assignment_range_data, req) {
    let lesson_count = 0
    for (let i = 0; i < list_of_assignment_data.length; i++) {
        if (req.body.lesson_name == list_of_assignment_data[i].assignment_lesson_name) {
            lesson_count += 1
        }
    }

    let lesson_for_muslim = false
    if (req.body.lesson_name == "PAI") {
        lesson_for_muslim = true
    }

    let new_object_for_list_of_assignment = {
        "assignment_id": list_of_assignment_data.length + 1,
        "assignment_lesson_name": req.body.lesson_name,
        "assignment_lesson_count": lesson_count + 1,
        "assignment_description": null,
        "assignment_picture": null,
        "assignment_is_for_muslim": lesson_for_muslim,
        "assignment_in_week": list_of_assignment_range_data.weekly.length,
        "assignment_in_month": list_of_assignment_range_data.monthly.length,
        "assignment_has_due_date": null,
        "assignment_total_done": 0,
        "assignment_done": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    };

    const assignment = new Assignment({
        assignment_id: list_of_assignment_data.length + 1,
        assignment_lesson_name: req.body.lesson_name,
        assignment_lesson_count: lesson_count + 1,
        assignment_description: null,
        assignment_picture: null,
        assignment_is_for_muslim: lesson_for_muslim,
        assignment_in_week: list_of_assignment_range_data.weekly.length,
        assignment_in_month: list_of_assignment_range_data.monthly.length,
        assignment_has_due_date: null,
        assignment_total_done: 0,
        assignment_done: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    })

    assignment.save()
        .catch((err) => console.log(err))

    return new_object_for_list_of_assignment
}

function update_object_for_list_of_student(list_of_student_data, req){
    for(let i = 0; i < list_of_student_data.length; i++){
        if(req.body.lesson_name == "PAI" && list_of_student_data[i].student_is_muslim == false ){
            list_of_student_data[i].student_assignment_done.push("NON-MUS")
        }
        
        else if(req.body.lesson_name == "PAI" && list_of_student_data[i].student_is_muslim == true ){
            list_of_student_data[i].student_assignment_done.push(null)
        }

        else if(req.body.lesson_name != "PAI"){
            list_of_student_data[i].student_assignment_done.push(null)
        }
    }
}

function update_object_for_list_of_assignment(list_of_assignment_data, new_object_for_list_of_assignment){
    list_of_assignment_data.push(new_object_for_list_of_assignment)
}

function update_object_for_list_of_assignment_range(list_of_assignment_range_data, req) {
    list_of_assignment_range_data.weekly[list_of_assignment_range_data.weekly.length - 1] += 1
    list_of_assignment_range_data.monthly[list_of_assignment_range_data.monthly.length - 1] += 1

    // Add 1 value to every data in weekly range
    for(let i = 0; i < list_of_assignment_range_data.weekly.length; i++){
        list_of_assignment_range_data.weekly[i] += 1
    }

    // Find the amount of weeks in a month
    let weeks_in_month_range = []
    for(let i = 0; i < list_of_assignment_range_data.weeks_in_month.length - 1; i++){
        let temp_value = list_of_assignment_range_data.weeks_in_month[i+1] - list_of_assignment_range_data.weeks_in_month[i] 
        weeks_in_month_range.push(temp_value)
    }

    // Add value to every data in monthly range
    for(let i = 0; i < list_of_assignment_range_data.monthly.length; i++){
        list_of_assignment_range_data.monthly[i] += weeks_in_month_range[i]
    }

    // Update the value of weeks in month
    let j = 0
    let k = 0
    let updated_weeks_in_month = [1]
    for(let i = 0; i < list_of_assignment_range_data.weekly.length; i++){
        k += list_of_assignment_range_data.weekly[i]

        if(k == list_of_assignment_range_data.monthly[j]){
            updated_weeks_in_month.push(i + 2)

            j += 1
            k = 0
        }
    }  

    list_of_assignment_range_data.weeks_in_month = updated_weeks_in_month

    // Subtract value to every data in weekly & monthly range
    for(let i = 0; i < list_of_assignment_range_data.weekly.length; i++){
        list_of_assignment_range_data.weekly[i] -= 1
    }

    for(let i = 0; i < list_of_assignment_range_data.monthly.length; i++){
        list_of_assignment_range_data.monthly[i] -= weeks_in_month_range[i]
    }
}

function update_json_file(list_of_student_data, list_of_assignment_data, list_of_assignment_range_data){ 
    function update_student_data(i){
        if(i < list_of_student_data.length){
            Student.findOneAndUpdate({student_id: i+1}, {student_total_asssignment_done: list_of_student_data[i].student_total_asssignment_done, student_assignment_done: list_of_student_data[i].student_assignment_done})
                .then(() =>{
                    i += 1
                    console.log("Student", i)   
                    update_student_data(i)
                })

                .catch((err) => {
                    console.log(err)
                })
        }

        else if(i == list_of_student_data.length){
            var j = 0
            update_assignment_data(j)
        }
    }
    
    function update_assignment_data(j){
        if(j < list_of_assignment_data.length){
            Assignment.findOneAndUpdate({assignment_id: j+1}, {assignment_total_done: list_of_assignment_data[j].assignment_total_done, assignment_done: list_of_assignment_data[j].assignment_done})
                .then(() =>{
                    j += 1
                    console.log("Assignment", j)
                    update_assignment_data(j)        
                })

                .catch((err) => {
                    console.log(err)
                })
        }

        else if(j == list_of_assignment_data.length){
            translate_data(list_of_assignment_data, list_of_student_data)
            update_assignment_range_data()
        }
    }

    function update_assignment_range_data(){
        Assignment_Range.findOneAndUpdate({id: 1}, {
            weekly: list_of_assignment_range_data.weekly,
            monthly: list_of_assignment_range_data.monthly,
            weeks_in_month: list_of_assignment_range_data.weeks_in_month
        })
            .then(() => console.log("Assignment Range"))
            .catch((err) => console.log(err))
    }   

    detranslate_data(list_of_assignment_data, list_of_student_data)

    var i = 0
    update_student_data(i)
}

function update_history(type, data, operator_history_data){
    if (type == 'changes'){
        operator_history_data.changes.push(data)
    }

    else if (type == 'reports'){
        operator_history_data.reports.push(data)
    }
}

function request_counter(page){
    Request_Counter.find()
        .then((result) => {
            let request_counter_data = result[0]

            if (page == "home") {
                request_counter_data.home += 1
                Request_Counter.findOneAndUpdate({id: 1}, {home: request_counter_data.home}).then(() => console.log(`Home : ${request_counter_data.home}`))
            }

            else if (page == "classcode") {
                request_counter_data.classcode += 1
                Request_Counter.findOneAndUpdate({id: 1}, {classcode: request_counter_data.classcode}).then(() => console.log(`Classcode : ${request_counter_data.classcode}`))
            }

            else if (page == "leaderboard") {
                request_counter_data.leaderboard += 1
                Request_Counter.findOneAndUpdate({id: 1}, {leaderboard: request_counter_data.leaderboard}).then(() => console.log(`Leaderboard : ${request_counter_data.leaderboard}`))
            }

            else if (page == "statistics") {
                request_counter_data.statistics += 1
                Request_Counter.findOneAndUpdate({id: 1}, {statistics: request_counter_data.statistics}).then(() => console.log(`Statistics : ${request_counter_data.statistics}`))
            }

            else if (page == "changelog") {
                request_counter_data.changelog += 1
                Request_Counter.findOneAndUpdate({id: 1}, {changelog: request_counter_data.changelog}).then(() => console.log(`Changelog : ${request_counter_data.changelog}`))
            }

            else if (page == "contributor") {
                request_counter_data.contributor += 1
                Request_Counter.findOneAndUpdate({id: 1}, {contributor: request_counter_data.contributor}).then(() => console.log(`Contributor : ${request_counter_data.contributor}`))
            }

            else if (page == "operator") {
                request_counter_data.operator += 1
                Request_Counter.findOneAndUpdate({id: 1}, {operator: request_counter_data.operator}).then(() => console.log(`Operator : ${request_counter_data.operator}`))
            }

            else if (page == "login") {
                request_counter_data.login += 1
                Request_Counter.findOneAndUpdate({id: 1}, {login: request_counter_data.login}).then(() => console.log(`Login : ${request_counter_data.login}`))
            }
        })
}

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/operator')
    }

    next()
}

function find_data_collection(){
    Student.find()
        .then((result) => {
            var list_of_student_data = result

            Assignment.find()
                .then((result) => {
                    var list_of_assignment_data = result

                    Assignment_Range.find()
                        .then((result) => {
                            var list_of_assignment_range_data = result[0]

                            Operator_History.find()
                                .then((result) => {
                                    var operator_history_data = result[0]

                                    run_program(list_of_student_data, list_of_assignment_data, list_of_assignment_range_data, operator_history_data)
                                })
                        })
                })
        })
}

function run_program(list_of_student_data, list_of_assignment_data, list_of_assignment_range_data, operator_history_data){
    translate_data(list_of_assignment_data, list_of_student_data)

    //#region Request
    app.get('', (req, res) => {
        res.redirect('/home')
    })

    app.get('/', (req, res) => {
        res.redirect('/home')
    })
    
    app.get('/home', (req, res) => {
        res.render('home', { title: 'Home', list_of_student_data, list_of_assignment_data, list_of_assignment_range_data })
        
        request_counter("home")
    })
    
    app.get('/classcode', (req, res) => {
        res.render('classcode', { title: 'Class Code', list_of_student_data })

        request_counter("classcode")
    })
    
    app.get('/leaderboard', (req, res) => {
        res.render('leaderboard', { title: 'Leaderboard', list_of_student_data })

        request_counter("leaderboard")
    })
    
    app.get('/statistics', (req, res) => {
        res.render('statistics', { title: 'Statistics', list_of_student_data, list_of_assignment_range_data })

        request_counter("statistics")
    })
    
    app.get('/changelog', (req, res) => {
        res.render('changelog', { title: 'Changelog', list_of_student_data })

        request_counter("changelog")
    })
    
    app.get('/contributor', (req, res) => {
        res.render('contributor', { title: 'Contributor', list_of_student_data })

        request_counter("contributor")
    })

    //#endregion Request

    //#region Operator Request
    app.get('/operator', checkAuthenticated, (req, res) => {
        res.render('operator', { title: 'Operator', list_of_student_data, list_of_assignment_data, list_of_assignment_range_data, operator_history_data })

        request_counter("operator")
    })

    app.post('/operator_assignment', checkAuthenticated, (req, res) => {
        try {
            if(req.body.operator_assignment_action == 'add'){
                let new_object_for_list_of_assignment = create_new_object_for_list_of_assignment(list_of_assignment_data, list_of_assignment_range_data, req)

                update_object_for_list_of_student(list_of_student_data, req)
                update_object_for_list_of_assignment(list_of_assignment_data, new_object_for_list_of_assignment)
                update_object_for_list_of_assignment_range(list_of_assignment_range_data, req)

                update_json_file(list_of_student_data, list_of_assignment_data, list_of_assignment_range_data)
                
                let data = `Added Assignment (${new_object_for_list_of_assignment.assignment_id}|${new_object_for_list_of_assignment.assignment_lesson_name}${new_object_for_list_of_assignment.assignment_lesson_count}|${new_object_for_list_of_assignment.assignment_in_week}|${new_object_for_list_of_assignment.assignment_in_month})`
                update_history('changes', data, operator_history_data)
            }

            else if(req.body.operator_assignment_action == 'delete'){
                let latest_changes = operator_history_data.changes[operator_history_data.changes.length-1].split(" ")

                if(latest_changes[0] == 'Added' && latest_changes[1] == 'Assignment'){
                    for(let i = 0; i < list_of_student_data.length; i++){
                        list_of_student_data[i].student_assignment_done.pop()
                    }

                    list_of_assignment_data.pop()
                    Assignment.findOneAndRemove({assignment_id: list_of_assignment_data.length+1})
                        .catch((err) => console.log(err))

                    list_of_assignment_range_data.weekly[list_of_assignment_range_data.weekly.length- 1] -= 1
                    list_of_assignment_range_data.monthly[list_of_assignment_range_data.monthly.length- 1] -= 1
                    
                    update_json_file(list_of_student_data, list_of_assignment_data, list_of_assignment_range_data)

                    operator_history_data.changes.pop()
                    Operator_History.findOneAndUpdate({id: 1}, {changes: operator_history_data.changes, reports: operator_history_data.reports})
                        .catch((err) => console.log(err))
                }
            }
            
            res.redirect('/operator')
        }
        
        catch (err) {
            console.log(err)
        }

    })

    app.post('/operator_week', checkAuthenticated, (req, res) => {
        try {
            if(req.body.operator_week_action == 'add'){
                list_of_assignment_range_data.weekly.push(0)
                list_of_assignment_range_data.weeks_in_month[list_of_assignment_range_data.weeks_in_month.length-1] += 1
                
                let data = `Added Week`
                update_history('changes', data, operator_history_data)
            }

            else if(req.body.operator_week_action == 'delete'){
                let latest_changes = operator_history_data.changes[operator_history_data.changes.length-1].split(" ")

                if(latest_changes[0] == 'Added' && latest_changes[1] == 'Week'){
                    list_of_assignment_range_data.weekly.pop()
                    list_of_assignment_range_data.weeks_in_month[list_of_assignment_range_data.weeks_in_month.length-1] -= 1

                    operator_history_data.changes.pop()
                }
            }

            Assignment_Range.findOneAndUpdate({id: 1}, {
                weekly: list_of_assignment_range_data.weekly,
                monthly: list_of_assignment_range_data.monthly,
                weeks_in_month: list_of_assignment_range_data.weeks_in_month
            })
                .then(() => {
                    Operator_History.findOneAndUpdate({id: 1}, {changes: operator_history_data.changes, reports: operator_history_data.reports})

                    res.redirect('/operator')
                })
        }
        
        catch (err) {
            console.log(err)
        }
        
    })

    app.post('/operator_month', checkAuthenticated, (req, res) => {
        try {
            
            if(req.body.operator_month_action == 'add'){
                list_of_assignment_range_data.weekly.push(0)
                list_of_assignment_range_data.monthly.push(0)
                list_of_assignment_range_data.weeks_in_month.push(list_of_assignment_range_data.weeks_in_month[list_of_assignment_range_data.weeks_in_month.length-1]+1)

                let data = `Added Month`
                update_history('changes', data, operator_history_data)
            }

            else if(req.body.operator_month_action == 'delete'){
                let latest_changes = operator_history_data.changes[operator_history_data.changes.length-1].split(" ")

                if(latest_changes[0] == 'Added' && latest_changes[1] == 'Month'){
                    list_of_assignment_range_data.weekly.pop()
                    list_of_assignment_range_data.monthly.pop()
                    list_of_assignment_range_data.weeks_in_month.pop()

                    operator_history_data.changes.pop()
                }
            }

            Assignment_Range.findOneAndUpdate({id: 1}, {
                weekly: list_of_assignment_range_data.weekly,
                monthly: list_of_assignment_range_data.monthly,
                weeks_in_month: list_of_assignment_range_data.weeks_in_month
            })
                .then(() => {
                    Operator_History.findOneAndUpdate({id: 1}, {changes: operator_history_data.changes, reports: operator_history_data.reports})

                    res.redirect('/operator')
                })
        }
        
        catch (err) {
            console.log(err)
        }
        
    })

    app.post('/check_report', checkAuthenticated, (req, res) => {
        try {
            let data

            if(req.body.report_action == 'check'){
                if(list_of_student_data[req.body.student_name].student_is_muslim == false && list_of_assignment_data[req.body.assignment_name].assignment_is_for_muslim == true){
                    list_of_student_data[req.body.student_name].student_assignment_done[req.body.assignment_name] = 'NON-MUS'
                    list_of_assignment_data[req.body.assignment_name].assignment_done[req.body.student_name] = 'NON-MUS'

                    data = `Tried To Change ${list_of_student_data[req.body.student_name].student_name} ${list_of_assignment_data[req.body.assignment_name].assignment_lesson_name}${list_of_assignment_data[req.body.assignment_name].assignment_lesson_count}`
                }

                else{
                    list_of_student_data[req.body.student_name].student_assignment_done[req.body.assignment_name] = 'ü'
                    list_of_assignment_data[req.body.assignment_name].assignment_done[req.body.student_name] = 'ü'
                    list_of_assignment_data[req.body.assignment_name].assignment_total_done += 1

                    data = `Check ${list_of_student_data[req.body.student_name].student_name} ${list_of_assignment_data[req.body.assignment_name].assignment_lesson_name}${list_of_assignment_data[req.body.assignment_name].assignment_lesson_count}`
                }
            }

            else if(req.body.report_action == 'uncheck'){
                if(list_of_student_data[req.body.student_name].student_is_muslim == false && list_of_assignment_data[req.body.assignment_name].assignment_is_for_muslim == true){
                    list_of_student_data[req.body.student_name].student_assignment_done[req.body.assignment_name] = 'NON-MUS'
                    list_of_assignment_data[req.body.assignment_name].assignment_done[req.body.student_name] = 'NON-MUS'

                    data = `Tried To Change ${list_of_student_data[req.body.student_name].student_name} ${list_of_assignment_data[req.body.assignment_name].assignment_lesson_name}${list_of_assignment_data[req.body.assignment_name].assignment_lesson_count}`
                }

                else {
                    list_of_student_data[req.body.student_name].student_assignment_done[req.body.assignment_name] = null
                    list_of_assignment_data[req.body.assignment_name].assignment_done[req.body.student_name] = null
                    list_of_assignment_data[req.body.assignment_name].assignment_total_done -= 1

                    data = `Uncheck ${list_of_student_data[req.body.student_name].student_name} ${list_of_assignment_data[req.body.assignment_name].assignment_lesson_name}${list_of_assignment_data[req.body.assignment_name].assignment_lesson_count}`
                }
            }

            detranslate_data(list_of_assignment_data, list_of_student_data)
            Student.findOneAndUpdate({student_id: (parseInt(req.body.student_name) + 1)}, {student_total_asssignment_done: list_of_student_data[req.body.student_name].student_total_asssignment_done, student_assignment_done: list_of_student_data[req.body.student_name].student_assignment_done})
                .then(() => {
                    Assignment.findOneAndUpdate({assignment_id: (parseInt(req.body.assignment_name) + 1)}, {assignment_total_done: list_of_assignment_data[req.body.assignment_name].assignment_total_done, assignment_done: list_of_assignment_data[req.body.assignment_name].assignment_done})
                        .then(() => {
                            update_history('reports', data, operator_history_data)
                            
                            translate_data(list_of_assignment_data, list_of_student_data)

                            res.redirect('/operator')
                        })
                })
        }
        
        catch (err) {
            console.log(err)
        }
        
    })
    
    //#endregion Operator Request

    //#region Login
    app.get('/login', checkNotAuthenticated, (req, res) => {
        res.render('login', { title: 'Login'})

        request_counter("login")
    })

    app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
        successRedirect: '/operator',
        failureRedirect: '/login',
        failureFlash: true
    }))

    app.delete('/logout', (req, res) => {
        req.logOut()
        res.redirect('/login')
    })

    //#endregion Login

    app.use((req, res) =>{
        res.status(404).send("404");
    });
}

find_data_collection()