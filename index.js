var express = require('express');
const path = require('path')
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const User = require('./model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

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

app.post('/login', async (req, res) =>{

    const { username, password } = req.body
	const user = await User.findOne({ username }).lean()

    if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

    if(await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({
            id: user._id, 
            username:user.username
        },JWT_SECRET)
        console.log("success")
        return res.json({status:'ok', data: token})
    }
    return res.json({status:'eror', error: 'Invalivvd username/password'})
})

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

app.get("/login", function (req, res) {
    res.sendFile(__dirname + "/public/login.html");
    });

app.get("/register", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
    });

    app.use('/', express.static(path.join(__dirname, 'public')))
    app.listen(3000, () => {
        console.log('Server up at 3000')
    })

