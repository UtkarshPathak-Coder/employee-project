import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { Modal, Button } from 'react-bootstrap';

const API_URL = import.meta.env.VITE_APP_API_URL;

const Dashboard = () => {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const [showModal, setShowModal] = useState(false);

    const handleLogout = () => {
        setShowModal(true);
    };

    const confirmLogout = () => {
        axios.get(`${API_URL}/auth/logout`)
            .then(result => {
                if (result.data.Status) {
                    setShowModal(false);
                    navigate('/adminlogin');
                }
            })
            .catch(error => console.error(error));
    };

    const cancelLogout = () => {
        setShowModal(false);
    };

    return (
        <div className='container-fluid'>
            <div className='row flex-nowrap'>
                <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark'>
                    <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>
                        <ul className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start' id='menu'>
                            <li className='w-100'>
                                <Link to="/Dashboard" className='nav-link text-white px-0 align-middle'>Dashboard</Link>
                            </li>
                            <li className='w-100'>
                                <Link to="/Dashboard/Employee" className='nav-link text-white px-0 align-middle'>Manage Employee</Link>
                            </li>
                            <li className='w-100'>
                                <Link to="/Dashboard/Category" className='nav-link text-white px-0 align-middle'>Department</Link>
                            </li>
                            <li className='w-100' onClick={handleLogout}>
                                <Link className='nav-link text-white px-0 align-middle'>Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='col p-0 m-0'>
                    <div className='p-2 d-flex justify-content-center shadow'>
                        <h4>Employee Management</h4>
                    </div>
                    <Outlet />
                </div>
            </div>

            {/* Logout Confirmation Modal */}
            <Modal show={showModal} onHide={cancelLogout}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to logout?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelLogout}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmLogout}>
                        Logout
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};



export default Dashboard