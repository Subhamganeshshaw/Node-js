const express = require('express')
const bodyParser = require('body-parser')
const students = require('./students')

const app = express()
const jsonParser = bodyParser.json()
app.listen(8000, () => {
    console.log('listing on port 8000');

})

app.get('/', (req, res) => {
    console.log('students', students)
    res.json(students)
})
app.post('/', jsonParser, (req, res) => {
    console.log('req', req.body, 'req.query', req.query)
    students.push(req.body)
    // console.log('students', students)
    res.json(students)
})

app.delete('/', (req, res) => {
    console.log('req.query', req.query)
    console.log('id', req.query.id)
    console.log('students', students)
    const filteredStudents = students.filter(i => {
        return i.id !== parseInt(req.query.id)
    })
    console.log(filteredStudents)
    res.json(filteredStudents)
})

app.put('/students/:id',jsonParser, (req, res) => {
    console.log("in put students")
    let id = req.params.id

    console.log("id",id)
    console.log("req",req.body)
    let first_name = req.body.first_name
    let last_name = req.body.last_name
    let email = req.body.email

    let index = students.findIndex((student) => {
        return (student.id == id)
    })
    console.log("index",index)
    if (index > 0) {
        let std = students[index]
        std.first_name = first_name
        std.last_name = last_name
        std.email = email
        res.json(std)
    }
    else
        res.status(404)

})






















































