'use strict';

var mysql = require('mysql'),
		db = require("./config.json");

var conn = mysql.createPool({
	connectionLimit: 10,
	host: process.env[db.host],
	user: process.env[db.user],
	password: process.env[db.pass],
	database: process.env[db.database]
});

module.exports = conn;
