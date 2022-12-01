import React from "react";
import "../css/SidebarNav.css";

function SidebarNav({text, Icon, onPress}) {

  return (
    <div className="sidebarNav">
      <img src={Icon} className="navIcon" alt="icon" />
      <div className="navText">{text}</div>
    </div>
  );
}

export default SidebarNav;
