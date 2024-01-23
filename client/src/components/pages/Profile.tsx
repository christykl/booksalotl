import React, { useState, useEffect } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Chart, Pie, Doughnut, Line, Bar } from "react-chartjs-2";
ChartJS.register(...registerables);
import "../../utilities.css";
import "./Profile.css";
import { Book } from "./Books";
import Books from "./Books";
import SingleBook from "../modules/SingleBook";

const primaryColor = getComputedStyle(document.documentElement).getPropertyValue("--primary");
const primaryDimColor = getComputedStyle(document.documentElement).getPropertyValue(
  "--primary--dim"
);
const greyColor = getComputedStyle(document.documentElement).getPropertyValue("--grey");

const Profile = () => {
  const [bookData, setBookData] = useState<Book[]>([]);

  /* Placeholder data */
  const loadBooks = () => {
    setBookData([
      { _id: "1", title: "1984", author: "George Orwell", genre: "Fiction", pageCount: 284 },
      {
        _id: "2",
        title: "Pride and Prejudice",
        author: "Jane Austen",
        genre: "Fiction",
        pageCount: 312,
      },
      {
        _id: "3",
        title: "Thinking, Fast and Slow",
        author: "Daniel Kahneman",
        genre: "Nonfiction",
        pageCount: 144,
      },
    ]);
  };

  useEffect(loadBooks, []);

  /* Fiction vs. Nonfiction Pie Chart */
  const fictionCount = bookData.filter((bookObj) => bookObj.genre === "Fiction").length;
  const nonficCount = bookData.filter((bookObj) => bookObj.genre === "Nonfiction").length;
  const otherCount = bookData.filter(
    (bookObj) => bookObj.genre !== "Fiction" && bookObj.genre !== "Nonfiction"
  ).length;

  const ficData = {
    labels: ["Fiction", "Nonfiction", "Other"],
    datasets: [
      {
        data: [fictionCount, nonficCount, otherCount],
        backgroundColor: [primaryColor, primaryDimColor, greyColor],
        hoverOffset: 4,
      },
    ],
  };

  /* Total Pages Read Line Graph */
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
          <p className="Profile-content u-subheader Profile-bookContainer">
            <SingleBook
              userId={" Anonymous "}
              book={{ _id: "3", title: "Thinking, Fast and Slow", author: "Daniel Kahneman" }}
            />
          </p>
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
