const mongoose = require('mongoose');

const qrCodeSchema = new mongoose.Schema({
  url: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const QRCodeModel = mongoose.model('QRCode', qrCodeSchema);
