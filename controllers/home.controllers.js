const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')



const register = (req, res, next) => {
    return res.render("register")
}

const login = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) {
        console.log(1);
        return res.render("login")
    }
    try {
      const data = jwt.verify(token, process.env.SECRET_KEY);
      console.log(data);
      console.log(2);
      return res.redirect(301,"dashboard");
    } catch {
        console.log(3);
        return res.render("login")
    }
}


const dashboard = (req, res) => {
    return res.render("dashboard")
}

const login_Post = async (req, res, next) => {
    console.log(req.body);
    const username = req.body.uname;
        password = req.body.psw;
        user = await User.findOne({ username })
        if (!user) {
            return res.render('login',{
                message: 'Invalid username or password',
                messageClass: 'alert-danger'
            })
        }
        if (await bcrypt.compare(password, user.password)) {
            console.log("success")
            const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY);
            return res
              .cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
              }).redirect(301,"dashboard");
        }else{
            
            return res.render('login',{
                message: 'Invalid username or password',
                messageClass: 'alert-danger'
            })
        }
        
}

const register_Post = async (req, res, next) => {
    console.log(req.body);
    const username = req.body.name, 
        pwd = req.body.psw,
        email = req.body.email,
        dob = req.body.dob
        password = await bcrypt.hash(pwd, 10)
    try {
        const user = await User.create({
            username,
            password,
            email,
            dob
        })
        console.log("User created successfully: ",user)
        const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY);
            return res
              .cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
              }).redirect(301,"dashboard");
    } catch (error) {
        if (error.code === 11000) {
			// duplicate key
            return res.render('register',{
                message: 'Username already in use',
                messageClass: 'alert-danger'
            })
		}
		throw error
    }
    // res.redirect(301,"dashboard");
}


module.exports = {
    register,
    login,
    dashboard,
    login_Post,
    register_Post
  };