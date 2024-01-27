import React, { useState, useEffect } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);
// import 'chartjs-adapter-date-fns';
// import 'date-fns';
import { Chart, Pie, Doughnut, Line, Bar } from "react-chartjs-2";
import "../../utilities.css";
import "./Profile.css";
// import { Book } from "./Books";
// import Books from "./Books";
// import SingleBook from "../modules/SingleBook";
import { User } from "../../../../server/models/User";
import { get } from "../../utilities";
import { Book } from "../../../../server/models/Book";
import LibraryCard from "../modules/LibraryCard";

const primaryColor = getComputedStyle(document.documentElement).getPropertyValue("--primary");
const primaryDimColor = getComputedStyle(document.documentElement).getPropertyValue(
  "--primary--dim"
);
const greyColor = getComputedStyle(document.documentElement).getPropertyValue("--grey");

// export type Book = {
//   _id: string;
//   title: string;
//   authors: [string];
//   bookCover?: string;
//   rating?: number;
//   pageCount?: number;
//   genre?: string;
//   dateRead?: Date;
//   readerId?: string;
//   publisher?: string;
//   published_date?: string;
//   preview_link?: string;
//   description?: string;
// };

type ProfileProps = {
  userId: string;
};

const Profile = (props: ProfileProps) => {
  const [bookData, setBookData] = useState<Book[]>([]);
  const [username, setUsername] = useState<string>("Janelle Cai");
  const [library, setLibrary] = useState<Book[]>([]); 
  const [currentBook, setCurrentBook] = useState<Book | null>(null);

  useEffect(() => {
    get("/api/whoami")
      .then((user: User) => {
        if (user._id) {
          setUsername(user.name);
        }
      })
  }, []);

  useEffect(() => {
    get("/api/books").then((books: Book[]) => {
      setLibrary(books);
    });
  }, []);


  /* Placeholder data */
  const loadBooks = () => {
    library.map((book) => {
      if (book.reader_id && book.reader_id == props.userId) {
        setBookData((prev) => [...prev, book]);
      }
    });
  };

  useEffect(loadBooks, [library]);

  /* Fiction vs. Nonfiction Pie Chart */
  const fictionCount = bookData.filter((bookObj) => bookObj.genre === "fiction").length;
  const nonficCount = bookData.filter((bookObj) => bookObj.genre === "non-fiction").length;
  const otherCount = bookData.filter(
    (bookObj) => bookObj.genre !== "fiction" && bookObj.genre !== "non-fiction"
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
  
  const createPagesData = () => {
    /* Total Pages Read Line Graph */
    const bookCopy: Book[] = bookData.slice();
    bookCopy.sort((a, b) => (a.dateread > b.dateread) ? 1 : -1);
    
    const pagesRead: number[] = bookCopy.map((book) => book.pages);
    const cumPagesRead: number[] = [];
    let total = 0;
  
    for (let pages of pagesRead) {
      total += pages;
      cumPagesRead.push(total);
    }
  
    const datesRead: Date[] = bookCopy.map((book) => book.dateread);
    
    type Coord = {
      x: Date;
      y: number;
    };
  
    const coords: Coord[] = cumPagesRead.map((cumulative, index) => ({
      x: datesRead[index],
      y: cumulative
    }));
  
    console.log(coords);
    const pagesData = {
      labels: datesRead,
      datasets: [
        {
          label: "Number of Pages",
          data: cumPagesRead,
          yAxisID: "Total Pages Read",
          fill: false,
          borderColor: greyColor,
          tension: 0.1,
        },
      ],
    };
    return pagesData;
  };

  
  return (
    <div className="Profile-flexContainer">
      <div className="Profile-bioContainer">
        <div className="Profile-image" />
        <div className="Profile-nameContainer">
          <h1 className="Profile-name">{username}</h1>
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
            {currentBook ? (
              <LibraryCard
                userId={" Anonymous "}
                book={{ _id: "3", title: "Thinking, Fast and Slow", authors: ["Daniel Kahneman"] }}
              />
            ) : (<p>nothing</p>)
            }
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
          data={createPagesData()}
          style={{
            width: 650,
            height: 2000,
          }}
          options={{
            maintainAspectRatio: true,
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'month',
                }
              },
              y: {
                beginAtZero: true,
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default Profile;
