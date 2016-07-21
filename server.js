'use strict';

const Hapi = require('hapi');

// create server host and port
const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: 3000
});

// add route
server.route({
  method: 'GET',
  path: '/hello',
  handler: (request, reply) => reply('Hello World!')
});

server.route({
  method: 'GET',
  path: '/{name}',
  handler: (request, reply) => {
    reply(`Hello ${encodeURIComponent(request.params.name)}!`)
  }
})
// start server
server.start(err => {
  if (err) throw err;
  console.log('Server running at: ', server.info.uri);
});

