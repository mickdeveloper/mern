import { useEffect, useState } from 'react';
import './pdt.css'
import { Link } from 'react-router-dom';
function SingleProducts() {
    const[product,setproduct]=useState([])
    const [message,setMessage]=useState()

    useEffect(()=>{
        fetch('/skapi/showusersinglepdt').then((result)=>{return result.json()}).then((data)=>{
            if(data.status===200){
              setproduct(data.apiData)
              setMessage(data.message)
            }else{
              setMessage(data.message)
            }
      
           })

    },[])
    
    return ( 
        <>

<div className = "main-wrapper"  id='pdt'>
        <div className = "container">
            <div className = "title">
                <h1>Single Name Collections</h1>
            </div>

            <div className = "product-grid py-2 ">
            {product?.map((result)=>( <>
          
             <div className = "product">
                    <div className = "product-img">
                    <img src = {`/upload/${result.image}`} alt = "product" className='sss' />
                    <img src = {`/upload/${result.image2}`}  alt = "product2" className = "rear-img" />
                    </div>
                    <div className = "product-info">
                    <div>
                            <span className = "product-name">{result.pdtname}</span>
                            <br></br>
                            <span className = "product-price" >$ {result.price}</span>
                
                        </div>
                        <Link to ={`/singlepdtdeatils/${result._id}`} className = "product-btn mt-3">Buy now</Link>
                    </div>
                    
                </div>
                </>))}
            
           

              
               
               

               </div>

               

               

               

              
        </div>
    </div>
        </>
     );
}

export default SingleProducts;