import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Add from "../componenets/CommonComponents/Add";

export function DisplayAdd({ blogs, index }) {
  return (
    ((blogs.length - 1 == index && blogs.length <= 3) || index == 3) && Add()
  );
}
export let axiosConfig = {
  authRequired: true,
};
export let axiosShowLoader = {
  showLoader: true,
};
export let axiosLoader_Auth={
  showLoader: true,
  authRequired: true,
}

const useStateWithCallback = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const setValueAndCallback = (newValue, callback) => {
    setValue((prevValue) => {
      if (callback) {
        callback(prevValue, newValue);
      }
      return newValue;
    });
  };

  return [value, setValueAndCallback];
};

export { useStateWithCallback };
