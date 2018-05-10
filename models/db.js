'use strict';

var mysql = require('mysql'),
		env = require('config').get("environment"),
		dbInfo = require("./config.json");

var conn = mysql.createPool({
	connectionLimit: 10,
	host: dbInfo[env].host,
	user: dbInfo[env].user,
	password: dbInfo[env].pass,
	database: dbInfo[env].database
});

module.exports = conn;
