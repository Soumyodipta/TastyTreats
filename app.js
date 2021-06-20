const express = require('express');
const app = express();
const fs = require("fs");
const { check, validationResult } = require('express-validator')
const fsR = require('fs-reverse');
const formContent = [];

app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    console.log('In the welcome page')
    res.render('welcome')
})

app.get('/inquiry', (req, res) => {
    console.log('In the get inquiry')
    res.render('form')
})

app.post('/inquiry', [
    check('inputEmail', 'Invalid Email Provided')
        .isEmail()
        .normalizeEmail()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send("Invalid Email provided")
    }
    console.log('In the post inquiry')
    res.render('form')
    formContent.push({
        "name": req.body.name,
        "inputEmail": req.body.inputEmail,
        "message": req.body.message,
        "subscribeCheck": req.body.subscribeCheck
    })
    fs.writeFile("informations.txt", JSON.stringify(formContent), (err, data) => {
        if (err) throw err;
    });
})

app.get('/fetchEnquiries', (req, res) => {
    console.log("In the fetch enquiries page")
    fs.readFile('informations.txt', 'utf8', (err, data) => {
        if (err) throw err;
        res.send(data);
    });
})

app.listen(3000)