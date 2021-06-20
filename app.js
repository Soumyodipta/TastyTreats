const { render } = require('ejs');
const express = require('express')
const app = express()
const fs = require("fs");
const formContent = [];
const parsr = express.urlencoded({ extended: false })

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    console.log('In the welcome page')
    res.render('welcome')
})

app.get('/inquiry', (req, res) => {
    console.log('In the get inquiry')
    res.render('form')
})

app.post('/inquiry', parsr, (req, res) => {
    console.log('In the post inquiry')
    res.render('form')
    formContent.push({
        "name": req.body.name,
        "inputEmail": req.body.inputEmail,
        "message": req.body.message,
        "subscribeCheck": req.body.subscribeCheck
    })
    fs.writeFileSync("message1.txt", JSON.stringify(formContent), null, 2)
})

app.get('/fetchEnquiries', (req, res) => {
    console.log("In the fetch enquiries page")
    fs.readFile('message1.txt', 'utf8', (err, data) => {
        if (err) throw err;
        res.send(data);
    });
})

app.listen(3000)