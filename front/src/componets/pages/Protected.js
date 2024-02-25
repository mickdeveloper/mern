import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Protected(props) {
    const navigate=useNavigate()
    const {SECURE_ADMIN}= props;
    useEffect(()=>{
        let email = localStorage.getItem('email')
        if (!email) {
            navigate('/adminlogin')
            
        }

    },[])
    
    return (
        <>
         <div>
          <SECURE_ADMIN/>
        </div>
        </>
      );
}

export default Protected;