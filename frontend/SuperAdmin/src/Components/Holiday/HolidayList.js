import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import UpdateHoliday from './UpdateHoliday';

const HolidayList = () => {
    const [holidaydata, setHolidayData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [showModal, setShowModal] = useState(false);
    const [selectedholidayId, setSelectedHolidayId] = useState(null);
    const [selectedholidaydata, setSelectedHolidayData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const tableRef = useRef(null);
    const params = useParams();


    const fetchHolidayData = async () => {
        try {
            const response = await fetch('http://localhost:4000/holidays');
            if (!response.ok) {
                throw new Error('Failed to fetch leave data');
            }
            const data = await response.json();
            const formattedData = data.map(holiday => ({
                ...holiday,
                startdate: formatDate(holiday.startdate),
                enddate: formatDate(holiday.enddate)
            }));
            setHolidayData(formattedData);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchHolidayData();
    }, []);

    const formatDate = (dateString) => {
        const dateParts = dateString.split("-");
        return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    };

    const deleteHoliday = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/holidays/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete leave');
            }
            const updatedLeaveData = holidaydata.filter(leave => leave._id !== id);
            setHolidayData(updatedLeaveData);
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
        setSelectedHolidayId(id);
        setShowModal(true);
    };

    // Calculate the index range for the current page
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;

    // Filter holiday data based on search term
    const filteredHolidayData = holidaydata.filter(holiday =>
        holiday.holidayname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        holiday.startdate.includes(searchTerm) ||
        holiday.enddate.includes(searchTerm)
    );


    const currentHolidayData = filteredHolidayData.slice(startIndex, endIndex);

    return (
        <section className="content">
            <div className="container-fluid">
                <div className="row justify-content-end mb-2" style={{ marginRight: "30px" }}>
                    <div className="col-auto">
                        <input type="text" placeholder='search leave' onChange={(e) => setSearchTerm(e.target.value)}></input>
                    </div>
                </div>
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

                                <table className="table table-bordered table-hover" >
                                    {/* ref={tableRef} */}
                                    <thead>
                                        <tr>
                                            <th className="text-center">Holiday Name</th>
                                            <th className="text-center">Start Date</th>
                                            <th className="text-center">End Date</th>
                                            <th className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentHolidayData.map((holiday) => (
                                            <tr key={holiday._id}>
                                                <td className="text-center">{holiday.holidayname}</td>
                                                <td className="text-center">{holiday.startdate}</td>
                                                <td className="text-center">{holiday.enddate}</td>
                                                <div style={{ display: "flex", justifyContent: "space-around" }}>                                                  <button style={{ background: "none", border: "none" }} onClick={() => handleEditClick(holiday._id)}>
                                                    <FontAwesomeIcon className='center' icon={faEdit} style={{ color: "blue", fontSize: "larger" }} />
                                                </button>

                                                    <div class="vl" style={{ borderLeft: "1px solid black", height: "30px" }}></div>

                                                    <button style={{ background: "none", border: "none", paddingLeft: "5px" }} onClick={() => deleteHoliday(holiday._id)} >
                                                        <FontAwesomeIcon icon={faTrash} style={{ color: "red", fontSize: "larger" }} />
                                                    </button>
                                                </div>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="row justify-content-end mt-3">
                                    <div className="col-auto">
                                        <Button className={` ${currentPage === 1 ? 'disabled' : ''} ${currentPage !== 1 ? 'btn btn-primary ' : ''}`} onClick={currentPage !== 1 ? handlePrevClick : undefined} style={{ width: "100px" }}>Previous</Button>
                                    </div>
                                    <div className="col-auto">
                                        <Button className={` ${currentPage === totalPages || currentHolidayData.length < entriesPerPage ? 'disabled' : ''} ${currentPage !== totalPages ? 'btn btn-primary' : ''}`} onClick={currentPage !== totalPages ? handleNextClick : undefined} style={{ width: "100px" }}>Next</Button>
                                    </div>
                                </div>
                            </div>

                            <UpdateHoliday
                                showModal={showModal}
                                handleClose={() => setShowModal(false)}
                                employeeId={selectedholidayId}
                                initialHolidayData={selectedholidaydata}
                            />
                        </div>
                    </div>
                </div>
            </div >
        </section >
    );
}

export default HolidayList;

