import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Contentapi } from './Contentapi'
import Swal from 'sweetalert2'




function Nav({Toggle}) {  
    const{loginname,setloginname}=useContext(Contentapi)
    const navigate=useNavigate()
    const Logoutalert=()=>{
  
        Swal.fire({
            title: 'Logout?',
            text: "Are you Sure Want to logout!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
           
          }).then((result) => {
            
            if (result.isConfirmed) {
              Swal.fire(
                'Logout!',
                'Logout Successfully .',
                'success'
              )
      
              window.localStorage.removeItem('email')
            setloginname(window.localStorage.getItem('email'))
      
            navigate('/adminlogin')
            }else{
              navigate('/dashboard')
            }
          })
         
      }
    
    
    return (        
    <nav className="navbar navbar-expand-sm navbar-dark bg-transparent">
         <i className="navbar-brand bi bi-justify-left fs-4" onClick={Toggle}></i>            
         <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation"><i className='bi bi-justify'></i></button>            
         <div className="collapse navbar-collapse" id="collapsibleNavId">                <ul className="navbar-nav ms-auto mt-2 mt-lg-0">                 
         <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle text-white" to="#" id="dropdownId"  
             data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{loginname} </Link>
            <div className="dropdown-menu" aria-labelledby="dropdownId">  
            <Link className="dropdown-item" to="#">Profile</Link>  
            <Link className="dropdown-item" to="#">Setting</Link>  
                                     
            <Link className="dropdown-item"  onClick={Logoutalert}>Logout</Link>
            </div>      
            </li>                
            </ul>           
             </div>       
              </nav>  
              )}
export default Nav