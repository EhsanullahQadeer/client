import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./Navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import Logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Profile_Logo from "./Profile_Logo";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const { role, writter, activeUser } = useSelector((state) => state.user);
  let [ham, setHam] = React.useState(true);
  let { pathname } = useLocation();

  function scrollToWrite() {
    if (pathname != "/") {
      element = document.getElementById("becomeWriterSection");
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className="nav">
      <div className="nav-main">
        <div className="nav-front">
          <Link to="/">
            <img src={Logo} className="logoImage navBarLogo cur-point" />
          </Link>
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
              <Link className="fancy-link" to="/about">
                Our Story
              </Link>
            </li>
            {/* <li>
            <Link className="fancy-link" to="/courses">
                courses
              </Link>
            </li> */}
            <li>
              {console.log(activeUser)}
              {activeUser && activeUser.isApproved ? (
                <Link
                  onClick={scrollToWrite}
                  className="fancy-link"
                  to="/Write"
                >
                  Write
                </Link>
              ) : !activeUser ? (
                <Link
                  onClick={scrollToWrite}
                  className="fancy-link"
                  to="/SignIn"
                >
                  Write
                </Link>
              ) : (
                !activeUser.writer && (
                  <Link
                    onClick={scrollToWrite}
                    className="fancy-link"
                    to="/creator#becomeWriterSection"
                  >
                    Write
                  </Link>
                )
              )}
            </li>
            <li>
              <Link
                className="fancy-link links"
                to="/contact-us"
                onClick={() => setHam(true)}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
        <div className="navBtnsBigScreen">
          {!activeUser && (
            <Link to="/signIn">
              <button className="sm-btns blue-btn-hv">Sign In</button>
            </Link>
          )}
          <Link to="/getStarted">
            <button className="sm-btns trans-btn-hv">Get Started</button>
          </Link>
          {activeUser && <Profile_Logo profile={true} />}
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
        { activeUser && <Profile_Logo profile={true} />}

          </li>
            <li>
              <Link
                className="links fancy-link"
                onClick={() => setHam(true)}
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setHam(true)}
                className="links fancy-link"
                to="/about"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setHam(true)}
                className="links fancy-link"
                to="/about"
              >
                Our Story
              </Link>
            </li>
            <li>
              {console.log(activeUser)}
              {activeUser && activeUser.isApproved ? (
                <Link
                  onClick={() => {
                    setHam(true);
                    scrollToWrite();
                  }}
                  className="fancy-link links"
                  to="/Write"
                >
                  Write
                </Link>
              ) : !activeUser ? (
                <Link
                  onClick={() => {
                    setHam(true);
                    scrollToWrite();
                  }}
                  className="fancy-link links"
                  to="/SignIn"
                >
                  Write
                </Link>
              ) : (
                !activeUser.writer && (
                  <Link
                    onClick={() => {
                      setHam(true);
                      scrollToWrite();
                    }}
                    className="fancy-link links"
                    to="/creator#becomeWriterSection"
                  >
                    Write
                  </Link>
                )
              )}
            </li>
            <li>
              <Link
                className="fancy-link links"
                to="/contact-us"
                onClick={() => setHam(true)}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
        <div className="navBtnsSmallScreen">
          {!activeUser && (
            <Link className="w-100" to="/signIn">
              <button className="sm-btns blue-btn-hv float-left">Sign In</button>
            </Link>
          )}
          <Link className="w-100" to="/getStarted">
            <button className="sm-btns trans-btn-hv">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
