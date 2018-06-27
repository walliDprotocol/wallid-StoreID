'use strict';

var mysql = require('mysql'),
		env = process.env.ENV || 'development',
		db = (env === 'production') ? {"host": process.env.DB_HOST, "user": process.env.DB_USER, "pass": process.env.DB_PASS, "database": process.env.DB_NAME} : require("./config.json")[env];
		console.log("db: ", db)

var conn = mysql.createPool({
	connectionLimit: 10,
	host: db.host,
	user: db.user,
	password: db.pass,
	database: db.database
});

module.exports = conn;
