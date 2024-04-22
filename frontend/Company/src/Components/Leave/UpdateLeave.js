import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// import './UpdateList.css';


export default function UpdateLeave({ showModal, handleClose, employeeId, initialLeaveData }) {
    const [leavetype, setLeaveType] = useState("");
    const [leavealias, setLeaveAlias] = useState("");
    const [noofleave, setNoOfLeave] = useState("");
    const [error, setError] = useState("");
    const [leaveData, setLeaveData] = useState(null); // Define employeeData state
    const navigate = useNavigate();



    useEffect(() => {
        if (showModal && employeeId) {
            fetchEmployeeData(employeeId);
        }
    }, [showModal, employeeId, initialLeaveData]);

    useEffect(() => {
        if (initialLeaveData) {
            const { leavetype, leavealias, noofleave } = initialLeaveData;
            setLeaveType(leavetype);
            setLeaveAlias(leavealias);
            setNoOfLeave(noofleave);
        }
    }, [initialLeaveData]);



    const fetchEmployeeData = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/leaves/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch employee Data');
            }
            const data = await response.json();
            console.log("Fetched leave data:", data); // Log fetched data
            setLeaveData(data);
            setLeaveType(data.leavetype); // Ensure these lines are correctly setting state
            setLeaveAlias(data.leavealias);
            setNoOfLeave(data.noofleave);
        } catch (error) {
            setError(error.message);
        }
    };

    const resetForm = () => {
        setLeaveData(null);
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log({
            leavetype,
            leavealias,
            noofleave
        });

        let response = await fetch(`http://localhost:4000/leaves/${employeeId}`, {
            method: "PUT",
            body: JSON.stringify({
                leavetype,
                leavealias,
                noofleave
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
        <Modal show={showModal} onHide={handleClose} className="custom-modal">
            <Modal.Header closeButton className="bg-primary text-white">
                <Modal.Title>Update Leave</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="modal-body" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                    <div className="row">
                        <div className="col" >
                            <h4 className='companytitle text-primary'>Leave Details</h4><br></br>
                            <form>
                                <div className="form-group">
                                    <label>Leave Type</label>
                                    <input type="text" className="form-control" value={leavetype} onChange={(e) => setLeaveType(e.target.value)} required />
                                </div>

                                <div className="form-group">
                                    <label>Leave Alias</label>
                                    <input type="text" className="form-control" value={leavealias} onChange={(e) => setLeaveAlias(e.target.value)} required />
                                </div>

                                <div className="form-group">
                                    <label>No Of Leave</label>
                                    <input type="text" className="form-control" value={noofleave} onChange={(e) => setNoOfLeave(e.target.value)} required />
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
    );
}

