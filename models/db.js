'use strict';

const mongoose = require('mongoose');
let url = 'mongodb://';
url += process.env.DB_USER + ':';
url += process.env.DB_PASS + '@';
url += process.env.DB_HOST + ':';
url += process.env.DB_PORT + '/';
url += process.env.DB_NAME;
url += '?authSource=admin';
url += '&replicaSet=' + process.env.REPL_SET;

mongoose.connect(url, { useNewUrlParser: true })
.then(_ => {
	console.log('Connected to db: ', url);
}).catch(err => {
	console.error('Error connecting: ', err);
});

let db = {
	schema: mongoose.Schema,
	model: function(name, schema) {
		return mongoose.model(name, schema);
	}
}

module.exports = db;
