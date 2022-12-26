/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Ajv = require('ajv');
const mainDBHandler = require('../../database/main.handler');
const config = require('../../config');
const userSchema = require('../../models/user');

const ajv = new Ajv();
const tokenList = [];

function cryptPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

function validatePassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

function getAccessToken(id, email) {
  const token = jwt.sign({ user_id: id, email }, config.TOKEN_KEY, {
    expiresIn: '2h',
  });
  return token;
}

exports.register = async (req, res) => {
  try {
    const { body } = req;

    let user = await mainDBHandler.findOne('users', {
      email: body.email,
    });

    if (!user) {
      if (!ajv.validate(userSchema, body)) {
        res.status(400).json('Bad Params Passed');
        return;
      }

      body.password = cryptPassword(body.password);

      await mainDBHandler.insertOne('users', body);

      user = await mainDBHandler.findOne('users', {
        email: body.email,
      });
    }

    const accessToken = getAccessToken(user._id, user.email);
    user.accessToken = accessToken;

    res.json(user);
  } catch (err) {
    console.error('Error Registering User.', err);
    res.status(500).send('Error Registering User');
  }
};

exports.login = async (req, res) => {
  try {
    const { body } = req;
    const { email, password } = body;

    if (!ajv.validate(userSchema, body)) {
      res.status(400).json('Bad Params Passed');
      return;
    }

    const user = await mainDBHandler.findOne('users', {
      email,
    });

    if (!user) {
      res.json({ msg: 'No user found' });
    } else if (validatePassword(password, user.password)) {
      delete user.password;

      const accessToken = getAccessToken(user._id, email);
      user.accessToken = accessToken;

      res.json(user);
    } else {
      res.json({ msg: 'Passwords do not match' });
    }
  } catch (err) {
    console.error('Error Login In User.', err);
  }
};
