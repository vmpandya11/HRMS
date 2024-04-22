import React, { useState } from 'react';
import Home from '../Home/Home';
import HolidayList from './HolidayList';

export default function Holiday() {
    const [holidayname, setHolidayName] = useState("");
    const [startdate, setStartDate] = useState("");
    const [enddate, setEndDate] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState("");

    const closeModal = () => {
        setShowModal(false);
        resetForm();
    };

    const resetForm = () => {
        setHolidayName("");
        setStartDate("");
        setEndDate("");
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) return;
        closeModal();
        console.log({
            holidayname,
            startdate,
            enddate
        });
        const employeeId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:4000/add-holiday", {
            method: "POST",
            body: JSON.stringify({
                holidayname,
                startdate,
                enddate,
                employeeId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        result = await result.json();
        console.warn(result);
        window.location.reload();
    };

    const validateInputs = () => {
        if (!holidayname.trim()) {
            setError("Please enter a holiday name.");
            return false;
        }
        if (!startdate) {
            setError("Please select a start date.");
            return false;
        }
        if (!enddate) {
            setError("Please select an end date.");
            return false;
        }
        // Additional validation if needed
        return true;
    };

    return (
        <div>
            <Home />
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Holiday Details</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item" style={{ padding: '10px' }}>
                                        <button type="button" className="btn btn-primary" onClick={() => setShowModal(true)}>
                                            Add Holiday
                                        </button>
                                    </li>
                                </ol>
                            </div>
                            <div className="col-10 center">
                                <HolidayList />
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
                                <h5 className="modal-title">Holiday Details</h5>
                                <button type="button" className="close" onClick={closeModal}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                <div className="row">
                                    <div className="col">
                                        <form>
                                            <div className="form-group">
                                                <label>Holiday Name:</label>
                                                <input type="text" className="form-control" value={holidayname} onChange={(e) => setHolidayName(e.target.value)} required />
                                            </div>

                                            <div className="form-group">
                                                <label>Start Date</label>
                                                <input type="date" className="form-control" value={startdate} onChange={(e) => setStartDate(e.target.value)} required />
                                            </div>

                                            <div className="form-group">
                                                <label>End Date</label>
                                                <input type="date" className="form-control" value={enddate} onChange={(e) => setEndDate(e.target.value)} required />
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
