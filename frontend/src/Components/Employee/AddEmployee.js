import React, { useState } from 'react';
import EmployeeList from './EmployeeList';

export default function AddEmployee() {

    const [employeeName, setEmployeeName] = useState("");
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [contact, setContact] = useState("");
    const [gender, setGender] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [role, setRole] = useState("");
    const [salary, setSalary] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [experience, setExperience] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState("");

    const closeModal = () => {
        setShowModal(false);
        resetForm();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) return;
        closeModal();
        console.log({
            name: employeeName,
            address,
            country,
            state,
            city,
            contact,
            gender,
            companyName,
            role,
            salary,
            email,
            password,
            experience
        });
        const employeeId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:4000/add-employee", {
            method: "POST",
            body: JSON.stringify({
                name: employeeName,
                address,
                country,
                state,
                city,
                contact,
                gender,
                companyName,
                role,
                salary,
                email,
                password,
                experience,
                employeeId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        result = await result.json();
        console.warn(result);
        resetForm();
        window.location.reload();
    };
    const resetForm = () => {
        setEmployeeName("");
        setAddress("");
        setCountry("");
        setState("");
        setCity("");
        setContact("");
        setGender("");
        setCompanyName("");
        setRole("");
        setSalary("");
        setEmail("");
        setPassword("");
        setExperience("");
        setError("");
    };



    const validateInputs = () => {
        if (!employeeName || !address || !country || !state || !city || !contact || !gender || !companyName || !role || !salary || !email || !password || !experience) {
            setError("All fields are required");
            return false;
        }

        if (!isValidEmail(email)) {
            setError("Invalid email address");
            return false;
        }
        if (!isValidSalary(salary)) {
            setError("Invalid salary format. Please enter a numeric value.");
            return false;
        }

        setError("");
        return true;
    };

    const isValidEmail = (email) => {
        // Regular expression for email validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const isValidSalary = (salary) => {
        return /^[0-9]+$/.test(salary);
    };

    return (
        <div>
            <div className="content-wrapper">
                <div className="content-header ">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6 ">
                                <h1 className="m-0">Employee List</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item " style={{ padding: '10px' }}>
                                        <button type="button" className="btn btn-primary 
                                        " onClick={() => setShowModal(true)}>
                                            {/* <FontAwesomeIcon icon={faPlus} style={{ fontSize: '2em', color: 'white', borderRadius: "50%" }} ></FontAwesomeIcon> */}
                                            Add Employee
                                        </button>
                                    </li>
                                </ol>
                            </div>
                            <div className="col-10 center" >
                                <EmployeeList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            {showModal && (
                <div className="modal" style={{ display: 'block', }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content" style={{ marginLeft: "30px" }}>
                            <div className="modal-header bg-primary">
                                <h5 className="modal-title">Add Employee</h5>
                                <button type="button" className="close" onClick={closeModal}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                <div className="row">
                                    <div className="col">
                                        <h4 className='companytitle  text-primary'>Personal Details</h4><br></br>
                                        <form>
                                            <div className="form-group">
                                                <label>Employee Name:</label>
                                                <input type="text" className="form-control" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} required />
                                            </div>

                                            <div className="form-group">
                                                <label>Address:</label>
                                                <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} required />
                                            </div>

                                            <div className="form-group">
                                                <label>Country:</label>
                                                <input type="text" className="form-control" value={country} onChange={(e) => setCountry(e.target.value)} required />
                                            </div>

                                            <div className="form-group">
                                                <label>State:</label>
                                                <input type="text" className="form-control" value={state} onChange={(e) => setState(e.target.value)} required />
                                            </div>

                                            <div className="form-group">
                                                <label>City:</label>
                                                <input type="text" className="form-control" value={city} onChange={(e) => setCity(e.target.value)} required />
                                            </div>

                                            <div className="form-group">
                                                <label>Contact:</label>
                                                <input type="text" className="form-control" value={contact} onChange={(e) => setContact(e.target.value)} required />
                                            </div>

                                            <div className="form-group">
                                                <label>Gender:</label>
                                                <select className="form-control" value={gender} onChange={(e) => setGender(e.target.value)} required>
                                                    <option value="">Select the Option</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                </select>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col">
                                        <h4 className='companytitle text-primary'>Company Details</h4><br></br>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label>Company Name:</label>
                                                <input type="text" className="form-control" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
                                            </div>

                                            <div className="form-group">
                                                <label>Role:</label>
                                                <input type="text" className="form-control" value={role} onChange={(e) => setRole(e.target.value)} required />
                                            </div>

                                            <div className="form-group">
                                                <label>Salary:</label>
                                                <input type="text" className="form-control" value={salary} onChange={(e) => setSalary(e.target.value)} required pattern="[0-9]*" />
                                            </div>

                                            <div className="form-group">
                                                <label>Email:</label>
                                                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                            </div>

                                            <div className="form-group">
                                                <label>Password:</label>
                                                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                            </div>

                                            <div className="form-group">
                                                <label>Experience:</label>
                                                <input type="text" className="form-control" value={experience} onChange={(e) => setExperience(e.target.value)} required />
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
