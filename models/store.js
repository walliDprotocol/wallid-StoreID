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
    lowercase: true
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
  getInfoById: function (criteria, callback) {
    return storeidModel.find(criteria, { '_id': false, '__v': false }, callback);
  },
  addOrUpdateInfo: function (criteria, data, callback) {
    return storeidModel.findOneAndUpdate(criteria, { $set: data }, { 'upsert': true, 'new': true, 'setDefaultsOnInsert': true }, callback );
  }
}

module.exports = store;
