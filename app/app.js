import express from 'express';
import exphbs from 'express-handlebars';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

//DB Code
import mongo from 'mongodb';
import monk from 'monk';
let db = monk('localhost:27017/isomorphic-poc');

import api from './routes/api';
import site from './routes/site';

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'main', layoutsDir:path.join(__dirname,'views/layouts')}));
app.set('view engine', 'handlebars');
app.set('view cache', false);

// uncomment after placing your favicon in /public/img
//app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/api', api);
app.use('/', site);

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;