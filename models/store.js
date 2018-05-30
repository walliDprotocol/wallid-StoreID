'use strict';

var db = require("./db.js");
var storeId = {
	getAllInfo: function(callback) {
		return db.query("SELECT * FROM storeid", callback);
	},
	checkIfExist: function(wallet_address, id_type, callback) {
		return db.query("SELECT creation_date FROM storeid WHERE wallet_address = ? AND id_type = ?",[wallet_address, id_type], callback);
	},
	addInfo: function(importId, callback) {
		return db.query("INSERT INTO storeid (wallet_address, id_type, verifyid) VALUES (?, ?, ?)",[importId.wallet_address, importId.id_type, importId.verifyid], callback);
	},
	updateInfo: function(importId, callback) {
		return db.query("UPDATE storeid SET verifyid = ? WHERE wallet_address = ? AND id_type = ?",[importId.verifyid, importId.wallet_address, importId.id_type], callback);
	}
};

module.exports = storeId;
