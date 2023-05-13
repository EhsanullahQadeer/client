import React from 'react'
import "./profile-logo.css"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
export default function Profile_Logo() {
  const {userId}=useSelector((state) => state.user)
  return (
    <div class="dropdown pofile-dropdown ">
  <button class="dropbtn">
          <div className="profile-logo">
          <span class="fa-regular fa-user fa-lg "></span>
          </div></button>
  <div class="dropdown-content">
  <div className='account-profile'>Account</div>
 <Link to={`/writer/${userId}`} ><span>Profile</span></Link> 
 <Link to={`/updateProfile/${userId}`} ><span>Update Profile</span></Link> 
  <span>Link </span>
  <span>Link </span>
    {/* <a href="#">Link 1</a>
    <a href="#">Link 2</a>
    <a href="#">Link 3</a> */}
  </div>
</div>
  )
}
