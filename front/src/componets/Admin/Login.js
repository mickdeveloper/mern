import { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import './admin.css'
// import { Contentapi } from './Admin_dash/Contetnapi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Contentapi } from './Contentapi';
function Login() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const {loginname,setloginname}=useContext(Contentapi)
    const [message,setMessage]=useState('')
       const navigate=useNavigate()

       function handelform(e){
        e.preventDefault()
        const formdata={email,password}
        fetch('/skapi/signin',{
            method:'POST',
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(formdata)
        }).then((result)=>{ return result.json()}).then((data)=>{ 
             console.log(data)
            if(data.result){
                window.localStorage.setItem('email',data.result.email)
                setloginname(window.localStorage.getItem('email'))
               if(data.result.email===email){
                
                Swal.fire({
                    // position: 'top-end',
                    icon: 'success',
                    title: (data.message),
                    showConfirmButton: false,
                    timer: 1500
                  })
                // setMessage(data.message)
                navigate('/dashboard')
               }else{

                navigate('/adminlogin')
                toast('wrong email/password',{
                    position:'top-center',
                    autoClose:2000,
                  });
                setMessage(data.message)
               }
            }else if(data.status===400){
                toast('wrong email/password',{
                    position:'top-center',
                    autoClose:2000,
                  });
                navigate('/adminlogin')
                
                 setMessage(data.message)
            }else {
                toast('wrong email/password',{
                    position:'top-center',
                    autoClose:2000,
                  });
                navigate('/adminlogin')
                setMessage(data.message)
            }
        })

    }   

    return ( 
        <>
        <div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<div class="login100-pic js-tilt" data-tilt>
					<img src="images/logo-sk.png" alt="IMG" />
				</div>

				<form class="login100-form validate-form"  onSubmit={(e)=>{handelform(e)}} >
					<span class="login100-form-title">
						Admin Login 
					</span>

					<div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input class="input100" type="email" name="email" placeholder="Email"  value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>
                       
					<div class="wrap-input100 validate-input" data-validate = "Password is required">
						<input class="input100" type="text" name="pass" placeholder="Password"  
                        value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					
					<div class="container-login100-form-btn">
						<button class="login100-form-btn" onClick={toast}>
							Login
						</button>
                        <ToastContainer/>
					</div>

					<div class="text-center p-t-12">
						<span class="txt1">
                        <Link to={'/adminforgot'}>Forgot? </Link>
						</span>
						{/* <a class="txt2" href="#">
							Username / Password?
						</a> */}
					</div>

					{/* <div class="text-center p-t-136">
						<a class="txt2" href="#">
							Create your Account
							<i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
						</a>
					</div> */}
				</form>
			</div>
		</div>
	</div>
        </>
     );
}

export default Login;