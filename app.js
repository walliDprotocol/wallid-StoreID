'use strict';

var express = require('express'),
		path = require('path'),
		logger = require('morgan'),
		cookieParser = require('cookie-parser'),
		bodyParser = require('body-parser'),
		http = require('http'),
		https = require('https'),
		fs = require('fs'),
		privateKey = fs.readFileSync('/ssl/tls.key', 'utf8'),
		certificate = fs.readFileSync('/ssl/tls.crt', 'utf8'),
		credentials = {key: privateKey, cert: certificate},
		index = require('./routes/index'),
		storeId = require('./routes/store'),
		app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// enable cors
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
	res.header("Access-Control-Allow-Credentials", "true");

	if ('OPTIONS' === req.method) {
		//respond with 200
		res.status(200);
		res.json();
	} else {
		next();
	}
});

app.use('/', index);
app.use('/api/v1/data', storeId);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: err
	});
});

module.exports = app;
var server = https.createServer(credentials, app);
server.listen(3000);
