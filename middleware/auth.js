/**
 * @file auth.js is the main file responsible for authentication and authorization of incoming requests .
 * 
 * @author Dhruvin Hasmukh Makwana
 */
/**
 * Authentication middleware module.
 * @module middleware
 */

const jwt = require("jsonwebtoken");

/**
 * perform verification of the token stored in the cookie to validate the request before proceeding further
 */
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
/**
 * perform verification of the token and based on the result redirect the request to the login screen or the next webpage in line
 */
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