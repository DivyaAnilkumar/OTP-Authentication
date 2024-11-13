const mongoose = require('mongoose');

const otpSchema = mongoose.Schema({
    email: String,
    otp : String,
    expiresAt: Date
});

const otpData = mongoose.model('otp',otpSchema);
module.exports = otpData;