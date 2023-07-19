import React from "react";
import "./profile-logo.css";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/user/userSlice";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
export default function Profile_Logo() {
  const {pathname}=useLocation();
  // console.log(pathname)
  let profile=pathname.split("/").includes("profile");
  let updateProfile=pathname.split("/").includes("updateProfile")
    const dispatch = useDispatch();
  const { writerId ,userId} = useSelector((state) => state.user);
  function logout() {
    dispatch(logoutUser());
  }
  return (
    <div className="dropdown pofile-dropdown ">
      <button className="dropbtn">
        <div className="profile-logo">
          <span className="fa-regular fa-user fa-lg "></span>
        </div>
      </button>
      <div className="dropdown-content">
        <div className="account-profile">Account</div>
        {!profile&&
        <Link to={`/profile/${writerId ||userId }`}>
          <span>Profile</span>
        </Link>
        }
        {writerId&& !updateProfile &&<Link to={`/updateProfile/${writerId}`}>
          <span>Update Profile</span>
        </Link>}
        <span onClick={logout}>Logout</span>
      </div>
    </div>
  );
}
