const express = require('express');
const path = require('path');
const cors = require('cors');
const http = require('http');
const router = require('./router');
const config = require('./config');
const IDMongo = require('./database/IDMongo');

global.appRoot = path.resolve(__dirname);
const app = express();

const port = config.NODE_PORT || 3001;

app.use(cors()).use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, Content-Type, X-Auth-Token',
  );
  next();
});

app.use(express.json({ limit: '10mb' }));

const init = async () => {
  try {
    await IDMongo.connect();
    await router.load(app);
  } catch (err) {
    console.error('Main Error Initializing Services.', err);
  }
};

app.server = http.createServer(app);

app.server.listen(port, (err) => {
  if (err) {
    console.error('Error starting server.', err);
  } else {
    console.info(
      `App started on port ${port} with ${config.NODE_ENV} settings.`,
    );
    init(app);
  }
});
