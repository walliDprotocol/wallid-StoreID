'use strict';

const express = require('express');
const router = express.Router();
const conn = require('./../models/store');

router.get('/', function(req, res, next) {
	let criteria = {
		idt: (req.query.idt !== null && req.query.idt !== undefined && req.query.id !== '') ? req.query.idt : null,
		wa: (req.query.wa !== null && req.query.wa !== undefined && req.query.wa !== '') ? req.query.wa.toLowerCase() : null
	}

	if (criteria.idt !== null && criteria.wa !== null) {

		conn.getInfoById(criteria, function(err, result) {
			if (err) return res.status(500).send({"data": null, "message": err});

			if (result.length <= 0) return res.status(404).send({"data": null, "message": "No records"});

			res.status(200).send({"data": result, "message": null});
		});

	} else {
		conn.getAllInfo(function(err, result) {
			if (err) return res.status(500).send({"data": null, "message": err});

			if (result.length <= 0) return res.status(404).send({"data": null, "message": "No records"});

			res.status(200).send({"data": result, "message": null});
		});
	}
});

router.post('/', function(req, res, next) {
	let request = req.body.dataID.data;
	let criteria = {
		idt: request.idt,
		wa: request.wa
	};

 	conn.addOrUpdateInfo(criteria, request, function(err, result) {
		if (err) return res.status(500).send({"data": null, "message": err});

		res.status(200).send({"data": null, "message": "Data stored"});
	});
});

module.exports = router;
