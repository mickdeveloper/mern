import { useEffect, useState } from "react";
import AdSidebar from "./AdSidebar";
import AdminH from "./AdminH";
import Nav from "./Navbar";
import { Modal, ModalBody, ModalHeader, Row ,Col, Table} from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify';
import  'react-toastify/dist/ReactToastify.css';
import { Paper, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import { Link } from "react-router-dom";

function AdBanner() {
    const columns = [
        { id: 'id', name: 'S.no' },
        { id: 'id', name: 'Banner Image ' },
        { id: 'id', name: 'Status' },
        { id: 'id', name: 'Action',  },
    
      ]
    const [modal, setModal]=useState(false)
    const [toggle, setToggle] = useState(true)
    const [image, setimage] = useState('')
    const [message ,setMessage]=useState('')
    const [Banner ,setshowBanner]=useState([])
    const notify=toast
    const Toggle = () => {
        setToggle(!toggle)
    }
    const [pageIndex,pagechange]=useState(0)
    const [rowperpage,rowperpagechange]=useState(2)
    const handlechangepage=(e,newpage)=>{
   
        pagechange(newpage)
      }
     const  handelrowperpage=(e)=>{
        rowperpagechange(+e.target.value);
        pagechange(0)
    
      }

    function handeladdform(e) {
        e.preventDefault()
        
        // setimage('')
        
    
        const formdata =
          new FormData();
        formdata.append('image', image);
        
        //  console.log(image)
        fetch('/skapi/addbanner', {
          method: 'POST',
          body: formdata,
        }).then((result) => { return result.json() }).then((data) => {
          if (data.status === 200) {
            toast("Successfully Banner added. ");
          } else {
            toast('opps! somthing went wrong')
          }
        })
      }

      useEffect(() => {
        fetch('/skapi/showbanner',
          ).then((result)=>{return result.json()}).then((data)=>{
       //  console.log(data)
         if(data.status===200){
           setshowBanner(data.apiData)
           }else{
            setMessage(data.message)
      }
        })
     }, [Banner]) 
     
     function handledelete(e, id) {
        // Use window.confirm to show a confirmation dialog
         const confirmed = window.confirm("Are you sure you want to delete this data?");
      
        if (confirmed) {
          fetch(`/skapi/adminbannerdel/${id}`, {
            method: "DELETE",
          }).then((result) => {
              return result.json();
            })
            .then((data) => {
              if (data.status === 200) {
                toast("Successfully Deleted", {
                  position: "top-center",
                  autoClose: 2000,
                });
              } else {
                toast("Try Again", {
                  position: "top-center",
                  autoClose: 2000,
                });
              }
            });
        } else {
          // User canceled the deletion
          // You can add code to handle the cancellation here if needed
        }
      } 

      function handleToggle(e, id, currentStatus) {
        e.preventDefault();
    
        const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    
        fetch(`/skapi/adminbannertoggle/${id}/${newStatus}`, {
          method: 'PUT',
        })
          .then((result) => {return result.json()})
          .then((data) => {
            console.log(data)
            if (true) {
              toast(`Successfully  to ${newStatus}`, {
                position: 'top-center',
                autoClose: 2000,
              });
  
            } else {
              toast('Try Again', {
                position: 'top-center',
                autoClose: 2000,
              });
            }
          });
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
               <Modal
size='lg'
isOpen={modal}
toggle={()=>setModal(!modal)}
// onClosed={
//  ()=>{setproductlink('') ;setproductname('')}
// }

>
  <ModalHeader
     toggle={()=>setModal(!modal)}
  >
     <button type="button" className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={()=>setModal(false)} >
            <span aria-hidden="true" className='ms-auto'>&times;</span></button>
    Add Banner
  
  </ModalHeader>
  <ModalBody>
   
  <form  onSubmit={(e) => { handeladdform(e) }}>
        <Row>
          
         
           <Col lg={12}>
            <div>
            <label htmlFor="product img" className="form-label">Banner image*</label>
            <input type="file"  accept="image/*" onChange={(e) => { setimage(e.target.files[0]) }}  className="form-control" placeholder="upload Here"/>
            </div>
          </Col> 
               
        </Row> 
        <button className="btn btn-danger mt-2" onClick={notify}>Submit</button>
        <ToastContainer  style={{position:"top-center"}}/>
      </form>
  </ModalBody>
</Modal> 
<button className="btn btn-warning  mt-2 add-pdt" onClick={()=>setModal(true)}>Add Banner </button>

<Paper sx={{ width: '100%', marginTop:'50px', minHeight:'300px'}}>
              <TableContainer>
                <Table>
                
                  <TableHead className="table table-hover">
                    <TableRow>
                      {columns && columns.map((column) => (
                        <TableCell className="fw-bold" key={column.id}>{column.name}

                        </TableCell>
                      ))}

                    </TableRow>
                </TableHead>
                <TableBody>
                {Banner && Banner.slice((+pageIndex) *(+rowperpage) ,(+pageIndex)*(+rowperpage) +(+rowperpage)) .map((result,key)=>(
                <TableRow  tabIndex={-1} key={key+1+pageIndex* rowperpage}>


<TableCell>{key+1+ pageIndex* rowperpage}</TableCell>



<TableCell> <img src={`/upload/${result.image}`} alt="img"  width={100} height={50}></img></TableCell>


<TableCell>
{result.status=="Inactive" ?
          <span className="text-warning">{result.status} </span>
          :
                  <span className="text-success">{result.status} </span>
        }
  
   </TableCell>
   <TableCell>
                <button
                  className={`btn ${
                    result.status === 'Inactive' ? 'btn-success' : 'btn-danger'
                  }`}
                  onClick={(e) => handleToggle(e, result._id, result.status)}
                >
                  {result.status === 'Inactive' ? 'Activate' : 'Deactivate'}
                </button>
              </TableCell>
                   <TableCell  >
                   <Link to={''} className="" onClick={(e)=>{handledelete(e,result._id,toast)}}><i class="bi bi-trash-fill text-danger "></i> </Link> 
                   <ToastContainer/>

                   {/* <Link className="" to={`/editservice/${result._id}`}> <i class="fa-solid fa-pen-to-square"></i> </Link> */}
                   
                   </TableCell>
                 
                 
                     </TableRow>
                ))}
                 
                


                </TableBody>
                </Table>
              </TableContainer>
              <TablePagination 
              rowPerpageOption={[3,5,10]}
              page={pageIndex}
            
              count={Banner.length}
              
              rowsPerPage={rowperpage}
              component='div'
              onPageChange={handlechangepage}
              onRowsPerPageChange={handelrowperpage}
               >

              </TablePagination>
             
            </Paper>
               
               </div>
               </div>    
               </div>
        </>
     );
}

export default AdBanner;