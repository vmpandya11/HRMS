const express = require('express');
const cors = require("cors");
require('./DB/config');
const User = require('./DB/User');
const Employee = require('./DB/Employee');
const Leave = require('./DB/Leave');
const Holiday = require('./DB/Holiday');
const app = express();
app.use(express.json());
app.use(cors());

app.post('/register', async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    resp.send(result);
});

app.post("/login", async (req, resp) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            resp.send(user)
        }
        else {
            resp.send({ result: "No User Found" })
        }
    }
    else {
        resp.send({ result: "No User Found" })
    }

})

app.post("/add-employee", async (req, resp) => {

    let employee = new Employee(req.body);
    let result = await employee.save();
    resp.send(result);
})
app.get("/employees", async (req, resp) => {

    let employees = await Employee.find();
    if (employees.length > 0) {
        resp.send(employees);
    }
    else {
        resp.send({ result: "No Employees Found" })
    }
})

app.delete("/employee/:id", async (req, resp) => {
    const result = await Employee.deleteOne({ _id: req.params.id })
    resp.send(result);
})


app.get("/employee/:id", async (req, resp) => {
    let result = await Employee.findOne({ _id: req.params.id });
    if (result) {
        resp.send(result);
    }
    else {
        resp.send({ result: "No record found" })
    }
})

app.put("/employee/:id", async (req, resp) => {
    let result = await Employee.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        })
    resp.send(result)
})


app.post("/add-leave", async (req, resp) => {

    let leave = new Leave(req.body);
    let result = await leave.save();
    resp.send(result);
})

app.get("/leaves", async (req, resp) => {

    let leaves = await Leave.find();
    if (leaves.length > 0) {
        resp.send(leaves);
    }
    else {
        resp.send({ result: "No Employees Found" })
    }
})

app.delete("/leaves/:id", async (req, resp) => {
    const result = await Leave.deleteOne({ _id: req.params.id })
    resp.send(result);
})

app.put("/leaves/:id", async (req, resp) => {
    let result = await Leave.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        })
    resp.send(result)
})

app.get("/leaves/:id", async (req, resp) => {
    let result = await Leave.findOne({ _id: req.params.id });
    if (result) {
        resp.send(result);
    }
    else {
        resp.send({ result: "No record found" })
    }
})


app.post("/add-holiday", async (req, resp) => {

    let holiday = new Holiday(req.body);
    let result = await holiday.save();
    resp.send(result);
})

app.get("/holidays", async (req, resp) => {

    let holidays = await Holiday.find();
    if (holidays.length > 0) {
        resp.send(holidays);
    }
    else {
        resp.send({ result: "No Employees Found" })
    }
})

app.delete("/holidays/:id", async (req, resp) => {
    const result = await Holiday.deleteOne({ _id: req.params.id })
    resp.send(result);
})

app.put("/holidays/:id", async (req, resp) => {
    let result = await Holiday.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        })
    resp.send(result)
})

app.get("/holidays/:id", async (req, resp) => {
    let result = await Holiday.findOne({ _id: req.params.id });
    if (result) {
        resp.send(result);
    }
    else {
        resp.send({ result: "No record found" })
    }
})




app.listen(4000);