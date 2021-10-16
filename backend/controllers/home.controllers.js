const User = require('../models/user')
const register = (req, res, next) => {
    return res.render("register")
}

const login = (req, res, next) => {
    return res.render("login")
}


const dashboard = (req, res, next) => {
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
            res.redirect(301,"dashboard");
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