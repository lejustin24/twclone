import React from "react";
import "../css/Trends.css";

function Trends({country, content, tweet}) {
    /**
     * trending bar at the right, we have the trending hashtags. just to add to the theme.
     */
  return (
    <div className="trends">
      <div className="country-txt">{country}</div>
      <div className="content-txt">{content}</div>
      <div className="tweet">{tweet}</div>
    </div>
  );
}

export default Trends;
