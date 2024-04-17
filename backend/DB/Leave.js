const mongoose = require('mongoose');
const leaveSchema = new mongoose.Schema({
    leavetype: String,
    leavealias: String,
    userId: String,
    noofleave: String
});
module.exports = mongoose.model("leaves", leaveSchema)