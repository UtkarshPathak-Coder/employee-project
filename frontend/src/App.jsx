import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './components/login'
import {BrowserRouter ,Routes, Route} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Home from './components/home'
import Employee from './components/Employee'
import Category from './components/Category'
import Profile from './components/Profile'
import Addcategory from './components/Addcategory'
import Addemployee from './components/Addemployee'
import EditEmployee from './components/EditEmployee'
import EditadminPass from './components/editadminpass'

function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/adminlogin' element={<Login/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}>
        <Route path='' element={<Home/>}></Route>
        <Route path='/dashboard/employee' element={<Employee/>}></Route>
        <Route path='/dashboard/Category' element={<Category/>}></Route>
        <Route path='/dashboard/profile' element={<Profile/>}></Route>
        <Route path='/dashboard/Addcategory' element={<Addcategory/>}></Route>
        <Route path='/dashboard/addemployee' element={<Addemployee/>}></Route>
        <Route path='/dashboard/edit_employee/:id' element={<EditEmployee/>}></Route>
        <Route path='/dashboard/edit_adminpass/:id' element={<EditadminPass/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
   </>
  )
}

export default App
