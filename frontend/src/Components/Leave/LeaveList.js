import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import UpdateLeave from './UpdateLeave';
import { useParams } from 'react-router-dom';

const LeaveList = () => {
    const [leaveData, setLeaveData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [showModal, setShowModal] = useState(false);
    const [selectedLeaveId, setSelectedLeaveId] = useState(null);
    const [selectedLeaveData, setSelectedLeaveData] = useState(null);
    const tableRef = useRef(null);
    const params = useParams();

    useEffect(() => {
        const fetchLeaveData = async () => {
            try {
                const response = await fetch('http://localhost:4000/leaves');
                if (!response.ok) {
                    throw new Error('Failed to fetch leave data');
                }
                const data = await response.json();
                setLeaveData(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchLeaveData();
    }, []);



    const deleteLeave = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/leaves/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete leave');
            }
            const updatedLeaveData = leaveData.filter(leave => leave._id !== id);
            setLeaveData(updatedLeaveData);
        } catch (error) {
            console.error(error.message);
        }
    };
    const handleEntriesPerPageChange = (e) => {
        setEntriesPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    };

    const handleNextClick = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevClick = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleEditClick = (id) => {
        setSelectedLeaveId(id);
        setShowModal(true);
    };

    // Calculate the index range for the current page
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;

    // Slice the leaveData array to display only the records for the current page
    const currentLeaveData = leaveData.slice(startIndex, endIndex);

    return (
        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12" style={{ width: "83vw", marginRight: "40px" }}>
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">DataTable with minimal features &amp; hover style</h3>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-auto pe-2">
                                        <label>Show</label>
                                    </div>
                                    <div className="col-md-auto" style={{ marginBottom: "10px", display: 'flex', alignItems: 'center' }}>
                                        <select
                                            id="entriesPerPage"
                                            value={entriesPerPage}
                                            onChange={handleEntriesPerPageChange}
                                            style={{ width: "40px", height: '25px', marginRight: '10px' }}
                                        >
                                            {[5, 10, 15, 20, 25, 30].map((size) => (
                                                <option key={size} value={size}>
                                                    {size}
                                                </option>
                                            ))}
                                        </select>
                                        <label htmlFor="entriesPerPage" className="form-label mb-0">entries</label>
                                    </div>
                                </div>

                                <table className="table table-bordered table-hover" ref={tableRef}>
                                    <thead>
                                        <tr>
                                            <th className="text-center">Leave Type</th>
                                            <th className="text-center">Leave Alias</th>
                                            <th className="text-center">No of Leave</th>
                                            <th className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentLeaveData.map((leave) => (
                                            <tr key={leave._id}>
                                                <td className="text-center">{leave.leavetype}</td>
                                                <td className="text-center">{leave.leavealias}</td>
                                                <td className="text-center">{leave.noofleave}</td>
                                                <div style={{ display: "flex", justifyContent: "space-around" }}>                                                  <button style={{ background: "none", border: "none" }} onClick={() => handleEditClick(leave._id)}>
                                                    <FontAwesomeIcon className='center' icon={faEdit} style={{ color: "blue", fontSize: "larger" }} />
                                                </button>

                                                    <div class="vl" style={{ borderLeft: "1px solid black", height: "30px" }}></div>

                                                    <button style={{ background: "none", border: "none", paddingLeft: "5px" }} onClick={() => deleteLeave(leave._id)} >
                                                        <FontAwesomeIcon icon={faTrash} style={{ color: "red", fontSize: "larger" }} />
                                                    </button>
                                                </div>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="row justify-content-end mt-3">
                                    <div className="col-auto">
                                        {/* <Button className={` ${currentPage === 1 ? 'disabled' : ''} ${currentPage !== 1 ? 'btn btn-primary m-3' : ''}`} onClick={currentPage !== 1 ? handlePrevClick : undefined} style={{ width: "100px" }}>Previous</Button>
                                        <Button className={` ${currentPage === totalPages ? 'disabled' : ''} ${currentPage !== totalPages ? 'btn btn-primary' : ''}`} onClick={currentPage !== totalPages ? handleNextClick : undefined} style={{ width: "100px" }}>Next</Button> */}
                                        <Button className={` ${currentPage === 1 ? 'disabled' : ''} ${currentPage !== 1 ? 'btn btn-primary m-3' : ''}`} onClick={currentPage !== 1 ? handlePrevClick : undefined} style={{ width: "100px" }}>Previous</Button>
                                        <Button className={` ${currentPage === totalPages || currentLeaveData.length < entriesPerPage ? 'disabled' : ''} ${currentPage !== totalPages ? 'btn btn-primary' : ''}`} onClick={currentPage !== totalPages ? handleNextClick : undefined} style={{ width: "100px" }}>Next</Button>
                                    </div>
                                </div>
                            </div>

                            <UpdateLeave
                                showModal={showModal}
                                handleClose={() => setShowModal(false)}
                                employeeId={selectedLeaveId}
                                initialLeaveData={selectedLeaveData}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}

export default LeaveList;
