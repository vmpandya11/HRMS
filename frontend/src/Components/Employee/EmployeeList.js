
import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Updatemodal from './UpdateEmployee';
import './EmployeeList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import Menu from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import { Button } from 'react-bootstrap';

export default function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [entriesPerPage, setEntriesPerPage] = useState([5, 10, 15, 20, 25, 30]);
    const [selectedEntriesPerPage, setSelectedEntriesPerPage] = useState(5);
    const [dropdownWidth, setDropdownWidth] = useState('auto');
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const tableRef = useRef(null); // Reference to the table element

    useEffect(() => {
        getEmployees();
        generateDropdownOptions();
    }, [currentPage, selectedEntriesPerPage]);

    useEffect(() => {
        calculateDropdownWidth();
    }, [entriesPerPage]);

    const getEmployees = async () => {
        const startIndex = (currentPage - 1) * selectedEntriesPerPage;
        const endIndex = currentPage * selectedEntriesPerPage;
        const result = await fetch('http://localhost:4000/employees');
        const data = await result.json();
        setEmployees(data.slice(startIndex, endIndex));
        setTotalPages(Math.ceil(data.length / selectedEntriesPerPage));
    };

    const deleteEmployee = async (id) => {
        const result = await fetch(`http://localhost:4000/employee/${id}`, {
            method: "DELETE"
        });
        const data = await result.json();
        if (data) {
            getEmployees();
        }
    };

    const handleUpdateClick = (id) => {
        setSelectedEmployeeId(id);
        setShowModal(true);
    };

    const handleNextClick = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevClick = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleEntriesPerPageChange = (e) => {
        setSelectedEntriesPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    };

    const calculateDropdownWidth = () => {
        const longestOptionLength = Math.max(...entriesPerPage.map(option => option.toString().length));
        setDropdownWidth(`${longestOptionLength}ch`);
    };

    const generateDropdownOptions = () => {
        const options = [];
        for (let i = 1; i <= totalPages; i++) {
            options.push(i);
        }
        setDropdownOptions(options);
    };

    const handleSubmit = async (data) => {
        const result = await fetch('http://localhost:4000/addEmployee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const responseData = await result.json();
        if (responseData.success) {
            // After submitting, scroll to the previous position of the table
            if (tableRef.current) {
                tableRef.current.scrollIntoView({ behavior: 'smooth' });
            }
            // Fetch updated employee data
            getEmployees();
        } else {
            // Handle error if submission fails
            console.error(responseData.message);
        }
    };

    return (
        <div>
            <Menu />
            <Header />

            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12" style={{ width: "83vw", marginRight: "40px" }}>
                            <div className="card">
                                {/* <div className="card-header"> */}
                                {/* <h3 className="card-title">DataTable with minimal features &amp; hover style</h3> */}
                                {/* </div> */}
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-auto pe-2">
                                            <label >Show</label>
                                        </div>
                                        <div className="col-md-auto" style={{ marginBottom: "10px", display: 'flex', alignItems: 'center' }}>
                                            <select
                                                id="entriesPerPage"
                                                value={selectedEntriesPerPage}
                                                onChange={handleEntriesPerPageChange}
                                                style={{
                                                    width: "40px", height: '25px', marginRight: '10px'
                                                }}
                                            >
                                                {entriesPerPage.map((size) => (
                                                    <option key={size} value={size}>
                                                        {size}
                                                    </option>
                                                ))}
                                            </select>
                                            <label htmlFor="entriesPerPage" className="form-label mb-0">entries</label>
                                        </div>
                                    </div>

                                    <table id="example2" className="table table-bordered table-hover" ref={tableRef}>
                                        <thead>
                                            <tr>
                                                <th className="text-center">S.No</th>
                                                <th className="text-center">Name</th>
                                                <th className="text-center">Employee ID</th>
                                                <th className="text-center">Email</th>
                                                <th className="text-center">Operation</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {employees.map((employee, index) => (
                                                <tr key={index}>
                                                    <td className="text-center sno">{(currentPage - 1) * selectedEntriesPerPage + index + 1}</td>
                                                    <td className="text-center">{employee.name}</td>
                                                    <td className="text-center green-column">{employee.employeeId}</td>
                                                    <td className="text-center">{employee.email}</td>

                                                    < div style={{ display: "flex", justifyContent: "space-around" }}>
                                                        <button style={{ background: "none", border: "none" }} onClick={() => handleUpdateClick(employee._id)}>
                                                            <FontAwesomeIcon icon={faEdit} style={{ color: "blue", fontSize: "larger" }} />
                                                        </button>

                                                        <div class="vl" style={{ borderLeft: "1px solid black", height: "30px" }}></div>

                                                        <button style={{ background: "none", border: "none", paddingLeft: "5px" }} onClick={() => deleteEmployee(employee._id)}>
                                                            <FontAwesomeIcon icon={faTrash} style={{ color: "red", fontSize: "larger" }} />
                                                        </button>
                                                    </div>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <Updatemodal
                                            showModal={showModal}
                                            handleClose={() => setShowModal(false)}
                                            employeeId={selectedEmployeeId}
                                            handleSubmit={handleSubmit}
                                        />
                                    </table>
                                    {/* <div className="row" style={{ float: "right" }}>
                                        <div className="col-sm-12 col-md-12 text-center">
                                            <div className="dataTables_paginate paging_simple_numbers" id="example2_paginate">
                                                <ul className="pagination">
                                                    <li className={`paginate_button page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                        <button className={`page-link ${currentPage !== 1 ? 'text-white bg-primary' : ''}`} onClick={currentPage !== 1 ? handlePrevClick : undefined}>Previous</button>
                                                    </li>

                                                    <li className={`paginate_button page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                                        <button className={`page-link ${currentPage !== totalPages ? 'text-white bg-primary' : ''}`} onClick={currentPage !== totalPages ? handleNextClick : undefined}>Next</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="row justify-content-end mt-3">
                                        <div className="col-auto">
                                            <Button className={` ${currentPage === 1 ? 'disabled' : ''} ${currentPage !== 1 ? 'btn btn-primary ' : ''}`} onClick={currentPage !== 1 ? handlePrevClick : undefined} style={{ width: "100px" }}>Previous</Button>
                                        </div>
                                        <div className="col-auto">
                                            <Button className={` ${currentPage === totalPages ? 'disabled' : ''} ${currentPage !== totalPages ? 'btn btn-primary' : ''}`} onClick={currentPage !== totalPages ? handleNextClick : undefined} style={{ width: "100px" }}>Next</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    );
}
