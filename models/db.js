'use strict';

var mysql = require('mysql');
var config = require('config');
var env = config.get("envConfig").environment;
var dbInfo = require("./config.json");

var conn = mysql.createConnection({
	host: dbInfo[env].host,
	user: dbInfo[env].user,
	password: dbInfo[env].pass,
	database: dbInfo[env].database
});

conn.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
});

module.exports = conn;