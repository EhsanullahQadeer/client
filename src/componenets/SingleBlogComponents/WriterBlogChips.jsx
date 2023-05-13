import React from "react";
import "./index.css";

const WriterBlogChips = ({ chips }) => {
  return (
    <div className="chipsMain">
      {chips.map((chip) => {
        return<button className="singleChip">{chip}</button>;
      })}
    </div>
  );
};

export default WriterBlogChips;
