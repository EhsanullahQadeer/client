import React from "react";
import "./CoursesBody.css";
import { courses1, courses2, courses3 } from "./data";
import img9 from "../../assets/courseBig.png";

const CoursesBody = () => {
  return (
    <div className="courseBigMain" >
      {/*  */}
      <div className="coursesGrids-gap">
      <div className="coursesGrids">
        <div>
          <h1 className="coursesHeader">View programs by age</h1>
          <div className="coursesGrid1">
            {courses1.map((item) => {
              return (
                <div className="coursesSingleBox">
                  <img src={item?.img} />
                  <div className="coursesSingleBoxText">
                    <p>{item?.bigText}</p>
                    <h1>{item?.smallText}</h1>
                  </div>
                </div>
              );
            })}
            <div className="coursesSingleBox">
            <div className="coursesMore">
              <h1>All programs</h1>
              <button>Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  */}
      {/*  */}
      <div className="coursesGrids">
        <div>
          <h1 className="coursesHeader">View programs by type</h1>
          <div className="coursesGrid1">
            {courses2.map((item) => {
              return (
                <div className="coursesSingleBox">
                  <img src={item?.img} />
                  <div className="coursesSingleBoxText">
                    <p>{item?.bigText}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      </div>
      {/*  */}

      <div className="coursesBig">
        <div className="">
          <img src={img9} />
          <div className="coursesSingleBoxText coursesSingleBoxTextBigImg">
            <h1>Language courses abroad</h1>
          </div>
        </div>
      </div>

      {/*  */}

      <div>
        <div className="coursesGrid1">
          {courses3.map((item) => {
            return (
              <div className="coursesSingleBox">
                <img src={item?.img} />
                <div className="coursesSingleBoxText">
                  <p>{item?.bigText}</p>
                  <h1>{item?.smallText}</h1>
                </div>
              </div>
            );
          })}
          <div className="coursesSingleBox">
          <div className="coursesMore">
            <h1>All programs</h1>
            <button>Learn More</button>
          </div>
          </div>  
        </div>
      </div>

      {/*  */}
    </div>
  );
};

export default CoursesBody;
