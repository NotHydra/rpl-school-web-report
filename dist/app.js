"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.use(express_1.default.static('public'));
const port = 3000;
app.listen(port, () => { console.log(`Listening in port ${port}`); });
app.get('/', (req, res) => {
    res.redirect('/home');
    console.log("Redirecting to home");
});
app.get('/home', (req, res) => {
    res.render('home', { title: 'Home' });
    console.log("Home is being requested");
});
app.get('/assignment', (req, res) => {
    res.render('assignment', { title: 'Assignment' });
    console.log("Assignment is being requested");
});
app.get('/classcode', (req, res) => {
    res.render('classcode', { title: 'Class Code' });
    console.log("class Code is being requested");
});
app.get('/leaderboard', (req, res) => {
    res.render('leaderboard', { title: 'Leaderboard' });
    console.log("Leaderboard is being requested");
});
app.get('/statistics', (req, res) => {
    res.render('statistics', { title: 'Statistics' });
    console.log("Statistics is being requested");
});
app.get('/changelog', (req, res) => {
    res.render('changelog', { title: 'Changelog' });
    console.log("Changelog is being requested");
});
app.get('/contributor', (req, res) => {
    res.render('contributor', { title: 'Contributor' });
    console.log("Contributor is being requested");
});
