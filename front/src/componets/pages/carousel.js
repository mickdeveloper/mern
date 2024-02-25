import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MyCarousel = () => {
  
  const[showBanner,setbanner]=useState([])
  const[message,setMessage]=useState()

  useEffect(()=>{
    fetch('/skapi/showuserBanner').then((result)=>{return result.json()}).then(
      (data)=>{
        if(data.status===200){
          setbanner(data.apiData)
          }else{
         setMessage(data.message)
     }
  
      }
    )
  
  },[showBanner])

    const settings = {
        dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000, // Set autoplay speed in milliseconds
      
    };
  
    return (
      <div className="overflow-hidden">
       
        <Slider {...settings}>
        {showBanner.map((review) => (
          <>
          <div>
            <img src={`/upload/${review.image}`} style={{width:'100%', }} className='img-bnr' alt="" />
          </div>
          </>
        ))}
          
          {/* <div>
            <img src="images/bn-2.png" style={{width:'100%',}}className='img-bnr' alt="" />
          </div>
          <div>
            <img src="images/bn-1.png"  style={{width:'100%',}} className='img-bnr'alt="" />
          </div> */}
          {/* Add more slides as needed */}
        </Slider>
      </div>
    );
  }
  
  export default MyCarousel;
  


