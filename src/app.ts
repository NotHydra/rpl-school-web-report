import express, { Application, Request, Response, NextFunction} from "express"
import fs from "fs"

const app: Application = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended:false }))
app.use(express.static('public'))

const port:number = 3000
app.listen(port, () => {console.log(`Listening in port ${port}`)})

fs.readFile(`./json_file/list_of_student.json`, 'utf-8', (err, jsonString)=> {
    var list_of_student_data = JSON.parse(jsonString)

    fs.readFile(`./json_file/list_of_assignment.json`, 'utf-8', (err, jsonString)=> {
        var list_of_assignment_data = JSON.parse(jsonString)

        fs.readFile(`./json_file/list_of_assignment_range.json`, 'utf-8', (err, jsonString)=> {
            var list_of_assignment_range_data = JSON.parse(jsonString)

            translate_data(list_of_assignment_data, list_of_student_data)

            app.get('/', (req: Request, res: Response) => {
                res.redirect('/home')
                console.log("Redirecting to home")
            })
            
            app.get('/home', (req: Request, res: Response) => {
                res.render('home', { title: 'Home', list_of_student_data, list_of_assignment_data, list_of_assignment_range_data })
                console.log("Home is being requested")
            })
            
            app.get('/classcode', (req: Request, res: Response) => {
                res.render('classcode', { title: 'Class Code', list_of_student_data })
                console.log("Class Code is being requested")
            })
            
            app.get('/leaderboard', (req: Request, res: Response) => {
                res.render('leaderboard', { title: 'Leaderboard', list_of_student_data })
                console.log("Leaderboard is being requested")
            })
            
            app.get('/statistics', (req: Request, res: Response) => {
                res.render('statistics', { title: 'Statistics', list_of_student_data })
                console.log("Statistics is being requested")
            })
            
            app.get('/changelog', (req: Request, res: Response) => {
                res.render('changelog', { title: 'Changelog', list_of_student_data })
                console.log("Changelog is being requested")
            })
            
            app.get('/contributor', (req: Request, res: Response) => {
                res.render('contributor', { title: 'Contributor', list_of_student_data })
                console.log("Contributor is being requested")
            })

            fs.readFile(`./json_file/operator_history.json`, 'utf-8', (err, jsonString)=> {
                var operator_history_data = JSON.parse(jsonString)
                
                app.get('/operator', (req: Request, res: Response) => {
                    res.render('operator', { title: 'Operator', list_of_student_data, list_of_assignment_data, list_of_assignment_range_data, operator_history_data })
                    console.log("Operator is being requested")
                })

                app.post('/operator_assignment', (req: Request, res: Response) => {
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
            
                                list_of_assignment_range_data.weekly[list_of_assignment_range_data.weekly.length- 1] -= 1
                                list_of_assignment_range_data.monthly[list_of_assignment_range_data.monthly.length- 1] -= 1
                                
                                update_json_file(list_of_student_data, list_of_assignment_data, list_of_assignment_range_data)
                                operator_history_data.changes.pop()
                                fs.writeFile('./json_file/operator_history.json', JSON.stringify(operator_history_data, null, 4), err => {if (err) console.log(err)})
                            }
                        }
                        
                        res.redirect('/operator')
                    }
                    
                    catch (err) {
                        console.log(err)
                    }

                })
    
                app.post('/operator_week', (req: Request, res: Response) => {
                    try {
                        if(req.body.operator_week_action == 'add'){
                            list_of_assignment_range_data.weekly.push(0)
                            list_of_assignment_range_data.weeks_in_month[list_of_assignment_range_data.weeks_in_month.length-1] += 1
                            
                            update_json_file(list_of_student_data, list_of_assignment_data, list_of_assignment_range_data)
        
                            let data = `Added Week`
                            update_history('changes', data, operator_history_data)
                        }

                        else if(req.body.operator_week_action == 'delete'){
                            let latest_changes = operator_history_data.changes[operator_history_data.changes.length-1].split(" ")

                            if(latest_changes[0] == 'Added' && latest_changes[1] == 'Week'){
                                list_of_assignment_range_data.weekly.pop()
                                list_of_assignment_range_data.weeks_in_month[list_of_assignment_range_data.weeks_in_month.length-1] -= 1
            
                                update_json_file(list_of_student_data, list_of_assignment_data, list_of_assignment_range_data)
                                operator_history_data.changes.pop()
                                fs.writeFile('./json_file/operator_history.json', JSON.stringify(operator_history_data, null, 4), err => {if (err) console.log(err)})
                            }
                        }

                        res.redirect('/operator')
                    }
                    
                    catch (err) {
                        console.log(err)
                    }
                    
                })

                app.post('/operator_month', (req: Request, res: Response) => {
                    try {
                        if(req.body.operator_month_action == 'add'){
                            list_of_assignment_range_data.weekly.push(0)
                            list_of_assignment_range_data.monthly.push(0)
                            list_of_assignment_range_data.weeks_in_month.push(list_of_assignment_range_data.weeks_in_month[list_of_assignment_range_data.weeks_in_month.length-1]+1)
        
                            update_json_file(list_of_student_data, list_of_assignment_data, list_of_assignment_range_data)
        
                            let data = `Added Month`
                            update_history('changes', data, operator_history_data)
                        }

                        else if(req.body.operator_month_action == 'delete'){
                            let latest_changes = operator_history_data.changes[operator_history_data.changes.length-1].split(" ")

                            if(latest_changes[0] == 'Added' && latest_changes[1] == 'Month'){
                                list_of_assignment_range_data.weekly.pop()
                                list_of_assignment_range_data.monthly.pop()
                                list_of_assignment_range_data.weeks_in_month.pop()
            
                                update_json_file(list_of_student_data, list_of_assignment_data, list_of_assignment_range_data)
                                operator_history_data.changes.pop()
                                fs.writeFile('./json_file/operator_history.json', JSON.stringify(operator_history_data, null, 4), err => {if (err) console.log(err)})
                            }
                        }

                        res.redirect('/operator')
                    }
                    
                    catch (err) {
                        console.log(err)
                    }
                    
                })

                app.post('/check_report', (req: Request, res: Response) => {
                    try {
                        if(req.body.report_action == 'check'){
                            if(list_of_student_data[req.body.student_name].student_is_muslim == false && list_of_assignment_data[req.body.assignment_name].assignment_is_for_muslim == true){
                                list_of_student_data[req.body.student_name].student_assignment_done[req.body.assignment_name] = 'NON-MUS'
                                list_of_assignment_data[req.body.assignment_name].assignment_done[req.body.student_name] = 'NON-MUS'
        
                                let data = `Tried To Change ${list_of_student_data[req.body.student_name].student_name} ${list_of_assignment_data[req.body.assignment_name].assignment_lesson_name}${list_of_assignment_data[req.body.assignment_name].assignment_lesson_count}`
                                update_history('reports', data, operator_history_data)
                            }
    
                            else{
                                list_of_student_data[req.body.student_name].student_assignment_done[req.body.assignment_name] = 'ü'
                                list_of_assignment_data[req.body.assignment_name].assignment_done[req.body.student_name] = 'ü'
        
                                let data = `Check ${list_of_student_data[req.body.student_name].student_name} ${list_of_assignment_data[req.body.assignment_name].assignment_lesson_name}${list_of_assignment_data[req.body.assignment_name].assignment_lesson_count}`
                                update_history('reports', data, operator_history_data)
                            }
                        }
    
                        else if(req.body.report_action == 'uncheck'){
                            if(list_of_student_data[req.body.student_name].student_is_muslim == false && list_of_assignment_data[req.body.assignment_name].assignment_is_for_muslim == true){
                                list_of_student_data[req.body.student_name].student_assignment_done[req.body.assignment_name] = 'NON-MUS'
                                list_of_assignment_data[req.body.assignment_name].assignment_done[req.body.student_name] = 'NON-MUS'
        
                                let data = `Tried To Change ${list_of_student_data[req.body.student_name].student_name} ${list_of_assignment_data[req.body.assignment_name].assignment_lesson_name}${list_of_assignment_data[req.body.assignment_name].assignment_lesson_count}`
                                update_history('reports', data, operator_history_data)
                            }
    
                            else {
                                list_of_student_data[req.body.student_name].student_assignment_done[req.body.assignment_name] = null
                                list_of_assignment_data[req.body.assignment_name].assignment_done[req.body.student_name] = null
    
                                let data = `Uncheck ${list_of_student_data[req.body.student_name].student_name} ${list_of_assignment_data[req.body.assignment_name].assignment_lesson_name}${list_of_assignment_data[req.body.assignment_name].assignment_lesson_count}`
                                update_history('reports', data, operator_history_data)
                            }
                        }
    
                        update_json_file(list_of_student_data, list_of_assignment_data, list_of_assignment_range_data)
                        
                        res.redirect('/operator')
                    }
                    
                    catch (err) {
                        console.log(err)
                    }
                    
                })

            })          
        })
    })
})


function translate_data(list_of_assignment_data: any, list_of_student_data: any) {
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

function detranslate_data(list_of_assignment_data: any, list_of_student_data: any) {
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

function create_new_object_for_list_of_assignment(list_of_assignment_data: any, list_of_assignment_range_data: any , req:any) {
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
    return new_object_for_list_of_assignment
}

function update_object_for_list_of_student(list_of_student_data:any, req:any){
    for(let i = 0; i < list_of_student_data.length; i++){
        if(req.body.lesson_name == "PAI" && list_of_student_data[i].student_is_muslim == false ){
            // console.log("test 1", i)
            list_of_student_data[i].student_assignment_done.push("NON-MUS")
        }
        
        else if(req.body.lesson_name == "PAI" && list_of_student_data[i].student_is_muslim == true ){
            // console.log("test 2", i)
            list_of_student_data[i].student_assignment_done.push(null)
        }

        else if(req.body.lesson_name != "PAI"){
            // console.log("test 3", i)
            list_of_student_data[i].student_assignment_done.push(null)
        }
    }
}

function update_object_for_list_of_assignment(list_of_assignment_data:any, new_object_for_list_of_assignment:any){
    list_of_assignment_data.push(new_object_for_list_of_assignment)
}

function update_object_for_list_of_assignment_range(list_of_assignment_range_data: any, req:any) {
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

function update_json_file(list_of_student_data:any, list_of_assignment_data:any, list_of_assignment_range_data:any){
    detranslate_data(list_of_assignment_data, list_of_student_data)
    fs.writeFile('./json_file/list_of_student.json', JSON.stringify(list_of_student_data, null, 4), err => {if (err) console.log(err)})
    fs.writeFile('./json_file/list_of_assignment.json', JSON.stringify(list_of_assignment_data, null, 4), err => { if (err) console.log(err)})
    fs.writeFile('./json_file/list_of_assignment_range.json', JSON.stringify(list_of_assignment_range_data, null, 4), err => {if (err) console.log(err)})
    translate_data(list_of_assignment_data, list_of_student_data)
}

function  update_history(type:string, data:string, operator_history_data:any){
    if (type == 'changes'){
        operator_history_data.changes.push(data)
    }

    else if (type == 'reports'){
        operator_history_data.reports.push(data)
    }

    fs.writeFile('./json_file/operator_history.json', JSON.stringify(operator_history_data, null, 4), err => {if (err) console.log(err)})
}