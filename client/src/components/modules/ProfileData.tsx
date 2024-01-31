import React, { useState, useEffect } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);
import { Doughnut } from "react-chartjs-2";
import "../../utilities.css";
import "../pages/Profile.css";
import { User } from "../../../../server/models/User";
import { get } from "../../utilities";
import { Book } from "../../../../server/models/Book";
import PagesGraph from "./PagesGraph";
import GenreGraph from "./GenreGraph";

const primaryColor = getComputedStyle(document.documentElement).getPropertyValue("--primary");
const primaryDimColor = getComputedStyle(document.documentElement).getPropertyValue(
  "--primary--dim"
);
const greyColor = getComputedStyle(document.documentElement).getPropertyValue("--grey");

type ProfileProps = {
  userId: string;
};

const ProfileData = (props: ProfileProps) => {
  const [bookData, setBookData] = useState<Book[]>([]);
  const [username, setUsername] = useState<string>("Janelle Cai");
  const [library, setLibrary] = useState<Book[]>([]);
  const [currentBook, setCurrentBook] = useState<Book[]>([]);
  const [lifetimePages, setLifetimePages] = useState<number>(0);

  const [id, setId] = useState<string>("Janelle Cai");

  useEffect(() => {
    get("/api/whoami").then((user: User) => {
      if (user._id) {
        setUsername(user.name);
        setId(user._id);
      }
    });
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

  const shortCount = bookData.filter((bookObj) => bookObj.pages < 200).length;
  const mediumCount = bookData.filter(
    (bookObj) => bookObj.pages >= 200 && bookObj.pages < 400
  ).length;
  const longCount = bookData.filter((bookObj) => bookObj.pages >= 400).length;

  const lengthData = {
    labels: ["short", "medium", "long"],
    datasets: [
      {
        data: [shortCount, mediumCount, longCount],
        backgroundColor: [primaryColor, primaryDimColor, greyColor],
        hoverOffset: 4,
      },
    ]
  };

  useEffect(() => {
    for (let bk of bookData) {
      setLifetimePages((prev) => {
        if (bk.pages == undefined || bk.status === "currently reading") {
          return prev;
        }
        return prev + bk.pages;
      });
    }
  }, [bookData]);

  useEffect(() => {
    for (let bk of bookData) {
      if (bk != undefined && bk.status === "currently reading") {
        setCurrentBook((prev) => [...prev, bk]);
      }
    }
  }, [bookData]);

  return (
    <div className="Profile-flexContainer">
      <div className="Blends-chart-container">
        <p className="Profile-chartHeader">Your Top Genres</p>
        <GenreGraph bookData={bookData}/>
      </div>
      <div className="Blends-chart-container">
        <p className="Profile-chartHeader">Book Length</p>
        <Doughnut className="Profile-chartSubContainer" data={lengthData} />
      </div>
      <div className="Blends-chart-container">
        <p className="Profile-chartHeader">Pages Read in the Past Year</p>
        <PagesGraph bookData={bookData}/>
      </div>
    </div>
  );
};

export default ProfileData;
