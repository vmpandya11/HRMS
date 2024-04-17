const mongoose = require('mongoose');
const holidaySchema = new mongoose.Schema({
    holidayname: String,
    startdate: String,
    userId: String,
    enddate: String
});
module.exports = mongoose.model("holidays", holidaySchema)