const mongoose = require('mongoose');
const companySchema = new mongoose.Schema({
    companyname: String,
    companylocation: String,
    companylogo: String,
    gstNo: String,
    country: String,
    states: String,
    cities: String,
    username: String,
    password: String,
    email: String,
    ownername: String,
    ownermail: String,
    ownerNo: String,
    userId: String,
});
module.exports = mongoose.model("companys", companySchema)