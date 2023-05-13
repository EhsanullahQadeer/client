import React,{useState} from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./ImageGrid.css"
import img1 from "../../assets/grid1.png";
import img2 from "../../assets/grid2.png";
import img3 from "../../assets/grid3.png";
import img4 from "../../assets/grid4.png";
import img5 from "../../assets/grid5.png";
import img6 from "../../assets/grid6.png";
const ImageGrid = () => {
      const responsive = {
        2000: {
          items: 6,
        },
        1200: {
          items: 6,
        },
        800: {
          items: 4,
        },
        0: {
          items: 2,
        },
      };
      const items = [
        <img src={img1} />,
        <img src={img3} />,
        <img src={img2} />,
        <img src={img4} />,
        <img src={img5} />,
        <img src={img6} />,
        <img src={img1} />,
        <img src={img2} />,
        <img src={img3} />,
        <img src={img4} />,
        <img src={img5} />,
        <img src={img6} />,
        <img src={img5} />,
      ]

  return (
    <div className="home-page-curosel-div">
    <div className="imageGridMain">
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
  );
};

export default ImageGrid;
