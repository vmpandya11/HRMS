import React, { useState } from 'react';
import Home from '../Home/Home';
import LeaveList from './LeaveList';

export default function Leave() {

    const [leavetype, setLeaveType] = useState("");
    const [leavealias, setLeaveAlias] = useState("");
    const [noofleave, setNoOfLeave] = useState("");
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
        console.log({
            leavetype,
            leavealias,
            noofleave
        });
        const employeeId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:4000/add-leave", {
            method: "POST",
            body: JSON.stringify({
                leavetype,
                leavealias,
                noofleave, employeeId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        result = await result.json();
        console.warn(result);
        window.location.reload();
    };




    // const validateInputs = () => {
    //     if (!employeeName || !address || !country || !state || !city || !contact || !gender || !companyName || !role || !salary || !email || !password || !experience) {
    //         setError("All fields are required");
    //         return false;
    //     }

    //     if (!isValidEmail(email)) {
    //         setError("Invalid email address");
    //         return false;
    //     }
    //     if (!isValidSalary(salary)) {
    //         setError("Invalid salary format. Please enter a numeric value.");
    //         return false;
    //     }

    //     setError("");
    //     return true;
    // };

    // const isValidEmail = (email) => {
    //     // Regular expression for email validation
    //     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    // };

    // const isValidSalary = (salary) => {
    //     return /^[0-9]+$/.test(salary);
    // };

    return (

        <div>
            <Home />
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Leave Type</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item" style={{ padding: '10px' }}>
                                        <button type="button" className="btn btn-primary 
                                        " onClick={() => setShowModal(true)}>
                                            Add Leave
                                        </button>
                                    </li>
                                </ol>
                            </div>
                            <div className="col-10 center" >
                                <LeaveList />
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
                                <h5 className="modal-title ">Leave Details</h5>
                                <button type="button" className="close" onClick={closeModal}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                <div className="row">
                                    <div className="col">
                                        <form>
                                            <div className="form-group">
                                                <label>Leave Type:</label>
                                                <input type="text" className="form-control" value={leavetype} onChange={(e) => setLeaveType(e.target.value)} required />
                                            </div>

                                            <div className="form-group">
                                                <label>Leave Type Alias</label>
                                                <input type="text" className="form-control" value={leavealias} onChange={(e) => setLeaveAlias(e.target.value)} required />
                                            </div>

                                            <div className="form-group">
                                                <label>No of Leave</label>
                                                <input type="text" className="form-control" value={noofleave} onChange={(e) => setNoOfLeave(e.target.value)} required />
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
