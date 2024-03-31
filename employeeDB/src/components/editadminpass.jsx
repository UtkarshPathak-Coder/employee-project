import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditadminPass = () => {
    const { id } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        axios.put(`http://localhost:3000/auth/edit_adminpass/${id}`, { password })
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard');
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='d-flex justify-content-center align-items-center mt-3'>
            <div className='p-3 rounded w-50 border'>
                <h2 className='text-center'>Update Admin Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor='inputPassword' className='form-label'><strong>Password:</strong></label>
                        <input type='password' placeholder='Enter password' value={password} className='form-control rounded-0' id='inputPassword' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='inputConfirmPassword' className='form-label'><strong>Confirm Password:</strong></label>
                        <input type='password' placeholder='Confirm password' value={confirmPassword} className='form-control rounded-0' id='inputConfirmPassword' onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    {error && <div className="text-danger">{error}</div>}
                    <div className='col-12 mt-2'>
                        <button className='btn btn-success w-100 rounded-0'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditadminPass;
