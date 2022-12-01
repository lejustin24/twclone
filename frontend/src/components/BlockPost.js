import React from "react";
import "../css/BlockPost.css";
import { forwardRef } from "react";
import profileImage from "../assests/profile-img.png"
import addReactionIcon from "../assests/React.png";
import reactedIcon from "../assests/Reacted.png";
import DeleteIcon from "../assests/delete-icon.png";
import UpdateIcon from "../assests/update.png";

    /**
     * we get the data with forwardRef (library from the react) it's like a parser from the before.
     */

const BlockPost = forwardRef(
  ({ displayName, text, nOfReacts, personal, reactionOnClick, deleteOnClick, updateOnClick }, ref) => {

    return (
      <div className="block-container">
        <div className="block-profile">
          <img src={profileImage} className="profile-img" alt="profile-img" />
          <div className="info-container">
            <div className="txt-1">{displayName}{" "}</div>
            <div className="txt-description">{text}</div>
          </div>
        </div>

        <div className="icon-container">

        {
          (nOfReacts>0)? (<img src={reactedIcon} className="icon-block" alt="icon" onClick={reactionOnClick}/>)
          : (<img src={addReactionIcon} className="icon-block" alt="icon" onClick={reactionOnClick}/>)
        }
      

        {personal ? (
              <img src={DeleteIcon} className="icon-block" alt="icon" onClick={deleteOnClick}/>
            ) : ("")}
        {personal ? (
              <img src={UpdateIcon} className="icon-block" alt="icon" onClick={updateOnClick}/>
            ) : ("")}
        
        </div>

      </div>
    );
  }
);

export default BlockPost;