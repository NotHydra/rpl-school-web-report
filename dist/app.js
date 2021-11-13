"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static('public'));
const port = 3000;
app.listen(port, () => { console.log(`Listening in port ${port}`); });
fs_1.default.readFile(`./json_file/list_of_student.json`, 'utf-8', (err, jsonString) => {
    var list_of_student_data = JSON.parse(jsonString);
    fs_1.default.readFile(`./json_file/list_of_assignment.json`, 'utf-8', (err, jsonString) => {
        var list_of_assignment_data = JSON.parse(jsonString);
        fs_1.default.readFile(`./json_file/list_of_assignment_range.json`, 'utf-8', (err, jsonString) => {
            var list_of_assignment_range_data = JSON.parse(jsonString);
            translate_data(list_of_assignment_data, list_of_student_data);
            app.get('/', (req, res) => {
                res.redirect('/home');
                console.log("Redirecting to home");
            });
            app.get('/home', (req, res) => {
                res.render('home', { title: 'Home', list_of_student_data, list_of_assignment_data, list_of_assignment_range_data });
                console.log("Home is being requested");
            });
            app.get('/classcode', (req, res) => {
                res.render('classcode', { title: 'Class Code', list_of_student_data });
                console.log("Class Code is being requested");
            });
            app.get('/leaderboard', (req, res) => {
                res.render('leaderboard', { title: 'Leaderboard', list_of_student_data });
                console.log("Leaderboard is being requested");
            });
            app.get('/statistics', (req, res) => {
                res.render('statistics', { title: 'Statistics', list_of_student_data });
                console.log("Statistics is being requested");
            });
            app.get('/changelog', (req, res) => {
                res.render('changelog', { title: 'Changelog', list_of_student_data });
                console.log("Changelog is being requested");
            });
            app.get('/contributor', (req, res) => {
                res.render('contributor', { title: 'Contributor', list_of_student_data });
                console.log("Contributor is being requested");
            });
            app.get('/operator', (req, res) => {
                res.render('operator', { title: 'Operator' });
                console.log("Operator is being requested");
            });
            app.post('/operator', (req, res) => {
                try {
                    let new_object_for_list_of_assignment = create_new_object_for_list_of_assignment(list_of_assignment_data, req);
                    update_object_for_list_of_student(list_of_student_data, req);
                    update_object_for_list_of_assignment(list_of_assignment_data, new_object_for_list_of_assignment);
                    update_object_for_list_of_assignment_range(list_of_assignment_range_data, req);
                    detranslate_data(list_of_assignment_data, list_of_student_data);
                    write_new_updated_object_to_json_file(list_of_student_data, list_of_assignment_data, list_of_assignment_range_data);
                    translate_data(list_of_assignment_data, list_of_student_data);
                    // console.log(list_of_student_data)
                    // console.log(list_of_assignment_data)
                    // console.log(list_of_assignment_range_data)
                    res.redirect('/operator');
                    console.log();
                    console.log('Added New Assignment');
                    console.log(`ID    : ${new_object_for_list_of_assignment.assignment_id}`);
                    console.log(`Name  : ${new_object_for_list_of_assignment.assignment_lesson_name}${new_object_for_list_of_assignment.assignment_lesson_count}`);
                    console.log(`Week  : ${new_object_for_list_of_assignment.assignment_in_week}`);
                    console.log(`Month : ${new_object_for_list_of_assignment.assignment_in_month}`);
                    console.log();
                }
                catch (err) {
                    console.log(err);
                }
            });
        });
    });
});
function translate_data(list_of_assignment_data, list_of_student_data) {
    for (let i = 0; i < list_of_assignment_data.length; i++) {
        for (let j = 0; j < list_of_student_data.length; j++) {
            if (list_of_assignment_data[i].assignment_done[j] == 0) {
                list_of_assignment_data[i].assignment_done[j] = null;
                list_of_student_data[j].student_assignment_done[i] = null;
            }
            if (list_of_assignment_data[i].assignment_done[j] == 1) {
                list_of_assignment_data[i].assignment_done[j] = "ü";
                list_of_student_data[j].student_assignment_done[i] = "ü";
            }
            if (list_of_assignment_data[i].assignment_done[j] == 2) {
                list_of_assignment_data[i].assignment_done[j] = "ü";
                list_of_student_data[j].student_assignment_done[i] = "ü";
            }
            if (list_of_assignment_data[i].assignment_done[j] == 3) {
                list_of_assignment_data[i].assignment_done[j] = "NON-MUS";
                list_of_student_data[j].student_assignment_done[i] = "NON-MUS";
            }
        }
    }
}
function detranslate_data(list_of_assignment_data, list_of_student_data) {
    for (let i = 0; i < list_of_assignment_data.length; i++) {
        for (let j = 0; j < list_of_student_data.length; j++) {
            if (list_of_assignment_data[i].assignment_done[j] == "NON-MUS") {
                list_of_assignment_data[i].assignment_done[j] = 3;
                list_of_student_data[j].student_assignment_done[i] = 3;
            }
            if (list_of_assignment_data[i].assignment_done[j] == "ü") {
                list_of_assignment_data[i].assignment_done[j] = 2;
                list_of_student_data[j].student_assignment_done[i] = 2;
            }
            if (list_of_assignment_data[i].assignment_done[j] == "ü") {
                list_of_assignment_data[i].assignment_done[j] = 1;
                list_of_student_data[j].student_assignment_done[i] = 1;
            }
            if (list_of_assignment_data[i].assignment_done[j] == null) {
                list_of_assignment_data[i].assignment_done[j] = 0;
                list_of_student_data[j].student_assignment_done[i] = 0;
            }
        }
    }
}
function create_new_object_for_list_of_assignment(list_of_assignment_data, req) {
    let lesson_count = 0;
    for (let i = 0; i < list_of_assignment_data.length; i++) {
        if (req.body.lesson_name == list_of_assignment_data[i].assignment_lesson_name) {
            lesson_count += 1;
        }
    }
    let lesson_for_muslim = false;
    if (req.body.lesson_name == "PAI") {
        lesson_for_muslim = true;
    }
    let new_object_for_list_of_assignment = {
        "assignment_id": list_of_assignment_data.length + 1,
        "assignment_lesson_name": req.body.lesson_name,
        "assignment_lesson_count": lesson_count + 1,
        "assignment_description": null,
        "assignment_picture": null,
        "assignment_is_for_muslim": lesson_for_muslim,
        "assignment_in_week": req.body.lesson_week,
        "assignment_in_month": req.body.lesson_month,
        "assignment_has_due_date": null,
        "assignment_total_done": 0,
        "assignment_done": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    };
    return new_object_for_list_of_assignment;
}
function update_object_for_list_of_student(list_of_student_data, req) {
    for (let i = 0; i < list_of_student_data.length; i++) {
        if (req.body.lesson_name == "PAI" && list_of_student_data[i].student_is_muslim == false) {
            // console.log("test 1", i)
            list_of_student_data[i].student_assignment_done.push("NON-MUS");
        }
        else if (req.body.lesson_name == "PAI" && list_of_student_data[i].student_is_muslim == true) {
            // console.log("test 2", i)
            list_of_student_data[i].student_assignment_done.push(null);
        }
        else if (req.body.lesson_name != "PAI") {
            // console.log("test 3", i)
            list_of_student_data[i].student_assignment_done.push(null);
        }
    }
}
function update_object_for_list_of_assignment(list_of_assignment_data, new_object_for_list_of_assignment) {
    list_of_assignment_data.push(new_object_for_list_of_assignment);
}
function update_object_for_list_of_assignment_range(list_of_assignment_range_data, req) {
    list_of_assignment_range_data.weekly[parseInt(req.body.lesson_week) - 1] += 1;
    list_of_assignment_range_data.monthly[parseInt(req.body.lesson_month) - 1] += 1;
    let j = 0;
    let k = 0;
    let updated_weeks_in_month = [1];
    for (let i = 0; i < list_of_assignment_range_data.weekly.length; i++) {
        k += list_of_assignment_range_data.weekly[i];
        if (k == list_of_assignment_range_data.monthly[j]) {
            updated_weeks_in_month.push(i + 2);
            j += 1;
            k = 0;
        }
    }
    list_of_assignment_range_data.weeks_in_month = updated_weeks_in_month;
}
function write_new_updated_object_to_json_file(list_of_student_data, list_of_assignment_data, list_of_assignment_range_data) {
    fs_1.default.writeFile('./json_file/list_of_student.json', JSON.stringify(list_of_student_data, null, 4), err => { if (err)
        console.log(err); });
    fs_1.default.writeFile('./json_file/list_of_assignment.json', JSON.stringify(list_of_assignment_data, null, 4), err => { if (err)
        console.log(err); });
    fs_1.default.writeFile('./json_file/list_of_assignment_range.json', JSON.stringify(list_of_assignment_range_data, null, 4), err => { if (err)
        console.log(err); });
}
