const createError = require('http-errors');
const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const live2dRouter = require('./routes/live2d')
const db = require('./utils/mongDB')

const app = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flag: 'a' }); //创建一个写文件流，并且保存在当前文件夹的access.log文件中

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev')); // 打印到控制台
// app.use(logger('tiny', {stream : accessLog}));      //打印到log日志
app.use(logger('combined', { stream: accessLogStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', (req, res, next) => {
    next()
});
app.use('/my', indexRouter);
app.use('/users', usersRouter);
app.use('/live2d', live2dRouter);

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
