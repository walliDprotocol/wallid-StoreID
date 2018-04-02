'use strict';

var db = require("./db.js");
var storeBlockId = {
	getAllInfo:function(callback) {
		return db.query("SELECT * FROM user_information", callback);
	},
	getInfoById:function(id, callback) {
		return db.query("SELECT * FROM user_information WHERE id=?",[id], callback);
	},
	addInfo:function(importId, callback) {
		return db.query("INSERT INTO user_information (wallet_signature, sod, certificate, user_wallet) VALUES (?, ?, ?, ?)",[importId.wallet_signature, importId.sod, importId.certificate, importId.user_wallet], callback);
	}
};

module.exports = storeBlockId;