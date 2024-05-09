import React, { useState } from 'react'
import Home from '../Home/Home';
import SalaryList from './SalaryList'

export default function Salary() {
    const [employeeName, setEmployeeName] = useState("");
    const [salaryAmount, setSalaryAmount] = useState("");
    const [salaryType, setSalaryType] = useState("");
    const [payFrequency, setPayFrequency] = useState("");
    const [bankAccountTitle, setBankAccountTitle] = useState("");
    const [bankAccountNumber, setBankAccountNumber] = useState("");
    const [bankName, setBankName] = useState("");
    const [routingNumber, setRoutingNumber] = useState("");
    const [taxInformation, setTaxInformation] = useState("");
    const [overtimeHours, setOvertimeHours] = useState("");
    const [bonuses, setBonuses] = useState("");
    const [leaveBalance, setLeaveBalance] = useState("");
    const [payrollPeriod, setPayrollPeriod] = useState("");
    const [paymentData, setPaymentData] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [status, setStatus] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState("");

    const closeModal = () => {
        setShowModal(false);
        // resetForm();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if (!validateInputs()) return;
        closeModal();
        // console.log({
        //     leavetype,
        //     leavealias,
        //     noofleave
        // });
        const employeeId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:4000/add-leave", {
            method: "POST",
            body: JSON.stringify({
                // leavetype,
                // leavealias,
                // noofleave, employeeId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        result = await result.json();
        console.warn(result);
        window.location.reload();
    };

    return (

        <div>
            <Home />
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Salary Type</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item" style={{ padding: '10px' }}>
                                        <button type="button" className="btn btn-primary 
                                        " onClick={() => setShowModal(true)}>
                                            Add Salary
                                        </button>
                                    </li>
                                </ol>
                            </div>
                            <div className="col-10 center" >
                                <SalaryList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            {showModal && (
                <div className="modal" style={{ display: 'block', }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content" style={{ marginLeft: "30px" }}>
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title ">Salary Details</h5>
                                <button type="button" className="close" onClick={closeModal}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                <div className="row">
                                    <div className="col">
                                        <form>
                                            <div className="form-group">
                                                <label>Employee Name:</label>
                                                <input type="text" className="form-control" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} required />
                                            </div>

                                            <div className="form-group">
                                                <label>Salary Amount:</label>
                                                <input type="text" className="form-control" value={salaryAmount} onChange={(e) => setSalaryAmount(e.target.value)} required />
                                            </div>

                                            <div className="form-group">
                                                <label>Salary Type:</label>
                                                <input type="text" className="form-control" value={salaryType} onChange={(e) => setSalaryType(e.target.value)} required />
                                            </div>

                                            <div className="form-group">
                                                <label>Pay Frequency:</label>
                                                <input type="text" className="form-control" value={payFrequency} onChange={(e) => setPayFrequency(e.target.value)} required />
                                            </div>

                                            <div className="form-group">
                                                <label>Bank Account Title:</label>
                                                <input type="text" className="form-control" value={bankAccountTitle} onChange={(e) => setBankAccountTitle(e.target.value)} required />
                                            </div>

                                            <div className="form-group">
                                                <label>Bank Account Number:</label>
                                                <input type="text" className="form-control" value={bankAccountNumber} onChange={(e) => setBankAccountNumber(e.target.value)} required />
                                            </div>

                                            <div className="form-group">
                                                <label>Bank Name:</label>
                                                <input type="text" className="form-control" value={bankName} onChange={(e) => setBankName(e.target.value)} required />
                                            </div>

                                            <div className="form-group">
                                                <label>Routing Number:</label>
                                                <input type="text" className="form-control" value={routingNumber} onChange={(e) => setRoutingNumber(e.target.value)} required />
                                            </div>

                                            <div className="form-group">
                                                <label>Tax Information:</label>
                                                <input type="text" className="form-control" value={taxInformation} onChange={(e) => setTaxInformation(e.target.value)} required />
                                            </div>

                                            <div className="form-group">
                                                <label>Overtime Hours:</label>
                                                <input type="text" className="form-control" value={overtimeHours} onChange={(e) => setOvertimeHours(e.target.value)} required />
                                            </div>

                                            <div className="form-group">
                                                <label>Bonuses:</label>
                                                <input type="text" className="form-control" value={bonuses} onChange={(e) => setBonuses(e.target.value)} required />
                                            </div>

                                            <div className="form-group">
                                                <label>Leave Balance:</label>
                                                <input type="text" className="form-control" value={leaveBalance} onChange={(e) => setLeaveBalance(e.target.value)} required />
                                            </div>

                                            <div className="form-group">
                                                <label>Payroll Period:</label>
                                                <input type="text" className="form-control" value={payrollPeriod} onChange={(e) => setPayrollPeriod(e.target.value)} required />
                                            </div>

                                            <div className="form-group">
                                                <label>Payment Data:</label>
                                                <input type="text" className="form-control" value={paymentData} onChange={(e) => setPaymentData(e.target.value)} required />
                                            </div>

                                            <div className="form-group">
                                                <label>Payment Method:</label>
                                                <input type="text" className="form-control" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required />
                                            </div>

                                            <div className="form-group">
                                                <label>Status:</label>
                                                <input type="text" className="form-control" value={status} onChange={(e) => setStatus(e.target.value)} required />
                                            </div>
                                        </form>

                                    </div>
                                </div>
                                {error && <div className="text-center text-danger">{error}</div>}
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                                    <span style={{ marginRight: '10px' }}></span>
                                    <button type="button" className="btn btn-primary" onClick={closeModal}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}