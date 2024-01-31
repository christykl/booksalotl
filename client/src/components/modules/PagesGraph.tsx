// import React from "react";
// import { Bar } from "react-chartjs-2";
// import "../../utilities.css";
// import "../pages/Profile.css";

// const PagesGraph = ({ bookData }) => {
//   const greyColor = getComputedStyle(document.documentElement).getPropertyValue("--grey");
//   const pagesRead: number[] = bookData.map((book) => book.pages);

//   const today = new Date();
//   const startDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
//   const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

//   const monthData: string[] = [];
//   const pageData: number[] = [];
//   for (let i = 0; i < 13; i++) {
//     pageData.push(0);
//   }

//   let currDate = startDate;
//   while (currDate <= endDate) {
//     monthData.push(
//       (currDate.getMonth() + 1).toString() + "/" + currDate.getFullYear().toString()
//     );
//     currDate = new Date(currDate.getFullYear(), currDate.getMonth() + 1, currDate.getDate());
//   }

//   const convertDate = (month: number, year: number) => {
//     let val: number;
//     if (year == today.getFullYear() - 1) {
//       val = month - today.getMonth();
//     } else {
//       val = month + 12 - today.getMonth();
//     }
//     if (val >= 0 && val <= 12) {
//       return val;
//     }
//     return -1;
//   };

//   for (let bk of bookData) {
//     const newDate = new Date(bk.dateread);
//     let convert = convertDate(newDate.getMonth(), newDate.getFullYear());
//     if (convert != -1) {
//       pageData[convert] += bk.pages;
//     }
//   }

//   const pagesData = {
//     labels: monthData,
//     datasets: [
//       {
//         label: "Number of Pages",
//         data: pageData,
//         yAxisID: "Total Pages Read",
//         fill: false,
//         borderColor: greyColor,
//         tension: 0.1,
//       },
//     ],
//   };

//   return (
//     <Bar
//             className="Profile-chartSubContainer"
//             data={pagesData}
//             style={{
//               width: 480,
//               height: 400,
//             }}
//             options={{
//               maintainAspectRatio: true,
//               scales: {
//                 y: {
//                   beginAtZero: true,
//                 },
//               },
//             }}
//           />
//   )
// }

// export default PagesGraph;

import React from "react";
import { Bar } from "react-chartjs-2";
import "../../utilities.css";
import "../pages/Profile.css";

const PagesGraph = ({ bookData }) => {
  const greyColor = getComputedStyle(document.documentElement).getPropertyValue("--grey");
  const readBooks = bookData.filter(book => book.status === "read");
  console.log(bookData);
  
  if (!bookData || bookData.length === 0 || !bookData.some(b => b.dateread)) {
    // Return some fallback UI or a message
    return <div>No data available</div>;
  }

  // Find the earliest and latest dates in bookData
  const sortedDates = readBooks.map(b => new Date(b.dateread)).sort((a, b) => a - b);
  const startDate = sortedDates[0];
  const endDate = sortedDates[sortedDates.length - 1];
  console.log(sortedDates);
  console.log(startDate);
  console.log(endDate);

  // Generate labels for each month from startDate to endDate
  const generateLabels = (start: Date, end: Date): string[] => {
    const labels: string[] = [];
    let currentDate = new Date(start.getFullYear(), start.getMonth(), 1);
    while (currentDate <= end) {
      labels.push(`${currentDate.getMonth() + 1 < 10 ? '0' : ''}${currentDate.getMonth() + 1}/${currentDate.getFullYear().toString()}`);
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    return labels;
  };
  

  const labels = generateLabels(startDate, endDate);

  // Aggregate pages data for each label
  const pageData = labels.map(label => {
    return readBooks.reduce((total, book) => {
      const date = new Date(book.dateread);
      const bookLabel = `${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}/${date.getFullYear().toString()}`;
      return label === bookLabel ? total + book.pages : total;
    }, 0);
  });

  const pagesData = {
    labels: labels,
    datasets: [
      {
        label: "Number of Pages",
        data: pageData,
        fill: false,
        borderColor: greyColor,
        tension: 0.1,
      },
    ],
  };

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
  );
};

export default PagesGraph;

