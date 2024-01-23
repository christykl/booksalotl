import React, { useState } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Chart, Pie, Doughnut, Line, Bar } from "react-chartjs-2";
ChartJS.register(...registerables);
import "../../utilities.css";
import "./Profile.css";

const primaryColor = getComputedStyle(document.documentElement).getPropertyValue("--primary");
const primaryDimColor = getComputedStyle(document.documentElement).getPropertyValue(
  "--primary--dim"
);
const greyColor = getComputedStyle(document.documentElement).getPropertyValue("--grey");

const Profile = () => {
  /* Placeholder data */
  const ficData = {
    labels: ["Fiction", "Nonfiction", "Gossip"],
    datasets: [
      {
        /* label: "My First Dataset", */
        data: [300, 50, 100],
        backgroundColor: [primaryColor, primaryDimColor, greyColor],
        hoverOffset: 4,
      },
    ],
  };

  const pagesData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Number of Pages",
        data: [0, 59, 80, 81, 140, 2000],
        yAxisID: "Total Pages Read",
        fill: false,
        borderColor: greyColor,
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="Profile-flexContainer">
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
      <div className="Profile-chartContainer">
        <p className="Profile-chartHeader u-subheader">Fiction vs. Nonfiction</p>
        <Pie className="Profile-chartSubContainer" data={ficData} />
      </div>
      <div className="Profile-chartContainer">
        <p className="Profile-chartHeader u-subheader">Pages Read</p>
        <Line
          className="Profile-chartSubContainer"
          data={pagesData}
          style={{
            width: 650,
            height: 2000,
          }}
          options={{
            maintainAspectRatio: true,
          }}
        />
      </div>
    </div>
  );
};

export default Profile;
