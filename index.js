var express = require('express');
const path = require('path')
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const User = require('./model/user')
const bcrypt = require('bcryptjs')

mongoose.connect('mongodb://localhost:27017/login',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));



var db = mongoose.connection;

db.on('error', () => console.log("error in db"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/api/register",async (req, res) => {
    console.log(req.body)
    const {username, password: plainTextPassword, email, dob} = req.body
    const password = await bcrypt.hash(plainTextPassword,10)
    res.json({status: 'ok'});

    try {
        const response = await User.create({
            username,
            password,
            email,
            dob
        })
        console.log("User created successfully: ",response)
    } catch (error) {
        if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
    }
})


app.get('/', (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect("registration.html");
}).listen(3000);

