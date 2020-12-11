//instatiation of express router.
var express = require('express');
var router = express.Router();

//reference  to task module
const Task = require('../models/task')
const globals = require('../../config/globals')

//allow cross origin requests
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', globals.clientRoot);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    next()
})

//get all api
router.get('/', (req,res) => {

    //return all the task to view

    Task.find((err, task) => {
        if(err){
            return res.send(err).status(400)
        }else {
            res.json(task).status(200)
        }
    })
})

//get one api
router.get('/:_id', (req,res) => {
    //return selected task
    Task.findById(req.params._id,(err, task )=> {
        if (err){
            return res.send(err).status(400)
        }else {
            res.json(task).status(200)
        }
    })
})

router.post('/', (req,res) => {
    Task.create({
        name: req.body.name,
        complete: req.body.complete,
        priority: req.body.priority
    }, (err, task) => {
        if (err) {
            return res.send(err).status(400)
        } else {
            res.json(task).status(201)
        }
    })
})

//delete
router.delete('/:_id',(req, res) => {
    Task.remove({_id: req.params._id}, (err, task) => {
        if(err) {
            return res.send(err).status(400)
        }else {
            res.json(task).status(201)
        }
    })
})

//put(Update)
router.put('/:_id',(req, res) => {
    Task.update({_id: req.params._id}, req.body ,(err, task) => {
        if(err) {
            return res.send(err).status(400)
        }else {
            res.json(task).status(201)
        }
    })
})


//make this public
module.exports = router;
