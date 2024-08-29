import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const API_URL = import.meta.env.VITE_APP_API_URL;

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${API_URL}/auth/adminlogin`, values)
            .then(result => {
                if (result.data.loginStatus) {
                    navigate('/Dashboard');
                } else {
                    setError(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='loginForm'>
                <div className='text-danger mb-3'>
                    {error && error}
                </div>
                <h2 className='text-center mb-4'>Employee Management</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email' className='form-label'><strong>Email:</strong></label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            autoComplete='off'
                            placeholder='Employee email'
                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                            className='form-control'
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password' className='form-label'><strong>Password:</strong></label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            placeholder='Password'
                            onChange={(e) => setValues({ ...values, password: e.target.value })}
                            className='form-control'
                        />
                    </div>
                    <div className='mb-3'>
                        <button className='btn btn-success w-100'>Log in</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
