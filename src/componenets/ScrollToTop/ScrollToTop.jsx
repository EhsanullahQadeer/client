import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ScrollToTop() {
  const navigate=useNavigate();
  const location= useLocation();
  let { pathname,hash } =location;

  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);
  useEffect(()=>{
    if(hash=="#signIn"){
      localStorage.setItem("prePath",pathname)
      navigate("/signIn")
    }
    if (hash == '#signUp') {
      navigate('/signUp');
    }
    if(hash=="#becomeWriterSection"){
     let element= document.getElementById("becomeWriterSection")
     console.log(element)
     element.scrollIntoView({ behavior: "smooth" });
    }
  },[hash])


  return null;
}