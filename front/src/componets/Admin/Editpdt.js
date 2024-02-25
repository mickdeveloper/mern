import { useEffect, useState } from "react";
import AdSidebar from "./AdSidebar";
import Nav from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';

function Editpdt() {
    const notify = toast
    const {id}=useParams()
const navigate=useNavigate()
const  [pdtname,setpdtname]=useState('')
const  [price,setprice]=useState('')
const  [message,setMessage]=useState('')
const  [image,setimage]=useState('')
const  [image2,setimage2]=useState('')
const [pcname,setnamec]=useState('')
const [status,setStatus]=useState('')
const [ptdshow,setPdtshow]=useState([])
    const [toggle, setToggle] = useState(true)
    const Toggle = () => {
        setToggle(!toggle)
    }

    useEffect(()=>{
        fetch(`/skapi/singlepddata/${id}`).then((result)=>{return result.json()}).then((data)=>{
          if(data.status===200){
          setpdtname(data.apiData.pdtname)
          setprice(data.apiData.price)
          setStatus(data.apiData.status)
          setimage(data.apiData.image)
          setimage2(data.apiData.image2)
          setnamec(data.apiData.pcname)
          
    
          }else{
            setMessage('error fff')
            
          }
        })},[ptdshow])

    function handleimage(e) {
        setimage(e.target.files[0])
        
    }
    function handleimage2(e){
        setimage2(e.target.files[0])
    }

    function handleform(e){
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('pdtname', pdtname)
        formdata.append('price', price)
        formdata.append('st', status)
        formdata.append('image', image);
        formdata.append('image2', image2);
        formdata.append('pcname', pcname);
        fetch(`/skapi/productupdate/${id}`,{
            method: 'PUT',
            body: formdata
        }).then((result) => { return result.json() }).then((data) => {
            console.log(data)
            if (data.apiData) {
                toast("Successfully update.");
                //navigate('/addcareer')
            } else {
                toast("update failed.");
            }
        })
    }
    return ( 
        <>
         <div className='container-fluid bg-primary min-vh-100 '>
           
           <div className='row '>
               {toggle && <div className='col-4 col-md-2  vh-100  bg-white' >
               <AdSidebar/>
                   </div>}            
               {toggle && <div className='col-1'></div>}
               <div className='col'> 
               <Nav Toggle={Toggle} />  
               <h3 className="text-center text-white pt-2 shadow-sm p-3 ">Edit Product Deatils Here</h3>  
               <div className="container-fluid">
            <div id="service-update" className="sado mt-4 p-3">
                            <h2 className="text-center"> Product Update Here</h2>
                            <div className="row  mt-3">
                                <div style={{ 'width': '100%' }} className="ms-auto" id="form-edit">
                                    <div class="container">
                                    <form onSubmit={(e)=>{handleform(e)}}>
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <label>
                                                    Product Name:
                                                    <input type="text"
                                                        value={pdtname} onChange={(e) => { setpdtname(e.target.value) }}
                                                        className="form-control" />
                                                </label>
                                            </div>
                                            <div class="col-sm-6">
                                                <label>
                                                    Product Price :
                                                    <input type="text"
                                                        value={price} onChange={(e) => { setprice(e.target.value) }}
                                                        className="form-control" 
                                                         />
                                                </label>
                                            </div>
                                            
                                            <div class="col-sm-6">

                                                <label className="form-label" >
                                                    Product Image-1:
                                                    
                                         <input type="file" 
                                                 
                                                   accept="image/*"
                                                   onChange={handleimage}
                                                    className="form-control" />
                                                    {/* <img style={{ width: '100px', 'marginTop':'10px' }} src={`/upload/${image}`} alt="" /> */}
                                                </label>
                                            </div>
                                            <div class="col-sm-6">

                                                <label className="form-label" >
                                                    Product Image-2:
                                                    
                                         <input type="file" 
                                                 
                                                   accept="image/*"
                                                   onChange={handleimage2}
                                                    className="form-control" />
                                                    {/* <img style={{ width: '100px', 'marginTop':'10px' }} src={`/upload/${image2}`} alt="" /> */}
                                                </label>
                                            </div>
                                            <div className="col-sm-6 mb-2">
                                                <label for="status">Choose Status:

                                                    <select className="form-select form"  value={status}  onChange={(e)=>{setStatus(e.target.value)}}>
                                                        <option value="Active"  >Active</option>
                                                        <option value="Inactive">Inactive</option>
                                                    </select>
                                                </label>
                                            </div>
                                            <div className="col-sm-6 mb-2">
                                                <label for="status">Choose Category:

                                                    <select className="form-select form"  value={pcname}  onChange={(e)=>{setnamec(e.target.value)}}>
                                                        <option value="singlename"  >Single Name</option>
                                                        <option value="dualname">Dual Name</option>
                                                    </select>
                                                </label>
                                            </div>
                                            <div class="col-sm-6">
                                            <button className="form-control btn btn-success" onClick={notify}>Update</button>
    <ToastContainer  style={{position:"top-center"}}/>
                                            </div>
                                         
                                           
                                        </div>
                                  
                                        </form></div>
                                </div>
                            </div>
                        </div>
         
                        </div> 
               </div>
               </div>    
               </div>
        </>
     );
}

export default Editpdt;