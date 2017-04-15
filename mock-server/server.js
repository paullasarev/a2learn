const jsonServer = require('json-server');
// const server = jsonServer.create();
const middleware = jsonServer.defaults();
const init = require('./services');
const walk = require('./utils/walk');
const cors = require('./utils/cors');

function run(server) {
  walk(__dirname + '/services', function (err, files) {
    if (err) {
      console.log(err);
    } else {
      let ang = init(files);

      server.use(cors);

      server.use(jsonServer.bodyParser);
      server.use(middleware);

      server.use('/api', ang.routes);
      server.use('/api', ang.middleware);
      server.use('/api', ang.db);
    }
  });
}

module.exports = {run};
