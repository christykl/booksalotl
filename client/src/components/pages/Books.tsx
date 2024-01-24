import React, { useState, useEffect } from "react";
import SingleBook from "../modules/SingleBook";
import FileUpload from "../modules/FileUpload";
import axios from "axios";
import Card from "../modules/Card";
import "./Books.css";
import { get, post } from "../../utilities";
import LibraryCard from "../modules/LibraryCard";
import {Book} from "../../../../server/models/Book";

// export type Book = {
//   _id: string;
//   title: string;
//   author: string;
//   bookCover?: string;
//   rating?: number;
//   pageCount?: number;
//   genre?: string;
//   dateRead?: Date;
//   readerId?: string;
// };

// export type Book = {
//   title: string;
//   author: string;
//   isbn: string;
//   pages: number;
//   dateread: Date;
//   rating: number;
//   cover: string;
//   reader_id: string;
//   _id: string;
// }

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

  const addBookToLibrary = (book) => {
    // setLibrary([...library, book]);
    console.log(book)
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

  return (
    <div>
      <div className="Books-searchContainer">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyUp={searchBook}
        />
        <button type="button">Search</button>
      </div>
      {renderDropdown()} {/* Render the dropdown here */}
      {/* <div className="Books-searchContainer">
        <FileUpload />
      </div> */}
      <div className="library-container">
        <h3>Your Library</h3>
        {library.map((book, index) => {
          console.log(book);
          console.log("book ID")
          console.log(book.reader_id)
          console.log("prop ID")
          console.log(props.userId)
          if (book.reader_id && book.reader_id == props.userId)
            return <LibraryCard book={book} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Books;
