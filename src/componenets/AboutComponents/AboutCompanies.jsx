import React from "react";
import "./AboutCompanies.css";
import AliceCarousel from "react-alice-carousel";
import img1 from "../../assets/company1.png";
import img2 from "../../assets/company2.png";
import img3 from "../../assets/company3.png";
import img4 from "../../assets/company4.png";
import img5 from "../../assets/company5.png";

const AboutCompanies = () => {
  const responsive = {
    2000: {
      items: 6,
    },
    1200: {
      items: 5,
    },
    800: {
      items: 3,
    },
    0: {
      items: 1,
    },
  };
  const items=[
          <img src={img1} />,
          <img src={img2} />,
          <img src={img3} />,
          <img src={img4} />,
          <img src={img5} />,
          <img src={img1} />,
          <img src={img2} />,
          <img src={img3} />,
          <img src={img4} />,
  ]
  return (
    <div className="aboutCompaniesBigMian">
      <div className="aboutCompaniesMain">
        <h1>We are featured on</h1>
        <div className="companiesImages">
        <AliceCarousel
        mouseTracking
        items={items}
        responsive={responsive}
        autoPlay={true}
        infinite={true}
        animationDuration={600}
        autoPlayInterval={1000}
        disableButtonsControls={true}
        disableDotsControls={false}
      />
    </div>
   
          
        </div>
        
      </div>
  );
};

export default AboutCompanies;
