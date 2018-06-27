'use strict';

var mysql = require('mysql'),
		// env = require('config').get("environment"),
		env = process.env.ENV || 'development',
		db = process.env.DB_HOST || require("./config.json").env;

var conn = mysql.createPool({
	connectionLimit: 10,
	host: db.host,
	user: db.user,
	password: db.pass,
	database: db.database
});

module.exports = conn;
