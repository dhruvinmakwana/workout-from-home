const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
      return res.sendStatus(403);
    }
    try {
      const data = jwt.verify(token, process.env.SECRET_KEY);
      req.username = data.username;
      req.email = data.email;
      return next();
    } catch {
      return res.sendStatus(403);
    }
};

const verifyOrRedirect = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.redirect('login');
    }
    try {
      const data = jwt.verify(token, process.env.SECRET_KEY);
      req.username = data.username;
      req.email = data.email;
      return next();
    } catch {
      return res.redirect('login');
    }
};

module.exports = {
    verifyToken,
    verifyOrRedirect
};