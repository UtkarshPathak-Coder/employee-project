import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal'; 
import { useNavigate } from 'react-router-dom';

const AddEmployee = ({ onClose }) => {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        password: '',
        salary: '',
        address: '',
        category_id: '',
    });
    const navigate = useNavigate();
    const [category, setCategory] = useState([]);
    const [duplicateEmailError, setDuplicateEmailError] = useState('');
    useEffect(() => {
        axios.get('http://10.16.2.95:3000/auth/Category')
            .then(result => {
                if (result.data.Status) {
                    setCategory(result.data.Result);
                }
                else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const lowercaseEmail = employee.email.toLowerCase();
        setEmployee({ ...employee, email: lowercaseEmail });
        axios.post('http://10.16.2.95:3000/auth/addemployee', employee)
            .then(result => {
                if (result.data.Status) {
                    window.location.reload()
                    onClose();
                }
                else {
                    if (result.data.Error.includes('duplicate key value')) {
                    setDuplicateEmailError('Email already exists');
                    } else {
                    alert(result.data.Error);
                    }
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <Modal isOpen={true} onRequestClose={onClose} className='w-60 h-60 justify-content-center p-5'>
            <div className='d-flex justify-content-center align-items-center mt-3'>
            <div className='p-5 rounded w-50  border '>

                <h2 className='text-center'>Add Employee</h2>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label for='inputName' className='form-label'><strong>Name:</strong></label>
                        <input type='text' placeholder='enter name' className='form-control rounded-0' id='inputName' onChange={(e) => setEmployee({ ...employee, name: e.target.value })} />
                    </div>
                    <div className='col-12'>
                        <label for='inputEmail14' className='form-label'><strong>Email:</strong></label>
                        <input type='email' placeholder='enter email' className='form-control rounded-0' id='inputEmail14' autoComplete='off' onChange={(e) => setEmployee({ ...employee, email: e.target.value })} />
                        {duplicateEmailError && <div className="text-danger">{duplicateEmailError}</div>}
                    </div>
                    <div className='col-12'>
                        <label for='inputPassword64' className='form-label'><strong>Password:</strong></label>
                        <input type='password' placeholder='enter password' className='form-control rounded-0' id='inputPassword64' onChange={(e) => setEmployee({ ...employee, password: e.target.value })} />
                    </div>
                    <div className='col-12'>
                        <label for='inputSalary' className='form-label'><strong>Salary:</strong></label>
                        <input type='text' placeholder='enter salary' className='form-control rounded-0' id='inputSalary' onChange={(e) => setEmployee({ ...employee, salary: e.target.value })} />
                    </div>
                    <div className='col-12'>
                        <label for='inputAddress' className='form-label'><strong>Address:</strong></label>
                        <input type='text' placeholder='addr' className='form-control rounded-0' id='inputAddress' onChange={(e) => setEmployee({ ...employee, address: e.target.value })} />
                    </div>
                    <div className='col-12'>
                        <label for='category' className='form-label'><strong>Department:</strong></label>
                        <select name='category' placeholder='select department' id='category' className='form-select' onChange={(e)=>setEmployee({...employee,category_id:e.target.value})}>
                        <option value="">------Select department---------</option>{category.map(c => {
                                return <option value={c.id}>{c.name}</option>
                            })}
                        </select>
                    </div>
                   

                    <div className='col-12'>
                        <button className='btn btn-success w-100 rounded-0'>ADD</button>
                    </div>
                </form>
            </div>
        </div>
        </Modal>
    );
}

export default AddEmployee;