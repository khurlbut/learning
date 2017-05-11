#!/usr/bin/env node --harmony
'use strict';
const
  express = require('express'),
  redisClient = require('redis').createClient(),
  RedisStore = require('connect-redis')(express),
  app = express();

// var
//   express = require('express'),
//   redis = require('redis'),
//   session = require('express-session'),
//   redisClient = redis.createClient(),
//   RedisStore = require('connect-redis')(session),
//   app = express();

app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.session({
  secret: 'unguessable',
  store: new RedisStore({
    client: redisClient
  })
}));

app.get('/api/:name', function(req, res) {
  res.json(200, { "hello": req.params.name });
});

app.listen(3000, function(){
  console.log("ready captain.");
});


// var express = require('express');
// var redis   = require("redis");
// var session = require('express-session');
// var redisStore = require('connect-redis')(session);
// var bodyParser = require('body-parser');
// var client  = redis.createClient();
// var app = express();

// app.set('views', __dirname + '/views');
// app.engine('html', require('ejs').renderFile);

// app.use(session({
//     secret: 'ssshhhhh',
//     // create new redis store.
//     store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl :  260}),
//     saveUninitialized: false,
//     resave: false
// }));
