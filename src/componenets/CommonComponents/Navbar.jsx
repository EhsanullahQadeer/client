import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import "./Navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import Logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Profile_Logo from "./Profile_Logo";

const Navbar = () => {
const {role,writter}=useSelector((state) => state.user)
  let [ham, setHam] = React.useState(true);
  return (
    <div className="nav">
      <div className="nav-main">
         <div className="nav-front">
          <img src={Logo} className="logoImage navBarLogo" />
        </div> 

        <nav className="big-screen-nav">
          <ul>
            <li>
              <Link to="/" className="fancy-link">
                Home
              </Link>
            </li>
            <li>
              <Link className="fancy-link" to="/about">
                About Us
              </Link>
            </li>
            <li>
            <Link className="fancy-link" to="/courses">
                courses
              </Link>
            </li>
            <li>
              <Link className="fancy-link" to="/creator">
                write
              </Link>
            </li>
            

            {/*  */}
            <div className="mb-2">
        {[DropdownButton].map((DropdownType, idx) => (
          <DropdownType
            as={ButtonGroup}
            key={idx}
            id={`dropdown-button-drop-${idx}`}
            size="sm"
            title="Pages"
          >
             <Dropdown.Item eventKey="1">   
              <Link className="fancy-link" to="/WriterForm">
                writer form
              </Link>
       
           </Dropdown.Item>
            <Dropdown.Item eventKey="2">  
              <Link className="fancy-link" to="/FAQ">
                faq
              </Link>
           </Dropdown.Item>
            <Dropdown.Item eventKey="3">
            </Dropdown.Item>

            <Dropdown.Item eventKey="4"> 
              <Link className="fancy-link" to="/writersList">
                writers
              </Link>
            </Dropdown.Item>
            <Dropdown.Item eventKey="">
            <Link className="fancy-link" to="/writer/123">
                writer profile
              </Link>
            
            </Dropdown.Item>
           
             
           
          </DropdownType>
        ))}
      </div>
           
         
            
            
           
            <div className="mb-2">
        {[DropdownButton].map((DropdownType, idx) => (
          <DropdownType
            as={ButtonGroup}
            key={idx}
            id={`dropdown-button-drop-${idx}`}
            size="sm"
            title="Pages"
          >
            <Dropdown.Item eventKey="1"> 
              <Link className="fancy-link" to="/category/DataScience">
                single category
              </Link>
            </Dropdown.Item>
            <Dropdown.Item eventKey="2"> 
              <Link className="fancy-link" to="/Request">
                request
              </Link>
            </Dropdown.Item>
            <Dropdown.Item eventKey="3">
              <Link className="fancy-link" to="/WriterDetailForm">
                writer deatail form
              </Link>
            </Dropdown.Item>
           
            <Dropdown.Item eventKey="4"> 
              <Link className="fancy-link" to="/blog/123">
                blog
              </Link>
              </Dropdown.Item>
           
          </DropdownType>
        ))}
      </div>
      
          </ul>
         
        </nav>
        <div className="navBtnsBigScreen">
          {role !="writter" && !writter &&
          <Link to="/signIn">
            <button className="sm-btns blue-btn-hv">Sign In</button>
          </Link>}
          <Link to="/getStarted">
            <button className="sm-btns trans-btn-hv">Get Started</button>
          </Link>
          {role =="writter" && writter &&
          <Profile_Logo/>}
        
          
        </div>
        

        <GiHamburgerMenu className="ham" onClick={() => setHam(false)} />
      </div>

      <div
        className={`smal-screen-nav ${!ham ? "small-screen-nav-active" : ""}`}
      >
        <AiOutlineClose
          onClick={() => setHam(true)}
          className="small-screen-close"
        />
        <nav>
          <ul>
            <li>
              <Link
                className="links fancy-link"
                onClick={() => setHam(true)}
                to="/"
              >
                home1
              </Link>
            </li>
            <li>
              <Link
                className="links fancy-link"
                onClick={() => setHam(true)}
                to="/creator"
              >
                creator
              </Link>
            </li>
            <li>
              <Link
                className="links fancy-link"
                onClick={() => setHam(true)}
                to="/writer/123"
              >
                writer profile
              </Link>
            </li>
            <li>
              <Link
                className="links fancy-link"
                onClick={() => setHam(true)}
                to="/category/DataScience"
              >
                single category
              </Link>
            </li>
            <li>
              <Link
                className="links fancy-link"
                onClick={() => setHam(true)}
                to="/writersList"
              >
                writers
              </Link>
            </li>
            <li>
              <Link
                className="links fancy-link"
                onClick={() => setHam(true)}
                to="/about"
              >
                about
              </Link>
            </li>

            {/*  */}

            <li>
              <Link
                className="fancy-link links"
                to="/courses"
                onClick={() => setHam(true)}
              >
                courses
              </Link>
            </li>
            <li>
              <Link
                className="fancy-link links"
                to="/FAQ"
                onClick={() => setHam(true)}
              >
                faq
              </Link>
            </li>
            <li>
              <Link
                className="fancy-link links"
                to="/WriterForm"
                onClick={() => setHam(true)}
              >
                writer form
              </Link>
            </li>
            <li>
              <Link
                className="fancy-link links"
                onClick={() => setHam(true)}
                to="/Write"
              >
                write
              </Link>
            </li>
            <li>
              <Link
                className="fancy-link links"
                to="/Request"
                onClick={() => setHam(true)}
              >
                request
              </Link>
            </li>
            <li>
              <Link
                className="fancy-link links"
                to="/blog/123"
                onClick={() => setHam(true)}
              >
                blog
              </Link>
            </li>
          </ul>
        </nav>
        <div className="navBtnsSmallScreen">
          <Link  to="/register">
            <button className="signUp" style={{ background: "#0065FD", width:"210px",marginLeft:"0" }}>
              {" "}
              Sign Up
            </button>
          </Link>
          <Link to="/signIn">
            <button  className="login">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;



      
  
 