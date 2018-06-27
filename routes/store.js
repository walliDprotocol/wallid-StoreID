'use strict';

var express = require('express'),
		router = express.Router(),
		conn = require('./../models/store');

router.get('/', function(req, res, next) {
	let idt = (req.query.idt != null && req.query.idt != undefined) ? req.query.idt : null,
			wallet_address = (req.query.walletAddress != null && req.query.walletAddress != undefined) ? req.query.walletAddress : null;

	if (idt != null && wallet_address != null) {
		conn.getInfoById(idt, wallet_address, function(err, result) {
			if(err) {
				res.status(500).send(JSON.stringify({"status": 500, "data": null, "message": err}));
			} else {
				res.status(200).send(JSON.stringify({"status": 200, "data": result, "message": null}));
			}
		});
	} else {
		conn.getAllInfo(function(err, result) {
			if(err) {
				res.status(500).send(JSON.stringify({"status": 500, "data": null, "message": err}));
			} else {
				res.status(200).send(JSON.stringify({"status": 200, "data": result, "message": null}));
			}
		});
	}
});

router.post('/', function(req, res, next) {
	let request = req.body.dataID.data,
			wallet_address = ( (request.verifyID.walletAddress != null && request.verifyID.walletAddress != undefined) ? request.verifyID.walletAddress : null ),
			idt = ( (request.idt != null && request.idt != undefined) ? request.idt : null );

	conn.checkIfExist(idt, wallet_address, function(err, result) {
		if(result != '') {
			conn.updateInfo(request, function(err, result) {
				if(err) {
					res.status(500).send(JSON.stringify({"status": 500, "data": null, "message": err}));
				} else {
					res.status(200).send(JSON.stringify({"status": 200, "data": null, "message": "Record updated"}));
				}
			});
		} else {
			conn.addInfo(request, function(err, result) {
				if(err) {
					res.status(500).send(JSON.stringify({"status": 500, "data": null, "message": err}));
				} else {
					res.status(200).send(JSON.stringify({"status": 200, "data": null, "message": "Record created"}));
				}
			});
		}
	});
});

module.exports = router;
