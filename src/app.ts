import express, { Application, Request, Response, NextFunction} from "express";

const app: Application = express();

app.set('view engine', 'ejs');
app.use(express.static('public'))

const port:number = 3000;
app.listen(port, () => {console.log(`Listening in port ${port}`)});

app.get('/', (req: Request, res: Response) => {
    res.redirect('/home');
    console.log("Redirecting to home")
});

app.get('/home', (req: Request, res: Response) => {
    res.render('home', { title: 'Home' });
    console.log("Home is being requested")
});

app.get('/assignment', (req: Request, res: Response) => {
    res.render('assignment', { title: 'Assignment' });
    console.log("Assignment is being requested")
});

app.get('/classcode', (req: Request, res: Response) => {
    res.render('classcode', { title: 'Class Code' });
    console.log("class Code is being requested")
});

app.get('/leaderboard', (req: Request, res: Response) => {
    res.render('leaderboard', { title: 'Leaderboard' });
    console.log("Leaderboard is being requested")
});

app.get('/statistics', (req: Request, res: Response) => {
    res.render('statistics', { title: 'Statistics' });
    console.log("Statistics is being requested")
});

app.get('/changelog', (req: Request, res: Response) => {
    res.render('changelog', { title: 'Changelog' });
    console.log("Changelog is being requested")
});

app.get('/contributor', (req: Request, res: Response) => {
    res.render('contributor', { title: 'Contributor' });
    console.log("Contributor is being requested")
});