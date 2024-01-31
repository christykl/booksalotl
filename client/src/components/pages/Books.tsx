import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "../modules/Card";
import "./Books.css";
import { get, post } from "../../utilities";
import LibraryCard from "../modules/LibraryCard";
import { Book } from "../../../../server/models/Book";
import { remove } from "../../utilities";
import BookInfo from "../modules/BookInfo";
import useOutsideClick from "../modules/OutsideClick";

type BooksProps = {
  userId: string;
};

const Books = (props: BooksProps) => {
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [library, setLibrary] = useState<Book[]>([]);
  const [search, setSearch] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [toShow, setToShow] = useState<Book | null>(null);
  const [genre, setGenre] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [rating, setRating] = useState<number>(0);
  const [current, setCurrent] = useState<boolean>(false);

  const genreCallback = (genreval) => {
    setGenre(genreval);
  };

  const dateCallback = (dateval) => {
    setDate(dateval);
  };

  const ratingCallback = (ratingval) => {
    setRating(ratingval);
  };

  const currentCallback = (currentval) => {
    console.log(currentval);
    setCurrent(currentval);
  };

  const hasThumbnail = (book, key) => {
    if (book.volumeInfo.imageLinks !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  const searchBook = (evt) => {
    if (evt.key === "Enter") {
      axios
        .get(
          "https://www.googleapis.com/books/v1/volumes?q=" +
            search +
            "&key=AIzaSyDjnJHbxfCAqhtxJr1YYzleaQGQB8MdbEA&maxResults=10"
        )
        .then((res) => {
          setSearchResults(res.data.items.filter(hasThumbnail));
          setShowDropdown(true); // Show the dropdown
        })
        .catch((err) => console.log(err));
    }
  };

  const checkLibrary = (book) => {
    if (library.length > 0) {
      for (let i = 0; i < library.length; i++) {
        if (library[i].title == book.volumeInfo.title && library[i].reader_id == props.userId) {
          return true;
        }
      }
    }
    return false;
  };

  const addBookToLibrary = (book) => {
    // setLibrary([...library, book]);
    console.log("adding book to library");
    if (checkLibrary(book)) {
      // error message popup
      alert("already in library");
      return;
    } else {
      console.log(book);
      console.log("adding lib,", current);
      post("/api/books", {
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors,
        isbn: book.volumeInfo.isbn,
        pages: book.volumeInfo.pageCount,
        dateread: date,
        cover: book.volumeInfo.imageLinks.smallThumbnail,
        rating: rating,
        genre: genre,
        publisher: book.volumeInfo.publisher,
        published_date: book.volumeInfo.publishedDate,
        preview_link: book.volumeInfo.previewLink,
        description: book.volumeInfo.description,
        current: current,
      }).then((newBook) => {
        setLibrary([...library, newBook]);
        // setShowBookInfo(true);
        // setToShow(newBook);
        // console.log("show book info");
      });
      setShowDropdown(false); // Optionally close the dropdown after adding a book
    }
  };

  const closeBookInfo = () => {
    console.log("close book info");
    setToShow(null);
    // setShowBookInfo(false);
  };

  // const renderDropdown = () => {
  //   if (!showDropdown) return null;

  //   return (
  //     <div className="dropdown">
  //       {searchResults.map((book, index) => (
  //         <div key={index} onClick={() => bookInfoPopup(book)}>
  //           <Card book={book} />
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };

  const bookInfoPopup = (book) => {
    setToShow(book);
  };

  useEffect(() => {
    get("/api/books").then((books: Book[]) => {
      setLibrary(books);
    });
  }, []);

  const removeBook = (item) => {
    console.log(item._id);
    console.log("before");
    console.log(library.map((book) => book._id));
    remove("/api/books/", { id: item._id }).then(() => {
      const newLibrary = library.filter((book) => book._id !== item._id);
      setLibrary(newLibrary);
      console.log(newLibrary);
    });
    console.log("after");
    console.log(library.map((book) => book._id));
    console.log("removed book");
  };

  const noDropdown = () => {
    setToShow(null);
    setShowDropdown(false);
  };

  const dropdownRef = useRef(null);
  
  useOutsideClick(dropdownRef, () => {
    if (toShow === null) {
      setShowDropdown(false);
    }
  });

  const renderDropdown = () => {
    if (!showDropdown) return null;

    return (
      <div ref={dropdownRef} className="dropdown">
        {searchResults.map((book, index) => (
          <div key={index} onClick={() => bookInfoPopup(book)}>
            <Card book={book} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="Books-searchContainer">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyUp={searchBook}
          className="Books-input"
        />
      </div>
      {renderDropdown()} {/* Render the dropdown here */}
      {/* <div className="Books-searchContainer">
        <FileUpload />
      </div> */}
      <div className="">
        <div className="u-textCenter">
          <h3>Your Library</h3>
        </div>
        <div className="library-container">
          {library.map((book, index) => {
            // console.log(book);
            if (book.reader_id && book.reader_id == props.userId)
              return (
                <div className="Books-card">
                  <LibraryCard userId={props.userId} book={book} key={book._id} />
                  <button
                    className="Books-button"
                    onClick={() => {
                      removeBook(book);
                    }}
                  >
                    Remove
                  </button>
                </div>
              );
          })}
          {toShow && (
            <div className="overlay">
              <BookInfo
                onClose={closeBookInfo}
                item={toShow}
                datecb={dateCallback}
                ratingcb={ratingCallback}
                genrecb={genreCallback}
                addbook={addBookToLibrary}
                dropdowncb={noDropdown}
                currentcb={currentCallback}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Books;
