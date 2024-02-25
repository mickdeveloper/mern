
import Footer from "./pages/Footer";
import Navbar from "./pages/Header";
import Products from "./pages/Products";
import MyCarousel from "./pages/carousel";
import ProductReviewCarousel from "./pages/Review";
import SingleProducts from "./pages/SingleProducts";


function Home() {
    return ( 
        <>
        <Navbar/>
        
        <section className="pt-5 mt-2">
        <MyCarousel/>
        </section>
      
  <Products/>
<SingleProducts/>

<section>
  <ProductReviewCarousel  />
</section>
  <Footer/>

        </>
     );
}

export default Home;