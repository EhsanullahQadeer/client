import React from "react";
import "./index.css";
import { HashLoader } from "react-spinners";
export default function Global_Loader() {
  return (
    <div className="globalLoader-div">
      <HashLoader
      speedMultiplier={2}
        size={90}
        cssOverride={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
        color="#0065fd"
      />
    </div>
  );
}
