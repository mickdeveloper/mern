import React from 'react';

const AddToCartButton = ({ pdtname, price, image }) => {
  const handleAddToCart = () => {
    
    // Implement your add to cart logic here
    // You can use the pdtname, price, and image in this function
    console.log('Add to Cart clicked:', pdtname, price, image);
  };

  return (
    <button className="btn btn-success mt-3 me-3" onClick={handleAddToCart}>
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
