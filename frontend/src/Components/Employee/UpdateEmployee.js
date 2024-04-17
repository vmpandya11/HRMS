import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './UpdateList.css'


export default function Updatemodal({ showModal, handleClose, employeeId }) {
    const [name, setName] = useState("");
    const [employeeData, setEmployeeData] = useState(null);
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
    const [error, setError] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        if (showModal && employeeId) {
            fetchEmployeeData(employeeId);
        }
    }, [showModal, employeeId]);


    const fetchEmployeeData = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/employee/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch employee data');
            }
            const data = await response.json();
            setEmployeeData(data);
            setName(data.name);
            setAddress(data.address);
            setCountry(data.country);
            setState(data.state);
            setCity(data.city);
            setContact(data.contact);
            setGender(data.gender);
            setCompanyName(data.companyName);
            setRole(data.role);
            setSalary(data.salary);
            setEmail(data.email);
            setPassword(data.password);
            setExperience(data.experience);
        } catch (error) {
            setError(error.message);
        }
    };

    const resetForm = () => {
        setEmployeeData(null);
        setError("");
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log({
            name,
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

        let response = await fetch(`http://localhost:4000/employee/${employeeId}`, {
            method: "PUT",
            body: JSON.stringify({
                name,
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
            const resultData = await response.json();
            console.log(resultData);
            // setEmployeeData(resultData);
            handleClose(); // Close the modal
            resetForm();
            navigate("/addemployee");
        }
    };
    return (
        <Modal show={showModal} onHide={handleClose} className="custom-modal">
            <Modal.Header closeButton className="bg-primary text-white">
                <Modal.Title >Update Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="modal-body" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                    <div className="row">
                        <div className="col">
                            <h4 className='companytitle text-primary'>Personal Details</h4><br></br>
                            <form>
                                <div className="form-group">
                                    <label>Employee Name:</label>
                                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
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
                            <form>
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


