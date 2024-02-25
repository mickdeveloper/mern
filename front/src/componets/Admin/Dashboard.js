

import AdminH from "./AdminH";
import React, { useState } from "react";
import AdSidebar from "./AdSidebar";

function Dashboard() {
    const [toggle, setToggle] = useState(true)
    const Toggle = () => {
        setToggle(!toggle)
    }
    
    return (
        <>
        
            <div className='container-fluid bg-primary min-vh-100 '>
           
                <div className='row '>
                    {toggle && <div className='col-4 col-md-2  vh-100  bg-white' >
                    <AdSidebar/>
                        </div>}            
                    {toggle && <div className='col-1'></div>}
                    <div className='col'> 
                    <AdminH Toggle={Toggle} />     
                    </div>
                    </div>    
                    </div>
        </>
    );
}

export default Dashboard;