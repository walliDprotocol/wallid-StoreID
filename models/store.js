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
		return db.query("INSERT INTO storeid (idt, idt_name, wallet_address, certificate, sod, wallet_signature) VALUES (?, ?, ?, ?, ?, ?)",[data.idt, data.idtName, data.verifyID.walletAddress, data.verifyID.certificate, data.verifyID.sod, data.verifyID.walletSignature], callback);
	},
	updateInfo: function(data, callback) {
		return db.query("UPDATE storeid SET idt_name = ?, certificate = ?, sod = ?, wallet_signature = ? WHERE idt = ? AND wallet_address = ?", [data.idtName, data.verifyID.certificate, data.verifyID.sod, data.verifyID.walletSignature, data.idt, data.verifyID.walletAddress], callback);
	}
};

module.exports = storeId;
