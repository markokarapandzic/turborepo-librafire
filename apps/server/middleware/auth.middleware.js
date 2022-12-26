/* eslint-disable operator-linebreak */
const jwt = require('jsonwebtoken');
const config = require('../config');

function verifyToken(req, res, next) {
  const token =
    req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(403).json('Access Forbidden');
  }

  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    res.status(401).send('Invalid Token');
  }

  return next();
}

module.exports = verifyToken;
