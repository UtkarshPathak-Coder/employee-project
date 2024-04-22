import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import AddEmployee from './Addemployee'

const API_URL = import.meta.env.VITE_APP_API_URL;

const Employee = () => {
    const[employee,setEmployee]=useState([])
    const [showmodal,setshowModal]=useState(false);
    useEffect(()=>{
        axios.get(`${API_URL}/auth/employee`)
        .then(result=>{
            if(result.data.Status)
            {
                setEmployee(result.data.Result);
            }
            else{
                alert(result.data.Error)
            }
        }).catch(err=>console.log(err))
    },[]) 
    const navigate=useNavigate()
    
    const handleDelete=(id)=>{
        axios.delete(`${API_URL}/auth/delete_employee/`+id)
        .then(result=>{
            if (result.data.Status){
                window.location.reload()
            }else{
                alert(result.data.Error)
            }
        })
    }
    return (
        <div className='px-5 mt-3'>
            <div className='d-flex justify-content-center'>
                <h3>Employee List</h3>
            </div>
            <button onClick={()=>setshowModal(true)} className='btn btn-success'>Add Employeee</button>
            {showmodal && <AddEmployee onClose={()=>setshowModal(false)}/>}
            <div className='mt-3 '>
            <table className='table'>
                <thead>
                    <tr>
                        <th> Name</th>
                        <th> Email</th>
                        <th> Salary</th>
                        <th> Address</th>
                        <th>Department</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employee.map(e=> (
                            <tr>
                                <td>{e.name}</td>
                                <td>{e.email}</td>
                                <td>{e.salary}</td>
                                <td>{e.address}</td>
                                <td>{e.department_name}</td>
                                <td>
                                    <Link to={`/dashboard/edit_employee/ `+e.id} className='btn btn-warning btn-sm me-2'>Update</Link>
                                    <button className='btn btn-danger btn-sm' onClick={()=>handleDelete(e.id)}>Delete </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        </div>
    )
}

export default Employee