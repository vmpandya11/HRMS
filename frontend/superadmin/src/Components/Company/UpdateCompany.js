import React, { useEffect, useState, useRef } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import "./UpdateCompany.css"
import { IoMdClose } from "react-icons/io";
import {
    CitySelect,
    CountrySelect,
    StateSelect,
    LanguageSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import './UpdateCompany.css'


export default function UpdateCompany({ showModal, handleClose, employeeId, initialCompanyData }) {
    const [companyname, setCompanyName] = useState("");
    const [companylocation, setCompanyLocation] = useState("");
    const [companylogo, setCompanyLogo] = useState("");
    const [gstNo, setGstNo] = useState("");
    const [country, setCountry] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [ownername, setOwnername] = useState("");
    const [ownermail, setOwnermail] = useState("");
    const [ownerNo, setOwnerNo] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleCloseRef = useRef(() => handleClose());
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [countryid, setCountryid] = useState(0);
    const [stateid, setstateid] = useState(0);
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);

    useEffect(() => {
        if (showModal && employeeId) {
            fetchEmployeeData(employeeId);
        }
    }, [showModal, employeeId, initialCompanyData]);

    useEffect(() => {
        if (initialCompanyData) {
            const { companyname, companylocation } = initialCompanyData;
            setCompanyName(companyname);
            setCompanyLocation(companylocation)

        }
    }, [initialCompanyData]);

    const fetchEmployeeData = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/companys/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch employee Data');
            }
            const data = await response.json();
            console.log("Fetched company data:", data);
            setCompanyName(data.companyname);
            setCompanyLocation(data.companylocation);
            setGstNo(data.gstNo);
            setCountry(data.country);
            setStates(data.states);
            setCities(data.cities);
            setUsername(data.username);
            setPassword(data.password);
            setEmail(data.email);
            setOwnername(data.ownername);
            setOwnermail(data.ownermail);
            setOwnerNo(data.ownerNo);

        } catch (error) {
            setError(error.message);
        }
    };
    const resetForm = () => {
        setCompanyName("");
        setCompanyLocation("");
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log({
            companyname,
            companylocation

        });

        let response = await fetch(`http://localhost:4000/companys/${employeeId}`, {
            method: "PUT",
            body: JSON.stringify({
                companyname,
                companylocation,
                companylogo,
                gstNo,
                country,
                states,
                cities,
                username,
                password,
                email,
                ownername,
                ownermail,
                ownerNo
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
            window.location.reload();
        }
    };

    return (
        <Modal show={showModal} onHide={handleCloseRef.current} className="custom-modal" >
            <Modal.Header className='bg-primary text-white'>
                <Modal.Title>Update Company</Modal.Title>
                <IoMdClose cursor="pointer" onClick={handleClose} />
            </Modal.Header>
            <Modal.Body style={{ overflowX: 'hidden' }} >
                <div className="modal-body" style={{ maxHeight: '500px', overflowY: 'auto ' }}>
                    <Row>
                        <Col md={6} className="pr-md-3">
                            <form>
                                <div className="form-group">
                                    <label>Companay Name</label>
                                    <input type="text" className="form-control" value={companyname} onChange={(e) => setCompanyName(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Companay Location</label>
                                    <input type="text" className="form-control" value={companylocation} onChange={(e) => setCompanyLocation(e.target.value)} required />
                                </div>

                                <div className="form-group">
                                    <label style={{ float: "left" }}>GST Number:</label>
                                    <input type="text" className="form-control" value={gstNo} onChange={(e) => setGstNo(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="country" value={country} style={{ marginRight: "680px" }} >Country:</label>
                                    <CountrySelect
                                        onChange={(country) => {
                                            setSelectedCountry(country);
                                            setCountryid(country.id);
                                            setCountry(country.name);
                                        }}
                                        placeHolder="Select Country"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="city" value={cities} style={{ marginRight: "710px" }} >City:</label>
                                    <CitySelect
                                        countryid={countryid}
                                        stateid={stateid}
                                        onChange={(city) => {
                                            setCities(city.name);
                                            setCities(city.name);
                                            console.log(city);
                                        }}
                                        placeHolder="Select City"
                                    />
                                </div>
                                <div className="form-group">
                                    <label style={{ float: "left" }}>Owner Email:</label>
                                    <input type="email" className="form-control" value={ownermail} onChange={(e) => setOwnermail(e.target.value)} />
                                </div>
                            </form>
                        </Col>
                        <Col md={6} className="pl-md-3">
                            <form>

                                <div className="form-group">
                                    <label style={{ float: "left" }}>Username:</label>
                                    <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label style={{ float: "left" }}>Password:</label>
                                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label style={{ float: "left" }}>Email:</label>
                                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="state" value={states} style={{ marginRight: "700px" }}>State:</label>
                                    <StateSelect
                                        countryid={countryid}
                                        onChange={(state) => {
                                            setSelectedState(state);
                                            setStates(state.name);
                                            setstateid(state.id);
                                        }}
                                        placeHolder="Select State"
                                    />
                                </div>
                                <div className="form-group mt-4">
                                    <label style={{ float: "left" }}>Owner Name:</label>
                                    <input type="text" className="form-control" value={ownername} onChange={(e) => setOwnername(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label style={{ float: "left" }}>Owner Phone Number:</label>
                                    <input type="text" className="form-control" value={ownerNo} onChange={(e) => setOwnerNo(e.target.value)} />
                                </div>
                            </form>
                        </Col>
                    </Row>
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
    )
}



// company name
//company logo - image base 64 format
//Gst No
//country list of country
//State   list of state
//City    list of city
//address
//userName
//password
//email
//owner's name
//owner's email
//owner's contact no
