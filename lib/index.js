const Hapi = require('hapi');

const h2o2 = require('h2o2');
const inert = require('inert');
const catbox = require('catbox-memory');

module.exports = function startServer(config, statusRoute = true) {
  const serverConfig = config.server || {};
  const routesConfig = config.routes || [];

  // Create a server with a host and port
  const server = new Hapi.Server({
    cache: catbox,
  });

  server.connection(serverConfig);

  server.register([h2o2, inert], err => {
    if (err) {
      console.log('🚨  Error while registering plugins');
      console.log(err);
      return;
    }

    if (statusRoute) {
      // Add the route
      server.route({
        path: '/status',
        method: 'GET',
        handler(request, reply) {
          reply('ok');
        },
      });
    }

    routesConfig.forEach(route => {
      server.route(route);
    });

    // Start the server
    server.start(startErr => {
      /* eslint no-console:0 */
      if (startErr) {
        throw startErr;
      }

      console.log(`🌎  Server running at: ${server.info.uri}`);
    });
  });
};
