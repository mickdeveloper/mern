import { useEffect, useState } from "react";
import AdSidebar from "./AdSidebar";
import Nav from "./Navbar";
import { Table} from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify';
import  'react-toastify/dist/ReactToastify.css';
import { Paper, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import { Link } from "react-router-dom";

function Subcribes() {
    const columns = [
        { id: 'id', name: 'S.no' },
        { id: 'id', name: 'Email' },
        { id: 'id', name: 'Action',  },
    
      ]
      const [pageIndex,pagechange]=useState(0)
      const [rowperpage,rowperpagechange]=useState(2)
      const handlechangepage=(e,newpage)=>{
     
          pagechange(newpage)
        }
       const  handelrowperpage=(e)=>{
          rowperpagechange(+e.target.value);
          pagechange(0)
      
        }
      const [subemail,setshowsubemail]=useState('')
      const [message,setMessage]=useState('')
      useEffect(() => {
        fetch('/skapi/showsubemails',
          ).then((result)=>{return result.json()}).then((data)=>{
       //  console.log(data)
         if(data.status===200){
           setshowsubemail(data.apiData)
           }else{
            setMessage(data.message)
      }
        })
     }, [subemail]) 
      
     function handledelete(e, id) {
        // Use window.confirm to show a confirmation dialog
         const confirmed = window.confirm("Are you sure you want to delete this data?");
      
        if (confirmed) {
          fetch(`/skapi/adminsubemaildel/${id}`, {
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
      const [toggle, setToggle] = useState(true)
      const notify=toast
    const Toggle = () => {
        setToggle(!toggle)
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
                {subemail && subemail.slice((+pageIndex) *(+rowperpage) ,(+pageIndex)*(+rowperpage) +(+rowperpage)) .map((result,key)=>(
                <TableRow  tabIndex={-1} key={key+1+pageIndex* rowperpage}>


<TableCell>{key+1+ pageIndex* rowperpage}</TableCell>
<TableCell>{result.email} </TableCell>

                   <TableCell  >
                   <Link to={''} className="" onClick={(e)=>{handledelete(e,result._id,toast)}}><i class="bi bi-trash-fill text-danger "></i> </Link> 
                   <ToastContainer/>

                   
                   </TableCell>
                 
                 
                     </TableRow>
                ))}
                 
                


                </TableBody>
                </Table>
              </TableContainer>
              <TablePagination 
              rowPerpageOption={[3,5,10]}
              page={pageIndex}
            
              count={subemail.length}
              
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

export default Subcribes;