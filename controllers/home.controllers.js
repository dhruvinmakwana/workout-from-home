const User = require('../models/user')
const jwt = require('jsonwebtoken')
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
        if (password == user.password) {
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

module.exports = {
    register,
    login,
    dashboard,
    login_Post
  };