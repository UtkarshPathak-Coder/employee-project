import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Modal from 'react-modal'
import Addcategory from './Addcategory'

const Category = () => {
    const [category,setCategory]=useState([])
    const [showmodal,setshowModal]=useState(false);
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
    },[])
  return (
    <div className='px-5 mt-3'> 
    <div className='d-flex justify-content-center'>
        <h3>Department List</h3>
    </div>
    <button onClick={()=>setshowModal(true)} className='btn btn-success'>Add Department</button>
            {showmodal && <Addcategory onClose={()=>setshowModal(false)}/>}
        <div className='mt-3 '>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Department Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        category.map(c=> (
                            <tr>
                                <td>{c.name}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Category