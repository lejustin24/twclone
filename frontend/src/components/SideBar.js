import React from "react";
import "../css/SideBar.css";
import logo from "../assests/logo.png";
import SidebarNav from "../components/SidebarNav";
import home from "../assests/Home-Fill-1.png";
import explore from "../assests/Explore.png";
import notification from "../assests/Notifications-fill.png";
import messages from "../assests/Messages.png";
import bookmark from "../assests/Bookmarks.png";
import list from "../assests/Lists.png";
import profile from "../assests/Profile.png";
import more from "../assests/more.png";
import profileImage from "../assests/profile-img.png"
import privateLock from "../assests/Private.png"

const {ethereum} = window

let theAcc = ethereum.selectedAddress

    /**
     * sidebar of the twitter, with the address (username..) of the user connected at the bottom.
     */
function SideBar() {
    return (
        <div className="sidebar">
          <img src={logo} className="logo" alt="logo" />

          {/* Navigation  */}
          <SidebarNav Icon={home} text="Home" />
          <SidebarNav Icon={explore} text="Explore" />
          <SidebarNav Icon={notification} text="Notifications" />
          <SidebarNav Icon={messages} text="Messages" />
          <SidebarNav Icon={bookmark} text="Bookmarks" />
          <SidebarNav Icon={list} text="List" />
          <SidebarNav Icon={profile} text="Profile" />
          <SidebarNav Icon={more} text="More" />

          {/* Account Button */}
          <div className="account">
            <img src={profileImage} className="profile-img" alt="profile-img"/>
            <p className="username">
              {theAcc}
              </p>
              <img src={privateLock} className="privateLock" alt="private"/>
            </div>
          </div>
        
      );
}

export default SideBar;