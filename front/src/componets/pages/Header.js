
import { useContext, useState } from 'react';
import './Navbar.css'; // Import your CSS file for styling
import { Modal, ModalBody, ModalHeader, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom';
import { Contentapi } from '../Admin/Contentapi';

const Navbar = () => {
    const [modal, setModal] = useState(false)
    const {cart}=useContext(Contentapi)
    // console.log(cart)
   
  return (
  
  <>
  <nav className = "navbar navbar-expand-lg navbar-light bg-white py-4 fixed-top">
  <div className = 'container'>
    
      <Link className = "navbar-brand d-flex justify-content-between align-items-center order-lg-0" to = '/'>
          <img src = "images/logo-sk.png" alt = "logo icon" />
          <span className = "text-uppercase fw-lighter ms-2"></span>
      </Link>

      <div className = "order-lg-2 nav-btns">
        <Link to={'/cart'}>  
        <button type = "button" className = "btn position-relative">
        <i className="bi bi-cart-fill"></i>
              {/* <i className = "fa fa-shopping-cart"></i> */}
              <span className = "position-absolute top-0 start-100 translate-middle badge bg-primary">{!cart.totalitems?0:cart.totalitems}</span>
          </button></Link>
          <button type = "button" className = "btn position-relative">
          <i className="bi bi-person-circle"></i>
             
          </button>
          {/* <button type = "button" className = "btn position-relative">
              <i className = "fa fa-search"></i>
          </button> */}
      </div>

      <button className = "navbar-toggler border-0" type = "button" data-bs-toggle = "collapse" data-bs-target = "#navMenu">
          <span className = "navbar-toggler-icon"></span>
      </button>

      <div className = "collapse navbar-collapse order-lg-1" id = "navMenu">
          <ul className = "navbar-nav mx-auto text-center">
              <li className = "nav-item px-2 py-2">
                  <Link className = "nav-link text-uppercase text-dark" to = {"/"}>Home</Link>
              </li>
              <li className = "nav-item px-2 py-2">
                  <Link className = "nav-link text-uppercase text-dark" to = {"/pdt"}>collection</Link>
              </li>
              <li className = "nav-item px-2 py-2">
                  <Link className = "nav-link text-uppercase text-dark" to = {"/about"}>About us</Link>
              </li>
              <li className = "nav-item px-2 py-2">
                  <Link className = "nav-link text-uppercase text-dark" to = {"/contact"}>Contact</Link>
              </li>
              <li className = "nav-item px-2 py-2">
                  <Link className = "nav-link text-uppercase text-dark" to ={''}  onClick={() => setModal(true)}>Track Order</Link>
              </li>
             
          </ul>
      </div>
  </div>
</nav>



<Modal
                size="md"
                
                isOpen={modal}
                toggle={() => setModal(!modal)}
                // onClosed={
                //   ()=>{}
                //  }
              >
                <ModalHeader
                  toggle={() => setModal(!modal)}
                  
                >

                Welcome,
               
                </ModalHeader>
                <ModalBody>
                   <div id='reg'>
                <form >
  <h2>Tracking Here</h2>

  {/* <div className="input-container">
  <i class="bi bi-envelope fs-3"></i>
    <input className="input-field" type="text" placeholder="Email" name="email" />
  </div> */}

  <div className="input-container">
  <i class="bi bi-disc fs-3"></i>
    <input className="input-field" type="orderID" placeholder="orderID" name="" />
  </div>

  <button type="submit" className="btn">Find</button>
</form>
</div> 
               
                </ModalBody>
              </Modal>



    

</>
  
  );
  
};

export default Navbar;
