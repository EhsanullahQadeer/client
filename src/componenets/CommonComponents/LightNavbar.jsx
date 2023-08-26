import React from "react";
import "./LightNavbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import Logo from "../../assets/writerNavLogo.png";
import writerMan from "../../assets/writerMan.png";
import { Link } from "react-router-dom";
import Profile_Logo from "./Profile_Logo";
import { useSelector } from "react-redux";
const Navbar = ({ signIn, getStarted, person }) => {
  const { activeUser } = useSelector((state) => state.user);

  let [ham, setHam] = React.useState(true);
  return (
    <div className="nav bigScreenNavWriter">
      <div className="nav-main" id="nav-main-writer">
        <div className="nav-front">
          <Link to="/">
            <img src={Logo} className="logoImage navBarLogo cur-point" />
          </Link>
        </div>

        <nav className="big-screen-nav">
          <ul>
            <li>
              <Link className="fancy-link" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="fancy-link" to="/about">
                About Us
              </Link>
            </li>
            {/* <li>
              <Link className="fancy-link" to="/about">
                Our Story
              </Link>
            </li> */}

            <li>
              <Link className="fancy-link" to="/Write">
                Write
              </Link>
            </li>

            {/*  */}

            <li>
              <Link className="fancy-link" to="/contact-us">
                Contact Us
              </Link>
            </li>

            <li></li>
            <li></li>
          </ul>
        </nav>

        <div className="navBtnsBigScreen">
          {/*  */}
          {!activeUser && (
            <Link to="/SignIn">
              <button className="signUp blue-btn-hv">Sign In</button>
            </Link>
          )}
          {getStarted && (
            <Link to="/getStarted">
              <button className="getStartedWriter trans-btn-hv">
                Get Started
              </button>
            </Link>
          )}
          {activeUser && <Profile_Logo profile={false} />}
        </div>

        <GiHamburgerMenu
          className="ham hamWriter"
          onClick={() => setHam(false)}
        />
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
            <li>{activeUser && <Profile_Logo profile={false} />}</li>
            <li>
              <Link
                onClick={() => setHam(true)}
                className="fancy-link links"
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setHam(true)}
                className="fancy-link links"
                to="/about"
              >
                About Us
              </Link>
            </li>
            {/* <li>
              <Link
                onClick={() => setHam(true)}
                className="fancy-link links"
                to="/about"
              >
                Our Story
              </Link>
            </li> */}

            <li>
              <Link
                onClick={() => setHam(true)}
                className="fancy-link links"
                to="/Write"
              >
                Write
              </Link>
            </li>

            {/*  */}

            <li>
              <Link
                onClick={() => setHam(true)}
                className="fancy-link links"
                to="/contact-us"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
        <div className="navBtnsSmallScreen navBtnsSmallScreenWriter">
          {/*  */}
          {!activeUser && (
            <Link className="w-100" to="/SignIn">
              <button className="signUp blue-btn-hv ml-0">Sign In</button>
            </Link>
          )}
          {getStarted && (
            <Link className="w-100" to="/getStarted">
              <button className="getStartedWriter trans-btn-hv">
                Get Started
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
