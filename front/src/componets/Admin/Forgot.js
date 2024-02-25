import { useState } from 'react';
import './admin.css'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Forgot() {
    const navigate=useNavigate()
    const [email,setEmail]=useState('')
    function handelform(e){
        e.preventDefault()
        const formdata={email}
        console.log(formdata)
       
        fetch('/skapi/forgotpasslinksend',{
            method:'POST',
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(formdata)
        })
        .then((result)=>{ return result.json()}).then((data)=>{
            if (data.status===200){
                
                toast('succesfully Sent A link your Email pls check',{
                              position:'top-center',
                                autoClose:2000,
                            
                                
                            })

            }else if (data.status===400){
                toast((data.message),{
                    position:'top-center',
                      autoClose:2000,
                      
                  })
               
                navigate('/adminforgot')
            }else if(data.status===401){
                toast((data.message),{
                    position:'top-center',
                      autoClose:2000,
                      
                  })
               
                navigate('/adminforgot')
            }else{
                toast('eror',{
                    position:'top-center',
                      autoClose:2000,
                      
                  })
                          }
         })
        
    }
    return ( 
        <>
        <div className="limiter">
		<div className="container-login100">

			<div className="wrap-login100">
           
				<div className="login100-pic js-tilt" data-tilt>
					<img src="images/img-01.png" alt="IMG" />
				</div>
      
				<form className="login100-form validate-form"  onSubmit={(e)=>{handelform(e)}} >
					<span className="login100-form-title">
					Please Enter your email
					</span>

					<div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input className="input100" type="email" name="email" placeholder="Email"  value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>

					
					<div className="container-login100-form-btn">
						<button className="login100-form-btn" onClick={toast}>
							Send Link
						</button>
                        <ToastContainer/>
					</div>

					<div className="text-center p-t-12">
						<span className="txt1">
                        <Link to={'/adminlogin'}>Login ? </Link>
						</span>

					</div>

					{/* <div className="text-center p-t-136">
						<a className="txt2" href="#">
							Create your Account
							<i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
						</a>
					</div> */}
				</form>
			</div>
		</div>
	</div>
        </>
     );
}

export default Forgot;