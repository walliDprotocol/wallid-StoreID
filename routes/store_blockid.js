'use strict';

var express = require('express');
var router = express.Router();
var conn = require('./../models/store_blockid');

router.get('/:id?', function(req, res, next) {
	if(req.params.id) {
		conn.getInfoById(req.params.id, function(err, result) {
			if(err) {
				res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
			} else {
				res.send(JSON.stringify({"status": 200, "error": null, "response": result}));
			}
		});
	} else {
		conn.getAllInfo(function(err, result) {
			if(err) {
				res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
			} else {
				res.send(JSON.stringify({"status": 200, "error": null, "response": result}));
			}
		});
	}
});

router.post('/', function(req, res, next) {
	conn.addInfo(req.body, function(err, result) {
		if(err) {
			res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": result.insertId}));
		}
	});
});

module.exports = router;