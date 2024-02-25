import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import  'react-toastify/dist/ReactToastify.css';
function Footer() {
const [subemail,setsubemail]=useState('')
const notify=toast
    function handelform(e){
        e.preventDefault()
        const formdata={subemail}
        fetch('/skapi/addsubemail',{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(formdata)
            }).then((result)=>{return result.json()}).then((data)=>{
                if (data.status === 200) {
                    toast("Thanks you For Subcribed!. ");
                  } else {
                    toast('opps! somthing went wrong')
                  }
            })

    }
    return ( 
        <>
        <footer className="footer-section" id="ft">
        <div className='whatsapp'>
      <Link to={'https://wa.me/919782285437?text=I want to inquire...'} target='_blank'   className="wtp">
       {/* <img src='images/whatsapp.jpg' width={'50'} alt='chat_us'/> */}
       <i class="bi bi-whatsapp"></i>
      </Link>

    </div>
        <div className="container">
            <div className="footer-cta pt-5 pb-5">
                <div className="row">
               
                    <div className="col-xl-4 col-md-4 mb-30 ">
                    <div className="single-cta d-flex">
                    <i className="bi bi-geo-alt-fill text-danger "></i>
                            <div className="cta-text">
                         
                                <h4>Find  us</h4>
                                <span>S-15
Near Care Bear School,Amritpuri Ghat Gate Jaipur 302003</span>
                            </div>
                        </div>
                        
                    </div>
                    <div className="col-xl-4 col-md-4 mb-30">
                        <div className="single-cta">
                        <i className="bi bi-telephone-fill"></i>
                            <div className="cta-text">
                                <h4>Call us</h4>
                                <span>9876543210 0</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-4 mb-30">
                        <div className="single-cta">
                        <i className="bi bi-envelope-heart"></i>
                            <div className="cta-text">
                                <h4>Mail us</h4>
                                <span>mail@info.com</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-content pt-5 pb-5">
                <div className="row">
                    <div className="col-xl-4 col-lg-4 mb-50">
                        <div className="footer-widget">
                            <div className="footer-logo">
                                <Link to='/'><img src="images/logo-sk.png" className="img-fluid" alt="logo" /></Link>
                            </div>
                            <div className="footer-text">
                                <p>We understand that you don’t want to take our jewelry off. So keeping that in mind we provide the best quality plating.</p>
                            </div>
                            <div className="footer-social-icon">
                                <span>Follow us</span>
                                <div className="d-flex">
                               <div className="icon-round"> <Link to='https://www.instagram.com/seasonskreation?igsh=d3VpOHNlaWNxN3Bo' target="_blank"><i className="bi bi-instagram"></i></Link></div> 
                               <div className="icon-round">   <Link to="#"> <i className="bi bi-twitter-x"></i></Link> 
                               </div>
                               <div className="icon-round">    <Link to='https://www.facebook.com/profile.php?id=100082598016173&mibextid=ZbWKwL' target="_blank">
                                <i className="bi bi-facebook"></i>
                                    </Link></div>
                                    <div className="icon-round">  <Link to="#"><i className="bi bi-youtube"></i>   </Link></div>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                        <div className="footer-widget">
                            <div className="footer-widget-heading">
                                <h3>Useful Links</h3>
                            </div>
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/about">About</Link></li>
                                <li><Link to="/pdt">Collection</Link></li>
                             
                                <li><Link to="/contact">Contact</Link></li>

                                <li> 
                                     <object data="images/ppay.svg" width="60" height="60"> </object>
                                <object data="images/visa.svg" width="60" height="60"> </object>
                               
                                </li>
                                <li>
                                <object data="images/paytam.svg" width="60" height="60"> </object>
                               
                               
                                 </li>
                                <li>  </li>
                               
                               
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
                        <div className="footer-widget">
                            <div className="footer-widget-heading">
                                <h3>Subscribe</h3>
                            </div>
                            <div className="footer-text mb-25">
                                <p>Don’t miss to subscribe to our new feeds & know about exclusive offers, latest collection trends!
                                    </p>
                            </div>
                            <div className="subscribe-form">
                                <form onSubmit={(e) => { handelform(e) }}>
                        <input type="email" onChange={(e)=>setsubemail(e.target.value)} placeholder="Email Address"  required/>
                                    <button onClick={notify}><i className="bi bi-send-fill"></i></button>
                                    
                                </form>
                                <ToastContainer  style={{position:"top-center"}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="copyright-area">
            <div className="container">
                
                <div className="row">
                    <div className="col-xl-6 col-lg-6 text-center text-lg-left">
                        <div className="copyright-text">
                            <p>Copyright &copy; 2023, All Right Reserved <Link to={"/"}></Link></p>
                        </div>  
                    </div>
                    <div className="col-xl-6 col-lg-6 d-none d-lg-block text-right">
                        <div className="footer-menu">
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/">Terms</Link></li>
                                <li><Link to="/">Privacy</Link></li>
                                <li><Link to="/">Policy</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
        </>
     );
}

export default Footer;