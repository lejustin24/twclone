import React from "react";
import "../css/Notification.css";
import searchIcon from "../assests/Search-Icon.png"
import Trends from "../components/Trends";

    /**
     * notifictaion bar at the right, we have the trending tweets.. just to add to the theme.
     */
function Notification() {
    return (
        <div className="notification">
          <div className="search-bar">
          <img src={searchIcon} className="searchIcon" alt="search-Icon"/>
          <input className="search-input" placeholder="Search" type="text" />
          </div>
          <div className="trends-container">
            <h4>Trends for you </h4>
            <Trends country= "Trending in Lebanon" content="#BLOCKCHAIN" tweet="5,000 Tweets" />
            <Trends country= "Trending in Srilanka" content="#BLOCKCHAIN" tweet="1,000 Tweets" />
            <Trends country= "Trending in France" content="#BLOCKCHAIN" tweet="4,000 Tweets" />
          </div>
        </div>
      );
}

export default Notification;