var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var live2dRouter = require('./routes/live2d');
var aWordRouter = require('./routes/aWord');
var db = require('./utils/mongDB')

var app = express();

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flag: 'a' }); //创建一个写文件流，并且保存在当前文件夹的access.log文件中

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
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept,X-Requested-With,token');
    res.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    //res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        return res.status(200).send('202')
    }
    next();
});
app.use('/', (req, res, next) => {
    next()
});
app.use('/my', indexRouter);
app.use('/users', usersRouter);
app.use('/live2d', live2dRouter);
app.use('/aWord', aWordRouter);

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
