import * as jsonServer from 'json-server';
import { Express } from 'express';

import * as http from 'http';

import { handleAuthentication } from './auth';
import { handleAuthorization } from './authz';

const server: Express = jsonServer.create();

const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/user/login', handleAuthentication);
server.post('/score', function (req, resp) {
  handleAuthorization(req, resp);
  resp.json({ raked: true, position: 2 });
});

server.get('/score/:game', function (req, res) {
  const game = req.param('game');
  res.jsonp(router.db.get(game).value());
});

const port = 5000;
http.createServer(server).listen(port, () => {
  console.log(`JSON Server is running on http://localhost:${port}`);
});
