import express, { Application, Request, Response, NextFunction} from "express";
import fs from "fs";
import { json } from "stream/consumers";

const app: Application = express();

app.set('view engine', 'ejs');
app.use(express.static('public'))

const port:number = 3000;
app.listen(port, () => {console.log(`Listening in port ${port}`)});

app.get('/', (req: Request, res: Response) => {
    res.redirect('/home');
    console.log("Redirecting to home")
});

fs.readFile(`./json_file/list_of_student.json`, 'utf-8', (err, jsonString)=> {
    var list_of_student_data = JSON.parse(jsonString);

    fs.readFile(`./json_file/list_of_assignment.json`, 'utf-8', (err, jsonString)=> {
        var list_of_assignment_data = JSON.parse(jsonString);

        fs.readFile(`./json_file/list_of_assignment_range.json`, 'utf-8', (err, jsonString)=> {
            var list_of_assignment_range_data = JSON.parse(jsonString);

            for(let i = 0; i < list_of_assignment_data.length; i++){
                for(let j = 0; j < list_of_student_data.length; j++){
                    if (list_of_assignment_data[i].assignment_done[j] == 0){
                        list_of_assignment_data[i].assignment_done[j] = null;
                        list_of_student_data[j].student_assignment_done[i] = null;
                    }

                    if (list_of_assignment_data[i].assignment_done[j] == 1){
                        list_of_assignment_data[i].assignment_done[j] = "ü";
                        list_of_student_data[j].student_assignment_done[i] = "ü";
                    }

                    if (list_of_assignment_data[i].assignment_done[j] == 2){
                        list_of_assignment_data[i].assignment_done[j] = "ü";
                        list_of_student_data[j].student_assignment_done[i] = "ü";
                    }

                    if (list_of_assignment_data[i].assignment_done[j] == 3){
                        list_of_assignment_data[i].assignment_done[j] = "NON-MUS";
                        list_of_student_data[j].student_assignment_done[i] = "NON-MUS";
                    }
                }
            }

            app.get('/home', (req: Request, res: Response) => {
                res.render('home', { title: 'Home', list_of_student_data, list_of_assignment_data, list_of_assignment_range_data });
                console.log("Home is being requested")
            });

            app.get('/assignment', (req: Request, res: Response) => {
                res.render('assignment', { title: 'Assignment', list_of_student_data });
                console.log("Assignment is being requested")
            });
            
            app.get('/classcode', (req: Request, res: Response) => {
                res.render('classcode', { title: 'Class Code', list_of_student_data });
                console.log("Class Code is being requested")
            });
            
            app.get('/leaderboard', (req: Request, res: Response) => {
                res.render('leaderboard', { title: 'Leaderboard', list_of_student_data });
                console.log("Leaderboard is being requested")
            });
            
            app.get('/statistics', (req: Request, res: Response) => {
                res.render('statistics', { title: 'Statistics', list_of_student_data });
                console.log("Statistics is being requested")
            });
            
            app.get('/changelog', (req: Request, res: Response) => {
                res.render('changelog', { title: 'Changelog', list_of_student_data });
                console.log("Changelog is being requested")
            });
            
            app.get('/contributor', (req: Request, res: Response) => {
                res.render('contributor', { title: 'Contributor', list_of_student_data });
                console.log("Contributor is being requested")
            });
        });
    });
});