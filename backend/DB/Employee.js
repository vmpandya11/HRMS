const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
    name: String,
    address: String,
    country: String,
    state: String,
    city: String,
    contact: String,
    gender: String,
    companyName: String,
    role: String,
    employeeId: String,
    salary: String,
    email: String,
    password: String,
    experience: String
});
module.exports = mongoose.model("employees", employeeSchema)