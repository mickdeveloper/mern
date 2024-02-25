import {useState} from 'react'
import './admin.css'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Adminreg() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [message,setMessage]=useState('')


    function handelform(e){
        e.preventDefault()
        const formdata={email,password}
       
        fetch('/skapi/signup',{
            method:'POST',
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(formdata)
        }).then((result)=>{ return result.json()}).then((data)=>{
            console.log(data)
            if(data.result){
                toast('Congrts ! succesfully Registered',{
                    position:'top-center',
                    autoClose:2000,
                  });

            }else{
                toast('oops ! got error ..try agian ',{
                    position:'top-center',
                    autoClose:2000,
                  });

            }

        })
    }
    return (
        <>
        
         <div class="limiter">
		<div class="container-login100">

			<div class="wrap-login100">
           
				<div class="login100-pic js-tilt" data-tilt>
					<img src="images/img-01.png" alt="IMG" />
				</div>
      
				<form class="login100-form validate-form"  onSubmit={(e)=>{handelform(e)}} >
					<span class="login100-form-title">
					Welcome ,Sk Register Here
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
							Register
						</button>
                        <ToastContainer/>
					</div>

					<div class="text-center p-t-12">
						<span class="txt1">
                        <Link to={'/adminlogin'}>Login ? </Link>
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

export default Adminreg;