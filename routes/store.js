'use strict';

var express = require('express'),
		router = express.Router(),
		conn = require('./../models/store');

router.get('/', function(req, res, next) {
		conn.getAllInfo(function(err, result) {
			if(err) {
				res.status(500).send(JSON.stringify({"status": 500, "data": null, "message": err}));
			} else {
				res.status(200).send(JSON.stringify({"status": 200, "data": result, "message": null}));
			}
		});
});

router.post('/', function(req, res, next) {
	let wallet_address = ( (req.body.wallet_address != null) ? req.body.wallet_address : null );

	conn.checkIfExist(wallet_address, function(err, result) {
		if(result != '') {
			conn.updateInfo(req.body, function(err, result) {
				if(err) {
					res.status(500).send(JSON.stringify({"status": 500, "data": null, "message": err}));
				} else {
					res.send(JSON.stringify({"status": 200, "data": result, "message": "Record updated"}));
				}
			});
		} else {
			conn.addInfo(req.body, function(err, result) {
				if(err) {
					res.status(500).send(JSON.stringify({"status": 500, "data": null, "message": err}));
				} else {
					res.send(JSON.stringify({"status": 200, "data": result, "message": "Record created"}));
				}
			});
		}
	});
});

module.exports = router;
