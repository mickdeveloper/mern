import { Link } from "react-router-dom";

import "./about.css";
import Navbar from "./Header";

function About() {
    return (  
        <>
        <Navbar/>
        <div className="responsive-container-block bigContainer">
  <div className="responsive-container-block Container bottomContainer">
    <div className="ultimateImg">
      <img className="mainImg" src="images/aboutsk.png" />
      <div className="purpleBox">
        <p className="purpleText">
        Seasons Kreation: Crafting Unique Stories in Every Jewel, Tailored to Your Essence.
        </p>
        
        <img className="stars" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/mp5.svg" />
      </div>
    </div>
    <div className="allText bottomText">
      <p className="text-blk headingText">
        About Us
      </p>
      <p className="text-blk subHeadingText">
       Seasons Kreation - Where Custom Jewelry Becomes Timeless Beauty.
      </p>
      <p className="text-blk description">
      Seasons Kreation is a unique and dynamic company specializing in the creation and sale of custom jewelry. Our passion for design and commitment to quality craftsmanship set us apart in the world of accessories. At Seasons Kreation, we understand that jewelry is a personal expression of individual style, and we take pride in curating a diverse collection that reflects the beauty of every season. Whether you're looking for a one-of-a-kind piece or a timeless classic, Seasons Kreation is dedicated to bringing your jewelry dreams to life with creativity, precision, and a touch of seasonal inspiration
      </p>
      <Link to={'/'} className="explore">
        Shop here
      </Link>
    </div>
  </div>
</div>
        </>
    );
}

export default About;