import React from "react";
import "./Numbers.css";

const Numbers = () => {
  return (
    <div className="numbersBigMain">
      <h1 className="numbersHeading">
        We Inspire Curious & competitive readers
      </h1>
      <div className="numbersMain">
        <div className="NumbersAmount">
          <div className="amountWrapper">
            <h1>
              800K<sup>+</sup>
            </h1>
            <p>Total Readers</p>
          </div>
          <div className="amountWrapper">
            <h1>
              250K<sup>+</sup>
            </h1>
            <p>Monthly Readers</p>
          </div>
          <div className="amountWrapper">
            <h1>
              12m<sup>+</sup>
            </h1>
            <p>average session time</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Numbers;
