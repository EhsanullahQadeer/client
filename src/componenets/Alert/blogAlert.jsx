import { useSelector } from "react-redux";
import "./Alert.css";
const Alert = () => {
  const { alertText, alertType } = useSelector((state) => state.blog);
  return (
    <div className={`alert alert-${alertType} form-font`}>{alertText}</div>
  );
};

export default Alert;
