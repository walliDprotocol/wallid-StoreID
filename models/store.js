'use strict';

const conn = require('./db.js');
const storeidSchema = new conn.schema({
  idt: {
    type: String,
    required: true,
  },
  idtName: {
    type: String,
    required: true
  },
  wa: {
    type: String,
    required: true,
  },
  verifyID: {
    type: String,
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  }
});

storeidSchema.index({
  idt: 1,
  wa: 1
},
{
  unique: true
});

const storeidModel = conn.model('storeid', storeidSchema);

let store = {
  getAllInfo: function (callback) {
    return storeidModel.find({}, { '_id': false, '__v': false }, callback);
  },
  getInfoById: function (idt, wa, callback) {
    return storeidModel.find({ 'idt': idt, 'wa': wa }, { '_id': false, '__v': false }, callback);
  },
  addOrUpdateInfo: function (data, callback) {
    let wa = data.wa.toLowerCase();
    // Add new variable for WA in lowercase and replace data.wa for that variable
    return storeidModel.findOneAndUpdate({ 'idt': data.idt, 'wa': wa }, { 'idt': data.idt, 'idtName': data.idtName, 'wa': wa, 'verifyID': data.verifyID }, { 'upsert': true, 'new': true, 'setDefaultsOnInsert': true }, callback );
  }
}

module.exports = store;
