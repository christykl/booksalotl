import React from "react";
import { Bar } from "react-chartjs-2";
import "../../utilities.css";
import "../pages/Profile.css";

const PagesGraph = ({ bookData }) => {
  const greyColor = getComputedStyle(document.documentElement).getPropertyValue("--grey");
  const barColor = getComputedStyle(document.documentElement).getPropertyValue("--primary--light");
  const readBooks = bookData.filter(book => book.status === "read");

  const today = new Date();
  const startDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
  const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const monthData: string[] = [];
  const pageData: number[] = [];
  for (let i = 0; i < 13; i++) {
    pageData.push(0);
  }

  let currDate = startDate;
  while (currDate <= endDate) {
    monthData.push(
      (currDate.getMonth() + 1).toString() + "/" + currDate.getFullYear().toString()
    );
    currDate = new Date(currDate.getFullYear(), currDate.getMonth() + 1, currDate.getDate());
  }

  const convertDate = (month: number, year: number) => {
    let val: number;
    if (year == today.getFullYear() - 1) {
      val = month - today.getMonth();
    } else {
      val = month + 12 - today.getMonth();
    }
    if (val >= 0 && val <= 12) {
      return val;
    }
    return -1;
  };

  for (let bk of readBooks) {
    const newDate = new Date(bk.dateread);
    let convert = convertDate(newDate.getMonth(), newDate.getFullYear());
    if (convert != -1) {
      pageData[convert] += bk.pages;
      console.log(`Book: ${bk.title}, Date: ${bk.dateread}, Pages: ${bk.pages}, Convert: ${convert}`);
    }
  }

  const pagesData = {
    labels: monthData,
    datasets: [
      {
        label: "Number of Pages",
        data: pageData,
        fill: false,
        borderColor: greyColor,
        backgroundColor: barColor,
        tension: 0.1,
      },
    ],
  };

  const maxYValue = Math.max(...pageData);
  console.log(pageData)

  return (
    <Bar
      className="Profile-chartSubContainer"
      data={pagesData}
      style={{
        width: 480,
        height: 400,
      }}
      options={{
        maintainAspectRatio: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      }}
    />
  )
}

export default PagesGraph;

