'use strict';

const express = require('express');
const router = express.Router();
const conn = require('./../models/store');

router.get('/', function(req, res, next) {
	let idt = (req.query.idt != null && req.query.idt != undefined && req.query.id != '') ? req.query.idt : null;
	let	wa = (req.query.wa != null && req.query.wa != undefined && req.query.wa != '') ? req.query.wa : null;

	if (idt != null && wa != null) {
		conn.getInfoById(idt, wa, function(err, result) {
			if (err) {
				res.status(500).send({"data": null, "message": err});

			} else {
				if (result.length > 0) {
					res.status(200).send({"data": result, "message": null});

				} else {
					res.status(404).send({"data": null, "message": "No records"});
				}
			}
		});

	} else {
		conn.getAllInfo(function(err, result) {
			if (err) {
				res.status(500).send({"data": null, "message": err});

			} else {
				if (result.length > 0) {
					res.status(200).send({"data": result, "message": null});

				} else {
					res.status(404).send({"data": null, "message": "No records"});
				}
			}
		});
	}
});

router.post('/', function(req, res, next) {
	let request = req.body.dataID.data;

 	conn.addOrUpdateInfo(request, function(err, result) {
		if (err) {
			res.status(500).send({"data": null, "message": err});

		} else {
			res.status(200).send({"data": null, "message": "Data stored"});
		}
	});
});

module.exports = router;
