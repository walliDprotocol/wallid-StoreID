'use strict';

var db = require("./db.js");
var storeId = {
	getAllInfo: function(callback) {
		return db.query("SELECT * FROM user_information", callback);
	},
	checkIfExist: function(wallet_address, callback) {
		return db.query("SELECT creation_date FROM user_information WHERE wallet_address = ?",[wallet_address], callback);
	},
	addInfo: function(importId, callback) {
		return db.query("INSERT INTO user_information (wallet_signature, sod, certificate, wallet_address) VALUES (?, ?, ?, ?)",[importId.wallet_signature, importId.sod, importId.certificate, importId.wallet_address], callback);
	},
	updateInfo: function(importId, callback) {
		return db.query("UPDATE user_information SET wallet_signature = ?, sod = ?, certificate = ? WHERE wallet_address = ?",[importId.wallet_signature, importId.sod, importId.certificate, importId.wallet_address], callback);
	}
};

module.exports = storeId;
