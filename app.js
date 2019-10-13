const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const flash = require('express-flash');
const session = require('express-session');
const app = express();

app.use(cookieParser('secret'))
app.use(session({
    cookie: {maxAge: 6000000},
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(flash());
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
app.use( express.static( "clinicas" ) );
app.use(express.static(path.join(__dirname, 'clinicas')));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/', indexRouter);

module.exports = app;