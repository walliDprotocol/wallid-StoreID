'use strict';

var db = require("./db.js");
var storeId = {
	getAllInfo: function(callback) {
		return db.query("SELECT * FROM storeid", callback);
	},
	getInfoById: function(idt, wallet_address, callback) {
		return db.query("SELECT * FROM storeid WHERE idt = ? AND wallet_address = ?", [idt, wallet_address], callback);
	},
	checkIfExist: function(idt, wallet_address, callback) {
		return db.query("SELECT creation_date FROM storeid WHERE idt = ? AND wallet_address = ?", [idt, wallet_address], callback);
	},
	addInfo: function(data, callback) {
		return db.query("INSERT INTO storeid (idt, idt_name, wallet_address, verify_id) VALUES (?, ?, ?, ?)", [data.idt, data.idtName, data.wa, data.verifyID], callback);
	},
	updateInfo: function(data, callback) {
		return db.query("UPDATE storeid SET idt_name = ?, verify_id = ? WHERE idt = ? AND wallet_address = ?", [data.idtName, data.verifyID, data.idt, data.wa], callback);
	}
};

module.exports = storeId;
