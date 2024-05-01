import React, { useState, useEffect } from 'react';
import {
    CitySelect,
    CountrySelect,
    StateSelect,
    LanguageSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { withTranslation, useTranslation } from 'react-i18next';
import Home from '../Home/Home';
import CompanyList from './CompanyList';
import { Modal, Button } from 'react-bootstrap';

const Company = ({ t }) => {
    const [companyname, setcompanyName] = useState("");
    const [companylocation, setCompanyLocation] = useState("");
    const [gstNo, setGstNo] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [ownername, setOwnername] = useState("");
    const [ownermail, setOwnermail] = useState("");
    const [ownerNo, setOwnerNo] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState("");
    const [country, setCountry] = useState("");
    const [states, setStates] = useState("");
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [cities, setCities] = useState("");
    const [countryid, setCountryid] = useState(0);
    const [stateid, setStateid] = useState(0);
    const [selectedCity, setselectedCity] = useState('');

    const closeModal = () => {
        setShowModal(false);
    };

    const { i18n } = useTranslation();

    useEffect(() => {
        const selectedLanguage = localStorage.getItem('selectedLanguage');
        if (selectedLanguage) {
            i18n.changeLanguage(selectedLanguage);
        }
    }, [i18n]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) return;
        closeModal();
        console.log({
            companyname,
            companylocation,
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
        });
        const employeeId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:4000/add-company", {
            method: "POST",
            body: JSON.stringify({
                companyname,
                companylocation,
                gstNo,
                country,
                states,
                cities,
                username,
                password,
                email,
                ownername,
                ownermail,
                ownerNo,
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
        if (!companyname || !companylocation || !gstNo || !states || !country || !cities || !username || !password || !email || !ownername || !ownermail || !ownerNo) {
            setError("All fields are required");
            return false;
        }
        if (!isValidEmail(email)) {
            setError("Invalid email address");
            return false;
        }
        if (!isValidSalary(ownerNo)) {
            setError("Invalid ownerno format. Please enter a numeric value.");
            return false;
        }

        setError("");
        return true;
    }

    const isValidEmail = (email) => {
        // Regular expression for email validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const isValidSalary = (salary) => {
        return /^[0-9]+$/.test(salary);
    };


    return (
        <div>
            <Home />
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-3">
                                <h1 className="m-0">{t("Company Details")}</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right" style={{ marginRight: "-310px" }}>
                                    <li className="breadcrumb-item" style={{ padding: '10px' }}>
                                        <button type="button" className="btn btn-primary" onClick={() => setShowModal(true)}>
                                            {t("Add company")}
                                        </button>
                                    </li>
                                </ol>
                            </div>
                            <div className="col-10 center">
                                <CompanyList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (

                <div className="modal" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content" style={{ marginLeft: "30px" }}>
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">{t("Company Details")}</h5>
                                <button type="button" className="close" onClick={closeModal}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" style={{ maxHeight: '500px', overflowY: 'auto', overflowX: 'hidden' }}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <form>
                                            <div className="form-group">
                                                <label style={{ float: "left" }}>Company Name:</label>
                                                <input type="text" className="form-control" value={companyname} onChange={(e) => setcompanyName(e.target.value)} required />
                                            </div>
                                            <div className="form-group">
                                                <label style={{ float: "left" }}>Company Location:</label>
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
                                                        setCountryid(country.id);
                                                        setCountry(country.name)
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
                                                        setCities(city.name)
                                                        console.log(city);
                                                    }}
                                                    placeHolder="Select City"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label style={{ float: "left" }}>Owner Name:</label>
                                                <input type="text" className="form-control" value={ownername} onChange={(e) => setOwnername(e.target.value)} />
                                            </div>

                                        </form>
                                    </div>
                                    <div className="col-md-6">
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
                                                        setStates(state.name)
                                                        setStateid(state.id);
                                                    }}
                                                    placeHolder="Select State"
                                                />
                                            </div>

                                            <div className="form-group mt-4" >
                                                <label style={{ float: "left" }}>Owner Email:</label>
                                                <input type="email" className="form-control" value={ownermail} onChange={(e) => setOwnermail(e.target.value)} />
                                            </div>

                                            <div className="form-group mt-1">
                                                <label style={{ float: "left" }}>Owner Phone Number:</label>
                                                <input type="text" className="form-control" value={ownerNo} onChange={(e) => setOwnerNo(e.target.value)} />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                {error && <div className="text-center text-danger">{error}</div>}
                                <div className='modal-footer center justify-content-center'>
                                    <button type="submit" className="btn btn-primary mr-2" onClick={handleSubmit}>Submit</button>
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

export default withTranslation()(Company);
