import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
const API_URL = import.meta.env.VITE_APP_API_URL;
const Home = () => {
  const [adminTotal, setAdminTotal] = useState();
  const [employeeTotal , setEmployeeTotal] = useState();
  const [salaryTotal , setSalaryTotal] = useState();
  const [admins, setAdmins] = useState([])
  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    Adminrec();
  }, []);
  const Adminrec = () => {
    axios.get(`${API_URL}/auth/admin_record`)
      .then(result => {
        if (result.data.Status) {
          setAdmins(result.data.Result); 
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  const adminCount = () => {
    axios.get(`${API_URL}/auth/admin_count`)
      .then(result => {
        if (result.data.Status) {
          setAdminTotal(result.data.admin); 
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  const employeeCount = () => {
    axios.get(`${API_URL}/auth/employee_count`)
      .then(result => {
        if (result.data.Status) {
          setEmployeeTotal(result.data.employee); 
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  const salaryCount = () => {
    axios.get(`${API_URL}/auth/salary_count`)
      .then(result => {
        if (result.data.Status) {
          setSalaryTotal(result.data.salary); 
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
     <div>
      <div className='p-3 justify-content-around d-flex mt-3'>
        <div className='px-3 pt-2 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <div>
            <h4>Admin</h4>
            </div>
            <hr/>
            <div>
              <h5>Total:{adminTotal}</h5>
            </div>
          </div>
          </div>
          <div className='px-3 pt-2 border w-25'>
          <div className='text-center pb-1'>
            <div>
            <h4>Employees</h4>
            </div>
            <hr/>
            <div>
              <h5>Total:{employeeTotal}</h5>
            </div>
          </div>
          </div>
          <div className='px-3 pt-2 border w-25'>
          <div className='text-center pb-1'>
            <div>
            <h4>Salary</h4>
            </div>
            <hr/>
            <div>
              <h5>Total:{salaryTotal}</h5>
            </div>
          </div>
          </div>
          
        </div>
        <div className='mt-4 px-5 pt-3'>
            <h3>Admin Details</h3>
          <table className='table'>
            <thead>
              <tr>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                {
                  admins.map(a => (
                    <tr>
                      <td>{a.email}</td>
                      <td>
                      <Link to={`/dashboard/edit_adminpass/ `+a.id} className='btn btn-warning btn-sm me-2'>Update Password</Link>
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

export default Home