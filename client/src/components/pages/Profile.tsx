import React, { useState } from "react";
import "../../utilities.css";
import "./Profile.css";

const Profile = () => {

  return (
    <div>
      <div className="Profile-bioContainer">
        <div className="Profile-image" />
        <div className="Profile-nameContainer">
            <h1 className="Profile-name">Janelle Cai</h1>
        </div>
        <div className="Profile-subContainer">
            <p className="Profile-subhead u-subheader">Friends</p>
            <p className="Profile-content u-subheader">0</p>
        </div>
        <div className="Profile-subContainer">
            <p className="Profile-subhead u-subheader">Lifetime Pages Read</p>
            <p className="Profile-content u-subheader">0</p>
        </div>
        <div className="Profile-subContainer">
            <p className="Profile-subhead u-subheader">Currently Reading</p>
            <p className="Profile-content u-subheader">*Insert SingleBook object*</p>
        </div>
      </div>
      {/* <h1 className="Profile-name Profile-nameContainer">Janelle Cai</h1>
      <hr className="Profile-line" />
      <div className="u-flex">
        <div className="Profile-subContainer u-textCenter">
          <h4 className="Profile-subTitle">About Me</h4>
          <div id="profile-description">
            Extra Challenge: Modify catbook to show a personalized description here!
          </div>
        </div>
        <div className="Profile-subContainer u-textCenter">
          <h4 className="Profile-subTitle">Cat Happiness</h4>
        </div>
        <div className="Profile-subContainer u-textCenter">
          <h4 className="Profile-subTitle">My Favorite Type of Cat</h4>
          <div id="favorite-cat">corgi</div>
        </div>
      </div> */}
    </div>
  );
};

export default Profile;
