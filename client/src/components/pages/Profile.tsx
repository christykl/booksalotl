import React, { useState } from "react";
import { Chart } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
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
    </div>
  );
};

export default Profile;
