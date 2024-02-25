import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './componets/Home';
import {BrowserRouter as Router ,Route ,Routes } from 'react-router-dom'
import Products from './componets/pages/Products';
import Footer from './componets/pages/Footer';
import Cdt from './componets/pages/Cdt';
import Pdtdeatils from './componets/pages/pdtdeatils';
import Adminreg from './componets/Admin/AdminReg';
import { useState } from 'react';
import { Contentapi } from './componets/Admin/Contentapi';
import Login from './componets/Admin/Login';
import AdSidebar from './componets/Admin/AdSidebar';
import Dashboard from './componets/Admin/Dashboard';
import AdminH from './componets/Admin/AdminH';
import AdBanner from './componets/Admin/AdBanner';
import Adminpdt from './componets/Admin/Admindpdt';
import Editpdt from './componets/Admin/Editpdt';
import AddToCartButton from './componets/pages/AddToCartButton';

import ShoppingCart from './componets/pages/Cart';
import Navbar from './componets/pages/Header';
import Forgot from './componets/Admin/Forgot';
import Newpass from './componets/Admin/Newpass';
import Shipping from './componets/pages/Shipping';
import Singlepdtdeatils from './componets/pages/Singlepdtdeatils';
import Protected from './componets/pages/Protected';
import Subcribes from './componets/Admin/Subcribes';
import OrderShow from './componets/Admin/OrderShow';
import About from './componets/pages/About';


function App() {
  const [cart,setcart]=useState('')
  const [loginname,setloginname]=useState(window.localStorage.getItem('email'))
  const [cstmname,setctmname]=useState(null)
  const [productDetails,setProductDetails]=useState([])
//   const [dualname2,setctdualname2]=useState(null)
  return (
   <>
   <Router>
   <Contentapi.Provider value={{loginname,setloginname,cart,setcart,cstmname,setctmname,productDetails,setProductDetails}}>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/pdt' element={<Products/>}></Route>
     

      <Route path='/footer' element={<Footer/>}></Route>
      <Route path='/headers' element={<Navbar/>}></Route>
      <Route path='/contact' element={<Cdt/>}></Route>
      <Route path='/pdtdeatils/:id' element={<Pdtdeatils  />}></Route>
      <Route path='/singlepdtdeatils/:id' element={<Singlepdtdeatils  />}></Route>

      <Route path='/adminreg' element={<Adminreg/>}></Route>
      <Route path='/adminlogin' element={<Login/>}></Route>
      <Route path='/adminforgot' element={<Forgot/>}></Route>
      <Route path='/newpass/:user_email' element={<Newpass/>}></Route>
      <Route path='/about' element={<About/>}></Route>



<Route path='/adminsidebar' element={< Protected SECURE_ADMIN={  AdSidebar}/>}></Route>
      <Route path='/dashboard' element={< Protected SECURE_ADMIN={  Dashboard }/>}></Route>
      <Route path='/adminh' element={< Protected SECURE_ADMIN={   AdminH} />}></Route>
      <Route path='/banner' element={< Protected SECURE_ADMIN={ AdBanner}/>}></Route>
      <Route path='/adminpdt' element={< Protected SECURE_ADMIN={Adminpdt}/>}></Route>
      <Route path='/editpdt/:id' element={< Protected SECURE_ADMIN={Editpdt}/>}></Route>
      <Route path='/subcribes' element={< Protected SECURE_ADMIN={Subcribes}/>}></Route>
      <Route path='/addtocart' element={< AddToCartButton/>}></Route>
      <Route path='/cart' element={<ShoppingCart />}></Route>
      <Route path='/checkout' element={<Shipping/>}></Route>
      <Route path='/ordershow' element={<  Protected SECURE_ADMIN={OrderShow}/>}></Route>

    
      
      
   
    </Routes>
    </Contentapi.Provider>
   </Router>

   </>
  );
}

export default App;
