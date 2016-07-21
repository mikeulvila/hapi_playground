'use strict';

const Hapi = require('hapi');
const Good = require('good');

// create server host and port
const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: 3000
});

// add route
server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => reply('Hello World!')
});

server.route({
  method: 'GET',
  path: '/{name}',
  handler: (request, reply) => {
    reply(`Hello ${encodeURIComponent(request.params.name)}!`)
  }
});

// register inert plug-in
server.register(require('inert'), (err) => {
  if (err) throw err;

  server.route({
    method: 'GET',
    path: '/hello',
    handler: (request, reply) => {
      reply.file('./public/hello.html');
    }
  });
});

// register good plugin
server.register({
  register: Good,
  options: {
    reporters: {
      console: [
      {
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          response: '*',
          log: '*'
        }]
      },
      {
        module: 'good-console'
      }, 'stdout']
    }
  }
}, (err) => {
  if (err) throw err;

  // start server
  server.start(err => {
    if (err) throw err;
    console.log('Server running at: ', server.info.uri);
  });
});



