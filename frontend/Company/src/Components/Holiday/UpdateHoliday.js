import React, { useEffect, useState, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function UpdateHoliday({ showModal, handleClose, employeeId, initialHolidayData }) {
    const [holidayname, setHolidayName] = useState("");
    const [startdate, setStartDate] = useState("");
    const [enddate, setEndDate] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleCloseRef = useRef(() => handleClose());

    useEffect(() => {
        if (showModal && employeeId) {
            fetchEmployeeData(employeeId);
        }
    }, [showModal, employeeId, initialHolidayData]);

    useEffect(() => {
        if (initialHolidayData) {
            const { holidayname, startdate, enddate } = initialHolidayData;
            setHolidayName(holidayname);
            setStartDate(startdate);
            setEndDate(enddate);
        }
    }, [initialHolidayData]);

    const fetchEmployeeData = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/holidays/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch employee Data');
            }
            const data = await response.json();
            console.log("Fetched leave data:", data); // Log fetched data
            setHolidayName(data.holidayname); // Ensure these lines are correctly setting state
            setStartDate(data.startdate);
            setEndDate(data.enddate);
        } catch (error) {
            setError(error.message);
        }
    };

    const resetForm = () => {
        setHolidayName("");
        setStartDate("");
        setEndDate("");
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log({
            holidayname,
            startdate,
            enddate
        });

        let response = await fetch(`http://localhost:4000/holidays/${employeeId}`, {
            method: "PUT",
            body: JSON.stringify({
                holidayname,
                startdate,
                enddate
            }),
            headers: {
                'Content-Type': "application/json"
            }
        });

        if (!response.ok) {
            const errorMessage = 'Failed to update employee';
            console.error(errorMessage);
            setError(errorMessage);
        } else {
            // Update successful, reload the page
            window.location.reload();
        }
    };

    return (
        <div>
            <Modal show={showModal} onHide={handleCloseRef.current} className="custom-modal">
                <Modal.Header closeButton className="bg-primary text-white">
                    <Modal.Title>Update Holiday</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-body" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                        <div className="row">
                            <div className="col" >
                                <h4 className='companytitle text-primary'>Holiday Details</h4><br></br>
                                <form>
                                    <div className="form-group">
                                        <label>Holiday Name</label>
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
                    </div>
                </Modal.Body>
                <Modal.Footer className='center justify-content-center'>
                    <Button variant="secondary" onClick={() => { handleClose(); resetForm(); }}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
