const express = require('express');
const bodyParser = require('body-parser');
//const mongoDB = require('mongodb');
const mongoDB = require('./mongoose/mongo');
const List = require('./mongoose/models/list');
const Task = require('./mongoose/models/task');
const ejs = require('ejs');
const dotENV = require('dotenv');
dotENV.config({
    path: "/user.env"
});

const app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get("/lists", (req, res) => {
    List.find({})
        .then(lists => res.send(lists))
        .catch((err) => console.log("Lists error get all: ", err.message));
});

/********LISTS URL ***********/
app.post("/lists", (req, res) => {
    (new List({
        "title": req.body.title
    }))
    .save()
        .then(list => res.send(list))
        .catch((err) => console.log("Lists error save: ", err.message));
});

app.get("/lists/:listId", (req, res) => {
    List.find({
            _id: req.params.listId
        })
        .then(list => res.send(list))
        .catch((err) => console.log("Lists error get one: ", err.message));
});

app.patch("/lists/:listId", (req, res) => {
    List.findOneAndUpdate({
            "_id": req.params.listId
        }, {
            $set: req.body
        })
        .then(list => res.send(list))
        .catch((err) => console.log("Lists error update: ", err.message));
});

app.delete("/lists/:listId", (req, res) => {
    const deleteTasks = (list) => {
        Task.deleteMany({
                _listId: list._id
            })
            .then(() => list)
            .catch((err) => console.log("Lists error Delete1: ", err.message));
    };
    const list = List.findByIdAndDelete(req.params.listId)
        .then((list) => deleteTasks(list))
        .catch((err) => console.log("Lists error Delete2: ", err.message));
    res.status(200).send(list);
});

/********TASKS URL ***********/
app.get("/lists/:listId/tasks", (req, res) => {
    Task.find({
            _listId: req.params.listId
        })
        .then(tasks => res.send(tasks))
        .catch((err) => console.log("Tasks error get all: ", err.message));
});

app.post("/lists/:listId/tasks", (req, res) => {
    (new Task({
        "title": req.body.title,
        "_listId": req.params.listId,
        "completed": req.body.completed
    }))
    .save()
        .then(task => res.send(task))
        .catch((err) => console.log("Tasks error save: ", err.message));
});

app.get("/lists/:listId/tasks/:taskId", (req, res) => {
    Task.findOne({
            _listId: req.params.listId,
            _id: req.params.taskId
        })
        .then(task => res.send(task))
        .catch((err) => console.log("Tasks error get one: ", err.message));
});

app.patch("/lists/:listId/tasks/:taskId", (req, res) => {
    Task.findOneAndUpdate({
            _listId: req.params.listId,
            _id: req.params.taskId
        }, {
            $set: req.body
        })
        .then(task => res.send(task))
        .catch((err) => console.log("Tasks error update: ", err.message));
});

app.delete("/lists/:listId/tasks/:taskId", (req, res) => {
    Task.findOneAndDelete({
            _listId: req.params.listId,
            _id: req.params.taskId
        })
        .then(task => res.send(task))
        .catch((err) => console.log("Tasks error update: ", err.message));
});

PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`app is listening at ${PORT}`);
});