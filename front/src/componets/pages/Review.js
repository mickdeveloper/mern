import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { Modal, ModalBody, ModalHeader, Row ,Col, } from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// const productReviews = [
//   {
//     id: 1,
//     image: 'images/pc5.jpg',
//     comment: 'sss',
//     buyerName: 'John Doe',
//   },
//   {
//     id: 4,
//     image: 'images/pc5.jpg',
//     comment: 'This product is amazing! I love it!',
//     buyerName: 'John Doe',
//   },
//   {
//     id: 5,
//     image: 'images/pc5.jpg',
//     comment: 'This product is amazing! I love it!',
//     buyerName: 'John Doe',
//   },
//   {
//     id: 6,
//     image: 'images/pc5.jpg',
//     comment: 'This product is amazing! I love it!',
//     buyerName: 'John Doe',
//   },
//   {
//     id: 2,
//     image: 'images/pc5.jpg',
//     comment: 'Great quality and fast delivery.',
//     buyerName: 'Jane Smith',
//   },
//   {
//     id: 3,
//     image: 'images/pc5.jpg',
//     comment: 'I highly recommend this product!',
//     buyerName: 'Alice Johnson',
//   },
// ];

const ProductReviewCarousel = () => {
  const [modal, setModal]=useState(false)

  const [image, setimage] = useState('')
  const [txtarea, setTextarea] = useState('')
  const [pdtname, setpdtname] = useState('')
  const[productReviews,setshowreview]=useState([])


  function handeladdform(e) {
    e.preventDefault()

    setimage('')
    setTextarea('')
    setpdtname('')
   
    const formdata =
      new FormData();
    formdata.append('image', image);
    formdata.append('text', txtarea);
    formdata.append('pname', pdtname);
    //  console.log(image)
    fetch('/skapi/addreview', {
      method: 'POST',
      body: formdata,
    }).then((result) => { return result.json() }).then((data) => {
      if (data.status === 200) {
        toast("Successfully submited Your Review. after 24hrs your Reviwe will be Published");
       
      } else {
        toast('opps! somthing went wrong')
      }
    })
  }
 

  useEffect(() => {
    fetch('/skapi/showalluserreview',
      ).then((result)=>{return result.json()}).then((data)=>{
   //  console.log(data)
     if(data.status===200){
       setshowreview(data.apiData)
       }else{
      toast(data.message)
  }
    })
 }, [productReviews])

 
  const settings = {
    
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000, // Set autoplay speed in milliseconds
    arrow:true,
    
  };

  return (
    <>
    <div className="product-review-carousel overflow-hidden border pt-3 mt-2 pb-4">
     <div className='container'>
      <div className='row'>
        <div className='col-md-3'><h2>Reviews</h2></div>
        <div className='col-md-7'>
        <Modal
        
size='lg'
isOpen={modal}
toggle={()=>setModal(!modal)}

// onClosed={
//  ()=>{setproductlink('') ;setproductname('')}
// }

>
  <ModalHeader
   toggle={()=>setModal(!modal)}
     
  >
    {/* <button type="button" className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={()=>setModal(false)} >
            <span aria-hidden="true" className='ms-auto'>&times;</span></button> */}
    Add Review
  
  </ModalHeader>
  <ModalBody>
   
  <form  onSubmit={(e)=>{handeladdform(e)}}>
        <Row>
          
         
           <Col lg={12}>
            <div>
            <label htmlFor="product img" className="form-label">Your name*</label>
              <input type='text'
               onChange={(e) => {setpdtname(e.target.value) }}
              className='form-control' placeholder='enter your name' required/>
           
            <label htmlFor="sss" className="form-label">About Product*</label>
           
            <textarea type='text' 
            onChange={(e) => {setTextarea(e.target.value) }}
            className='form-control' placeholder='Enter here maximum length 200' maxLength={200} minLength={20} required/>
           

            <label htmlFor="product img" className="form-label">Product pic*</label>
            <input type="file"  
            accept="image/*" onChange={(e) => { setimage(e.target.files[0]) }}  
            className="form-control" placeholder="upload Here"  required/>
            </div>
           

          </Col> 
               
        </Row> 
        <button className="btn btn-danger mt-2" onClick={toast} >Submit</button>
       
      </form>
  </ModalBody>
</Modal> 
        </div>

        <div className='col-md-2'><button  onClick={()=>setModal(true)} className='btn btn-danger me-auto'> Wrrite Review</button></div>
      </div>
     </div>
      
      <Slider {...settings}>
        {productReviews.map((review) => (
            <div className='p-2'>
          <div key={review.id}>
            <img  className='img-fluid' style={{maxHeight:'150px', width:'99%'}} src={`/upload/${review.image}`}  alt='ddd' />
            <p className="review-comment">{review.text}</p>
            <p className="buyer-name">- {review.pdtname}</p>
          </div>
          </div>
        ))}
      </Slider>
    </div>
    <ToastContainer  style={{position:"top-center"}}/>
    </>
  );
}

export default ProductReviewCarousel;
