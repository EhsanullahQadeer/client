import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import "./Footer.css";
 import footerLogo from "../../assets/Logo.png";
import Logo from "../../assets/Logo.png";

const Footer = () => {
  return (
    <div className="footerBigMain">
      <div className="footerMain">
        {/*  */}
        <div className="footerPart1">
          <img src={footerLogo} className="footerlogoImage" />
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
        {/*  */}
        {/*  */}
        <div className="footerInfo">
          <p className="footerInfo-p-hd">Quick Links</p>
          <ul className="footerUlFlex">
          <li><Link to="/FAQ">FAQ</Link></li>
          <li><Link to="">Terms & conditions</Link></li>
          <li><Link to="">support</Link></li>
          <li><Link to="">Privacy Policy</Link></li></ul>
        </div>
        {/*  */}
        {/*  */}
        <div className="footerInfo footerLast">
        <div>
          <p className="footerInfo-p-hd">Subscribe For Newsletter</p>
          <div className="footerInputWrapper footerInputWrapperBtn footerLast">
           <div className="footer-wrapper">
           <form>
            <input type="email" placeholder="Your Email" className="footerTextField" />
            <button className="sub">Subcribe</button>
            </form>
            </div>
            </div>

            </div>
            <div>
            <p className="footerInfo-p-hd">Follow On:</p>
          <div className="footerIcons">
            
            <a href=""><div className="footerIconBoxes tw-icon fa-brands fa-twitter fa-sm"></div></a>
            
            
            <a href=""><div className="footerIconBoxes fa-brands fa-facebook-f fa-sm"></div></a>
           
            
            <a href=""><div className="footerIconBoxes fa-brands fa-pinterest fa-sm"></div></a>
            
            
            <a href=""><div className="footerIconBoxes fa-brands fa-instagram fa-sm"></div></a>
            
          </div>
          </div>
        </div>
        {/*  */}
      </div>

      <div className="footerLine"></div>
      <div className="footerLastPart">
        <p className="copyright">Copyright © 2022 For How Square. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
