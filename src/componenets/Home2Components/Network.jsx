import React from "react";
import "./Network.css";
import Writers from "../CommonComponents/Writers";

const Network = () => {
  return (
    <div className="networkBigMain">
      <div className="networkMain">
        <div className="networkContent">
          <h1>
            Join a network <br /> of curious <br /> minds.
          </h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy
            text ever since the 1500s.
          </p>
        </div>
        <div>
          <Writers />
        </div>
      </div>
    </div>

  );
};

export default Network;
