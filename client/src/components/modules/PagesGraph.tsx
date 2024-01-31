import React from "react";
import { Bar } from "react-chartjs-2";
import "../../utilities.css";
import "../pages/Profile.css";

const PagesGraph = ({ bookData }) => {
  const greyColor = getComputedStyle(document.documentElement).getPropertyValue("--grey");
  const barColor = getComputedStyle(document.documentElement).getPropertyValue("--primary--light");
  const readBooks = bookData.filter(book => book.status === "read");

  const today = new Date();
  const startDate = new Date(today.getFullYear() - 1, today.getMonth(), 1);
  const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  // endDate.setDate(endDate.getDate() + 1);
  // console.log("end date", endDate);
  // console.log("start date", startDate);

  const monthData: string[] = [];
  const pageData: number[] = [];
  for (let i = 0; i < 13; i++) {
    pageData.push(0);
  }

  let currDate = startDate;
  while (currDate < endDate) {
    console.log(currDate);
    monthData.push(
      (currDate.getMonth() + 1).toString() + "/" + currDate.getFullYear().toString()
    );
    currDate = new Date(currDate.getFullYear(), currDate.getMonth() + 1, currDate.getDate());
  }
  console.log(monthData);
  console.log(pageData);

  const convertDate = (readDate: Date) => {
    const monthsDifference = (readDate.getFullYear() - startDate.getFullYear()) * 12 
                            + readDate.getMonth() - startDate.getMonth();
    return monthsDifference;
  };
  
  for (let bk of readBooks) {
    const newDate = new Date(bk.dateread);
    const index = convertDate(newDate);
    if (index >= 0 && index < 13) {
      pageData[index] += bk.pages;
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

