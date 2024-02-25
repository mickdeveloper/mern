import { useEffect, useState } from "react"
import AdSidebar from "./AdSidebar"
import Nav from "./Navbar"
import { Table} from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify';
import  'react-toastify/dist/ReactToastify.css';
import { Paper, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import { Link } from "react-router-dom";
function OrderShow() {

    const columns = [
        { id: 'id', name: 'S.no' },
        { id: 'id', name: 'Order ID' },
        { id: 'id', name: 'Purchase Date'},
        { id: 'id', name: 'Amount ' },
        { id: 'id', name: 'Payment Status'},
        { id: 'id', name: 'Amount Paind on '},
        { id: 'id', name: 'Action'},
    
      ]


      const [pageIndex,pagechange]=useState(0)
      const [rowperpage,rowperpagechange]=useState(6)
      const handlechangepage=(e,newpage)=>{
     
          pagechange(newpage)
        }
       const  handelrowperpage=(e)=>{
          rowperpagechange(+e.target.value);
          pagechange(0)
      
       }
       const notify=toast
       const [toggle, setToggle] = useState(true)
       const [ordershow,setordershow]=useState('')
       const [message,setMessage]=useState('')
       const Toggle = () => {
        setToggle(!toggle)
    }
    useEffect(()=>{
        fetch('/skapi/showorders',
        ).then((result)=>{return result.json()}).then((data)=>{
     //  console.log(data)
       if(data.status===200){
         setordershow(data.apiData)
         }else{
          setMessage(data.message)
    }
      })
    },[ordershow])

    
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
                {ordershow && ordershow.slice((+pageIndex) *(+rowperpage) ,(+pageIndex)*(+rowperpage) +(+rowperpage)) .map((result,key)=>(
                <TableRow  tabIndex={-1} key={key+1+pageIndex* rowperpage}>


<TableCell>{key+1+ pageIndex* rowperpage}</TableCell>
<TableCell>{result.orderId} </TableCell>
<TableCell>{result.purchaseDate} </TableCell>
<TableCell>{result.amount} </TableCell>
<TableCell>{result.paymentStatus} </TableCell>
<TableCell>{result.amountPaidOn} </TableCell>


                   {/* <TableCell  >
                   <Link to={''} className="" onClick={(e)=>{handledelete(e,result._id,toast)}}><i class="bi bi-trash-fill text-danger "></i> </Link> 
                   <ToastContainer/>

                   
                   </TableCell> */}
                 
                 
                     </TableRow>
                ))}
                 
                


                </TableBody>
                </Table>
              </TableContainer>
              <TablePagination 
              rowPerpageOption={[2,5,10]}
              page={pageIndex}
            
              count={ordershow.length}
              
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

export default OrderShow;