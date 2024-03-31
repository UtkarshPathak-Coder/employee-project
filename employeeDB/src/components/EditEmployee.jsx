import React, { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const EditEmployee = () => {
    const{id}=useParams()
    const [employee, setEmployee] = useState(
        {
            name: '',
            email: '',
            salary: '',
            address:'',
            category_id: '',
          
        });
        const [category,setCategory]=useState([])
        useEffect(()=>{
            axios.get('http://localhost:3000/auth/Category')
            .then(result=>{
                if(result.data.Status)
                {
                    setCategory(result.data.Result);
                }
                else{
                    alert(result.data.Error)
                }
            }).catch(err=>console.log(err))
            axios.get('http://localhost:3000/auth/employee/'+id)
            .then(result=>{
                setEmployee({
                    ...employee,
                    name:result.data.Result[0].name,
                    email:result.data.Result[0].email,
                    address:result.data.Result[0].address,
                    salary:result.data.Result[0].salary,
                    category_id:result.data.Result[0].department_id,

                })
            }).catch(err=>console.log(err))
            },[])
            const navigate=useNavigate()
    const handleSubmit =(e)=>{
        e.preventDefault();
        axios.put('http://localhost:3000/auth/edit_employee/'+id,employee)
        .then(result=>
            {
                if(result.data.Status){
                    navigate('/dashboard/employee')
                }else{
                    alert(result.data.Error)
                }
            }).catch(err=>console.log(err))
    }
  return (
    <div className='d-flex justify-content-center align-items-center mt-3'>
    <div className='p-3 rounded w-50  border '>

        <h2 className='text-center'>Update Employee Details</h2>
        <form className='row g-1' onSubmit={handleSubmit}>
            <div className='col-12'>
                <label for='inputName' className='form-label'><strong>Name:</strong></label>
                <input type='text' placeholder='enter name' value={employee.name} className='form-control rounded-0' id='inputName' onChange={(e) => setEmployee({ ...employee, name: e.target.value })} />
            </div>
            <div className='col-12'>
                <label for='inputEmail14' className='form-label'><strong>Email:</strong></label>
                <input type='email' placeholder='enter email' value={employee.email}className='form-control rounded-0' id='inputEmail14' autoComplete='off' onChange={(e) => setEmployee({ ...employee, email: e.target.value })} />
            </div>
            
            
            <div className='col-12'>
                <label for='inputSalary' className='form-label'><strong>Salary:</strong></label>
                <input type='text' placeholder='enter salary' value={employee.salary} className='form-control rounded-0' id='inputSalary' onChange={(e) => setEmployee({ ...employee, salary: e.target.value })} />
            </div>
            <div className='col-12'>
                <label for='inputAddress' className='form-label'><strong>Address:</strong></label>
                <input type='text' placeholder='addr' value={employee.address} className='form-control rounded-0' id='inputAddress' onChange={(e) => setEmployee({ ...employee, address: e.target.value })} />
            </div>
            <div className='col-12'>
                <label htmlForfor='category' className='form-label'><strong>Department:</strong></label>
                <select name='category' value={employee.category_id} id='category'  className='form-select' onChange={(e)=>setEmployee({...employee,category_id:e.target.value})} defaultValue={employee.category_id}>
                    {category.map(c => {
                        return <option value={c.id}>{c.name}</option>
                    })}
                </select>
            </div>
           

            <div className='col-12'>
                <button className='btn btn-success w-100 rounded-0'>Update</button>
            </div>
        </form>
    </div>
</div>
  )
}

export default EditEmployee