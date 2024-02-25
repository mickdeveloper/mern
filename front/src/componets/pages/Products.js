import { Link } from 'react-router-dom';
import './pdt.css'
import { useEffect, useState } from 'react';
import Navbar from './Header';
function Products() {
    const [product,setproduct]=useState([])
    const [message,setMessage]=useState()
    
    useEffect(()=>{
        fetch('/skapi/showuserpdt').then((result)=>{return result.json()}).then((data)=>{
            if(data.status===200){
              setproduct(data.apiData)
              setMessage(data.message)
            }else{
              setMessage(data.message)
            }
      
           })

    },[product])
    return ( 
        <>
       
          <Navbar/>
          <div className='pt-5'></div>
         <div className = "main-wrapper"  id='pdt'>
        <div className = "container">
            <div className = "title">
                <h1>New Collection  </h1>
            </div>

            <div className = "product-grid py-2 ">
           
            {product?.map((result)=>( 

                <>
                 <div className = "product">
                 <div className = "product-img">
                        <img src = {`/upload/${result.image2}`} alt = "product" className='sss' />
                        <img src = {`/upload/${result.image}`}  alt = "product2" className = "rear-img" />
                    </div>
                    <div className = "product-info">
                        <div>
                            <span className = "product-name">{result.pdtname}</span>
                            <br></br>
                            <span className = "product-price" >$ {result.price}</span>
                
                        </div>
                        <Link to ={`/pdtdeatils/${result._id}`} className = "product-btn mt-3">Buy now</Link>
                    </div>
                    </div>
                </>
            ))}
                   
                    
                
            {/* <div className = "product">
                    <div className = "product-img">
                        <img src = "images/pc1.jpg" alt = "product" className='sss' />
                        <img src = "images/pc2.png" alt = "product2" className = "rear-img" />
                    </div>
                    <div className = "product-info">
                        <div>
                            <span className = "product-name">Coustom RIng</span>
                            <br></br>
                            <span className = "product-price" >$ 130.00</span>
                
                        </div>
                        <Link to ={'/pdtdeatils'} className = "product-btn mt-3">Buy now</Link>
                    </div>
                    
                </div>
            <div className = "product">
                    <div className = "product-img">
                        <img src = "images/pc1.jpg" alt = "product" className='sss' />
                        <img src = "images/pc2.png" alt = "product2" className = "rear-img" />
                    </div>
                    <div className = "product-info">
                        <div>
                            <span className = "product-name">Coustom RIng</span>
                            <br></br>
                            <span className = "product-price" >$ 130.00</span>
                
                        </div>
                        <Link to ={'/pdtdeatils'} className = "product-btn mt-3">Buy now</Link>
                    </div>
                    
                </div>
            <div className = "product">
                    <div className = "product-img">
                        <img src = "images/pc1.jpg" alt = "product" className='sss' />
                        <img src = "images/pc2.png" alt = "product2" className = "rear-img" />
                    </div>
                    <div className = "product-info">
                        <div>
                            <span className = "product-name">Coustom RIng</span>
                            <br></br>
                            <span className = "product-price" >$ 130.00</span>
                
                        </div>
                        <Link to ={'/pdtdeatils'} className = "product-btn mt-3">Buy now</Link>
                    </div>
                    
                </div> */}

              
               
               

               </div>

               

               

               

              
        </div>
    </div>
        </>
     );
}

export default Products;