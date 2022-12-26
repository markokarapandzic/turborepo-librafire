const freightsRouter = require('./modules/freights/freights.router');
const usersRouter = require('./modules/users/users.router');

exports.load = (app) => {
  console.info('Loading routes');
  app.use('/freights/', freightsRouter);
  app.use('/users/', usersRouter);
  console.info('Routes loaded');
};
