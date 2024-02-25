import React, { useContext } from "react";
import { Link, useNavigate} from "react-router-dom";
import Swal from 'sweetalert2'
import { Contentapi } from "./Contentapi";

function AdSidebar() {
  const {loginname,setloginname}=useContext(Contentapi)
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
        <>
        
        <div id="admin">
        <div className='sidebar p-2 pt-4 bg-white sidebar-admin' >       
         <div className='m-2'>           
          {/* <i className='bi bi-bootstrap-fill me-3 fs-4'></i>            */}
           <span className='brand-name fs-4 '>Season kreation</span>        
           </div>      
             <hr className='text-dark' />       
              <div className='list-group list-group-flush'>          
                <Link to={'/dashboard'} className='list-group-item  py-2'>              
                  <i className='bi bi-speedometer2 fs-5 me-5'></i>               
                   <span >Dashboard</span>           
                    </Link>           
                     <Link to={'/banner'} className='list-group-item py-2 '>     
                     <i class="bi bi-command fs-5 me-3"></i>          
                                    
                      <span>Banner change </span>            
                      </Link>            
                      <Link to={'/adminpdt'} className='list-group-item py-2'>                
                      <i className='bi bi-table fs-5 me-3'></i>                
                      <span >Products</span>            
                      </Link>           
                       <Link  to={'/ordershow'} className='list-group-item py-2'>                 
                       <i className='bi bi-clipboard-data fs-5 me-3'></i>                <span >Orders</span>           
                        </Link>           
                         <Link  to={'/subcribes'} className='list-group-item py-2'>               
                          <i className='bi bi-people fs-5 me-3'></i>               
                           <span >Customers</span> 
                            </Link>           
                             <Link to={''} className='list-group-item py-2' onClick={Logoutalert}>                
                             <i className='bi bi-power fs-5 me-3'></i>                <span >Logout</span>            
                             </Link>       
                              </div> 
                             
                               </div>
                               
                               
                               </div>
        </>
     );
}

export default AdSidebar;