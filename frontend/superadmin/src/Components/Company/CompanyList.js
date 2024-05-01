import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons'; // Added faSearch icon
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import UpdateCompany from './UpdateCompany';
import { withTranslation } from 'react-i18next';
import './CompanyList.css'

const CompanyList = ({ t }) => {
    const [companydata, setCompanyData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [entriesPerPage, setEntriesPerPage] = useState(5);
    const [showModal, setShowModal] = useState(false);
    const [selectedcompanyId, setSelectedCompanyId] = useState(null);
    const [selectedcompanydata, setSelectedCompanyData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const tableRef = useRef(null);
    const params = useParams();

    useEffect(() => {
        const getCompany = async () => {
            const result = await fetch('http://localhost:4000/companys');
            const data = await result.json();
            setCompanyData(data);
            setTotalPages(Math.ceil(data.length / entriesPerPage));
        };

        getCompany();
    }, [currentPage, entriesPerPage]);

    const deleteCompany = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/companys/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete company');
            }
            const updatedCompanyData = companydata.filter(company => company._id !== id);
            setCompanyData(updatedCompanyData);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleEntriesPerPageChange = (e) => {
        const selectedEntriesPerPage = parseInt(e.target.value);
        setEntriesPerPage(selectedEntriesPerPage);
        setCurrentPage(1);
    };

    const handleNextClick = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevClick = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleEditClick = (id) => {
        setSelectedCompanyId(id);
        setShowModal(true);
    };

    // Filter company data based on search term
    const filteredCompanyData = companydata.filter(company =>
        (company.companyname && company.companyname.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (company.companylocation && company.companylocation.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = Math.min(startIndex + entriesPerPage, filteredCompanyData.length);

    const currentCompanyData = filteredCompanyData.slice(startIndex, endIndex);

    return (
        <section className="content">
            <div className="container-fluid" style={{ marginLeft: "-245px" }}>
                <div className="row justify-content-end mb-2" style={{ marginRight: "30px" }}>
                    <div className="col-auto" style={{ marginRight: "-470px" }}>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder={t('search_company')} onChange={(e) => setSearchTerm(e.target.value)} />
                            <span className="input-group-text"><FontAwesomeIcon icon={faSearch} /></span>
                        </div>

                    </div>
                </div>
                <div className="row" style={{ width: "1220px" }}>
                    <div className="col-12" style={{ width: "200vw", marginRight: "40px" }}>
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-auto pe-2">
                                        <label>{t("Show")}</label>
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
                                        <label htmlFor="entriesPerPage" className="form-label mb-0">{t('entries')}</label>
                                    </div>
                                </div>

                                <table className="table table-bordered table-hover">
                                    <thead className='bg-primary'>
                                        <tr >
                                            <th className="text-center">{t('Sr No')}</th>
                                            <th className="text-center">{t('Company Name')}</th>
                                            <th className="text-center">{t('Company Location')}</th>
                                            <th className="text-center">{t('Action')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentCompanyData.map((company, index) => (
                                            <tr key={company._id}>
                                                <td className="text-center sno">{startIndex + index + 1}</td>
                                                <td className="text-center">{company.companyname}</td>
                                                <td className="text-center">{company.companylocation}</td>
                                                <td>
                                                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                                                        <button style={{ background: "none", border: "none" }} onClick={() => handleEditClick(company._id)}>
                                                            <FontAwesomeIcon className='center' icon={faEdit} style={{ color: "blue", fontSize: "larger" }} />
                                                        </button>

                                                        <div className="vl" style={{ borderLeft: "1px solid black", height: "30px" }}></div>

                                                        <button style={{ background: "none", border: "none", paddingLeft: "5px" }} onClick={() => deleteCompany(company._id)} >
                                                            <FontAwesomeIcon icon={faTrash} style={{ color: "red", fontSize: "larger" }} />
                                                        </button>

                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="row justify-content-end mt-3">
                                    <div className="col-auto">
                                        <Button className={`${currentPage === 1 ? 'disabled' : ''} ${currentPage !== 1 ? 'btn btn-primary ' : ''}`} onClick={handlePrevClick} style={{ width: "100px" }}>{t('Previous')}</Button>
                                    </div>
                                    <div className="col-auto">
                                        <Button className={`${currentPage === totalPages || currentCompanyData.length < entriesPerPage ? 'disabled' : ''} ${currentPage !== totalPages ? 'btn btn-primary' : ''}`} onClick={handleNextClick} style={{ width: "100px" }}>{t('Next')}</Button>
                                    </div>
                                </div>
                            </div>
                            <UpdateCompany
                                showModal={showModal}
                                handleClose={() => setShowModal(false)}
                                employeeId={selectedcompanyId}
                                initialcompanyData={selectedcompanydata}
                            />
                        </div>
                    </div>
                </div>
            </div >
        </section >
    );
}

export default withTranslation()(CompanyList);


