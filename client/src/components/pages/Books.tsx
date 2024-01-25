import React, { useState, useEffect } from "react";
import SingleBook from "../modules/SingleBook";
import FileUpload from "../modules/FileUpload";
import axios from "axios";
import Card from "../modules/Card";
import "./Books.css";
import { get, post } from "../../utilities";
import LibraryCard from "../modules/LibraryCard";
import { Book } from "../../../../server/models/Book";
import { remove } from "../../utilities";

type BooksProps = {
  userId: string;
};

const Books = (props: BooksProps) => {
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [library, setLibrary] = useState<Book[]>([]);
  const [search, setSearch] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const searchBook = (evt) => {
    if (evt.key === "Enter") {
      axios
        .get(
          "https://www.googleapis.com/books/v1/volumes?q=" +
            search +
            "&key=AIzaSyDjnJHbxfCAqhtxJr1YYzleaQGQB8MdbEA&maxResults=10"
        )
        .then((res) => {
          setSearchResults(res.data.items);
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
    if (checkLibrary(book)) {
      // error message popup
      alert("Book already in library");
      return;
    } else {
      console.log(book);
      post("/api/books", {
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors,
        isbn: book.volumeInfo.isbn,
        pages: book.volumeInfo.pageCount,
        dateread: "1/22",
        cover: book.volumeInfo.imageLinks.smallThumbnail,
        rating: 5,
        publisher: book.volumeInfo.publisher,
        published_date: book.volumeInfo.publishedDate,
        preview_link: book.volumeInfo.previewLink,
        description: book.volumeInfo.description,
      }).then((newBook) => {
        setLibrary([...library, newBook]);
        console.log("file uploaded");
      });
      setShowDropdown(false); // Optionally close the dropdown after adding a book
    }
  };

  const renderDropdown = () => {
    if (!showDropdown) return null;

    return (
      <div className="dropdown">
        {searchResults.map((book, index) => (
          <div key={index} onClick={() => addBookToLibrary(book)}>
            <Card book={book} />
          </div>
        ))}
      </div>
    );
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
      const newLibrary = library.filter((book) => {
        book._id !== item._id;
      });
      setLibrary(newLibrary);
    });
    console.log("after");
    console.log(library.map((book) => book._id));
    console.log("removed book");
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
            console.log(book);
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
        </div>
      </div>
    </div>
  );
};

export default Books;
