var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('55b8cdca54fd44f48ee7025a0474d07e');
var app = express();

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let news = [];

app.use('/news',(req, res)=>{
  if(news.length !== 0) return res.send(news);
  
  newsapi.v2.topHeadlines({
    country: 'ca',
    category: 'technology'
  }).then(response => {
    news = response;
    return res.send(news);
  });
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
