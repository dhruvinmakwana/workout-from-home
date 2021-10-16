const register = (req, res, next) => {
    return res.render("register")
}

const login = (req, res, next) => {
    return res.render("login")
}


const dashboard = (req, res, next) => {
    return res.render("dashboard")
}
module.exports = {
    register,
    login,
      dashboard,
  };