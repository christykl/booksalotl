import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);
// import 'chartjs-adapter-date-fns';
// import 'date-fns';
import { Doughnut } from "react-chartjs-2";
import "../../utilities.css";
import "./Profile.css";
// import { Book } from "./Books";
// import Books from "./Books";
// import SingleBook from "../modules/SingleBook";
import { User } from "../../../../server/models/User";
import { get } from "../../utilities";
import { Book } from "../../../../server/models/Book";
import LibraryCard from "../modules/LibraryCard";
import GenreGraph from "../modules/GenreGraph";
import PagesGraph from "../modules/PagesGraph";

const primaryColor = getComputedStyle(document.documentElement).getPropertyValue("--primary");
const primaryDimColor = getComputedStyle(document.documentElement).getPropertyValue(
  "--primary--dim"
);
const greyColor = getComputedStyle(document.documentElement).getPropertyValue("--grey");

type ProfileProps = {
  userId: string;
};

const Profile = (props: ProfileProps) => {
  const [bookData, setBookData] = useState<Book[]>([]);
  const [username, setUsername] = useState<string>("Janelle Cai");
  const [numBlends, setNumBlends] = useState<number>(0);
  const [library, setLibrary] = useState<Book[]>([]);
  const [currentBook, setCurrentBook] = useState<Book[]>([]);
  const [lifetimePages, setLifetimePages] = useState<number>(0);
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);

  const [id, setId] = useState<string>("Janelle Cai");

  useEffect(() => {
    get("/api/whoami").then((user: User) => {
      if (user._id) {
        setUsername(user.name);
        setId(user._id);
        setNumBlends(user.blends.length);
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
        console.log(" in load book book: ", book);
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
    ],
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

  useEffect(() => {
    for (let bk of bookData) {
      if (bk != undefined && bk.rating == 5) {
        setFavoriteBooks((prev) => [...prev, bk]);
      }
    }
  }, [bookData]);

  const link = "https://bookblendr-7aw5.onrender.com/blends/" + id;

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate("/my-books");
  };

  return (
    <div className="Profile-flexContainer">
      <div className="Profile-bioContainer">
        <div className="Profile-image" />
        <div className="Profile-nameContainer">
          <h1 className="Profile-name">{username}</h1>
        </div>
        <div className="Profile-subContainer">
          <button
            className="Profile-button"
            title="Click to copy and share your custom blend link"
            onClick={() => {
              navigator.clipboard.writeText(link);
            }}
          >
            custom blend link
          </button>
        </div>
        <div className="Profile-subContainer">
          <p className="Profile-subhead u-subheader">Blends</p>
          <p className="Profile-content u-subheader">{numBlends}</p>
        </div>
        <div className="Profile-subContainer">
          <p className="Profile-subhead u-subheader">Lifetime Pages Read</p>
          <p className="Profile-content u-subheader">{lifetimePages}</p>
        </div>
      </div>



      <div className="Profile-dataContainer">
        <div className="Profile-horizontalContainer">
          <div className="Profile-chartContainer">
            <p className="Profile-chartHeader">Your Top Genres</p>
            <GenreGraph bookData={bookData}/>
          </div>

          <div className="Profile-chartContainer">
            <p className="Profile-chartHeader">Book Length</p>
            <Doughnut className="Profile-chartSubContainer" data={lengthData} />
          </div>
          </div>

          <div className="Profile-histoContainer">
            <p className="Profile-chartHeader">Pages Read in the Past Year</p>
            <PagesGraph bookData={bookData}/>
          </div>

        <div className="Profile-subContainer">
          <button className="Profile-button Profile-subhead" onClick={handleEditClick}>
            currently reading
          </button>
          <p className="Profile-content u-subheader Profile-bookContainer">
            {currentBook.length > 0 ? (
              currentBook.map((book) => <LibraryCard userId={props.userId} book={book} />)
            ) : (
              <p>none</p>
            )}
          </p>
        </div>
        <div className="Profile-subContainer">
          <button className="Profile-button Profile-subhead" onClick={handleEditClick}>
            favorites
          </button>
          <p className="Profile-content u-subheader Profile-bookContainer">
            {/* <button onClick={handleEditClick}>Edit</button> */}
            {favoriteBooks.length > 0 ? (
              favoriteBooks.map((book) => <LibraryCard userId={props.userId} book={book} />)
            ) : (
              <p>none</p>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
