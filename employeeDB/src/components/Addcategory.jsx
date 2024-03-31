import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal'

const Addcategory = ({ onClose }) =>{
    const [category,setCategory]=useState()
    const navigate=useNavigate()
    const handleSubmit=(e)=>{
        e.preventDefault()
        
        const capitalizedCategory = category.toUpperCase()
        axios.post('http://localhost:3000/auth/Addcategory',{category: capitalizedCategory})
        .then(result=>{
            if(result.data.Status){
                window.location.reload()
            }
            else{
                alert(result.data.Error)
            }
        })
        .catch(err=>console.log(err))
    }
  return (
    <Modal isOpen={true} onRequestClose={onClose} className='w-60 h-60 justify-content-center p-5'>
    <div className='d-flex justify-content-center align-items-center h-75 '>
    <div className='p-5 rounded w-50 border '>
        
        <h2>Add Department</h2>
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label htmlFor='department'><strong>Department:</strong></label>
                <input type='text' name='department'  placeholder='Enter dept. name' onChange={(e)=>setCategory(e.target.value)} className='form-control rounded-0'/>    
            </div> 
            
            
            <button className='btn btn-success w-100 rounded-0'>ADD</button>  
            
        </form>
    </div>
    </div>
    </Modal>
  )
}

export default Addcategory