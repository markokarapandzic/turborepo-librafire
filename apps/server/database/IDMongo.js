const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

const config = require('../config');

const DB_URL = config.NODE_DB_URL;
const DB_NAME = config.NODE_DB_NAME || 'test_db';
const DB_POOL_SIZE = config.NODE_DB_POOL_SIZE || 5;

let connection;
let db;

const close = async () => {
  try {
    if (connection) {
      await connection.close();
    }
  } catch (e) {
    console.error(`IDMongo Error in closing mongodb connections: ${e}`);
  }
};

const connect = async () => {
  try {
    if (!connection) {
      console.info(`IDMongo Connecting to : ${DB_URL}`);
      connection = await MongoClient.connect(DB_URL, {
        maxPoolSize: Number(DB_POOL_SIZE),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.info(`IDMongo Connected to : ${DB_URL}`);
    }
    if (!db) {
      console.info('info', `IDMongo setting the database : ${DB_NAME}`);
      db = await connection.db(DB_NAME);
    }
  } catch (e) {
    console.error('error', `IDMongo Error connecting to mongodb: ${e}`);
    throw e;
  }

  await connection.on('close', () => {
    console.info('info', 'IDMongo Connection close');
    connection = null;
    db = null;
  });

  return db;
};

const collection = async (name) => {
  if (!db || !connection) {
    await connect();
  }
  return db.collection(name);
};

const isObjectId = (id) => {
  let result = true;
  try {
    new ObjectId(id);
  } catch (err) {
    result = false;
  }
  return result;
};

module.exports = {
  connect,
  close,
  collection,
  ObjectId,
  isObjectId,
};
