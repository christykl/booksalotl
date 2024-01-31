import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "../modules/Card";
import "./Books.css";
import { get, post } from "../../utilities";
import LibraryCard from "../modules/LibraryCard";
import { Book } from "../../../../server/models/Book";
import { remove } from "../../utilities";
import BookInfo from "../modules/BookInfo";
import EditBook from "../modules/EditBook";
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
  const [status, setStatus] = useState<string>("read");
  const [editBook, setEditBook] = useState<Book | null>(null);
  const [threeLib, setThreeLib] = useState<Book[][]>([[]]);
  // const [curLib, setCurLib] = useState<Book[]>([]);
  // const [wantLib, setWantLib] = useState<Book[]>([]);
  // const [readLib, setReadLib] = useState<Book[]>([]);

  const genreCallback = (genreval) => {
    setGenre(genreval);
  };

  const dateCallback = (dateval) => {
    setDate(dateval);
  };

  const ratingCallback = (ratingval) => {
    setRating(ratingval);
  };

  const statusCallback = (statusval) => {
    setStatus(statusval);
  };

  const hasThumbnail = (book, key) => {
    if (book.volumeInfo.imageLinks !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  const searchBook = () => {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyDjnJHbxfCAqhtxJr1YYzleaQGQB8MdbEA&maxResults=10`)
      .then((res) => {
        setSearchResults(res.data.items.filter(hasThumbnail));
        setShowDropdown(true);
      })
      .catch((err) => console.log(err));
  };
  

  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submit action
    searchBook(); // Directly call the search function
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
        status: status,
      }).then((newBook) => {
        setLibrary([...library, newBook]);
      });
      setShowDropdown(false); // Optionally close the dropdown after adding a book
    }
  };

  const addFromEdit = (book) => {
    post("/api/books", {
      title: book.title,
      authors: book.authors,
      isbn: book.isbn,
      pages: book.pages,
      dateread: date,
      cover: book.cover,
      rating: rating,
      genre: genre,
      publisher: book.publisher,
      published_date: book.published_date,
      preview_link: book.preview_link,
      description: book.description,
      status: status,
    }).then((newBook) => {
      setLibrary([...library, newBook]);
    });
  };

  const closeBookInfo = () => {
    console.log("close book info");
    setToShow(null);
  };

  const closeEditBook = () => {
    setEditBook(null);
  };

  const bookInfoPopup = (book) => {
    setToShow(book);
  };

  useEffect(() => {
    get("/api/books").then((books: Book[]) => {
      setLibrary(books);
    });
  }, []);

  const removeBook = (item) => {
    remove("/api/books/", { id: item._id }).then(() => {
      const newLibrary = library.filter((book) => book._id !== item._id);
      setLibrary(newLibrary);
      console.log(newLibrary);
    });
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

  const updateBook = (updatedBook) => {
    const bookIndex = library.findIndex(book => book._id === updatedBook._id);
  
    // Create a new array with the updated book
    const updatedLibrary = [...library];
    updatedLibrary[bookIndex] = updatedBook;

    // Update the state
    setLibrary(updatedLibrary);

    // setReadLib(updatedLibrary.filter(book => book.status === "read"));
    // setCurLib(updatedLibrary.filter(book => book.status === "currently reading"));
    // setWantLib(updatedLibrary.filter(book => book.status === "want to read"));

    // Close the edit book overlay
    setEditBook(null);
    addFromEdit(updatedBook);
    remove("/api/books/", { id: updatedBook._id });
  }

  useEffect(() => {
    setThreeLib([
      library.filter((book) => book.status === "currently reading"),
      library.filter((book) => book.status === "want to read"),
      library.filter((book) => book.status === "read")
    ]);
  }, [library]); 

  const handleEditBook = (book) => { 
    setEditBook(book);
  };


  const LibrarySection = (lib: Book[]) => {
    console.log("library section", lib);
    return (
        <div className="library-container">
          {lib.map((book, index) => {
            // console.log(book);
            if (book.reader_id && book.reader_id == props.userId)
              return (
                <div className="Books-card">
                  <LibraryCard userId={props.userId} book={book} key={book._id} />
                  <div>
                    <button
                      className="Books-button"
                      onClick={() => {
                        removeBook(book);
                      }}
                    >
                      Remove
                    </button>
                    <button
                      className="Books-button"
                      onClick={() => {
                        setEditBook(book);
                      }}
                    >
                      Edit
                    </button>
                  </div>
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
                statuscb={statusCallback}/>
            </div>  
          )}
          {editBook && (
            <div className="overlay">
              <EditBook 
                onClose={closeEditBook} 
                item={editBook} 
                datecb={dateCallback} 
                ratingcb={ratingCallback} 
                genrecb={genreCallback} 
                updatebook={updateBook} 
                statuscb={statusCallback}/>
            </div>
          )}
        </div>
    );
}

const sectionnames = ["Read", "Currently Reading", "Want to Read"];

  return (
    <div>
      <div className="Books-searchContainer">
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyUp={searchBook}
            className="Books-input"
          />
          <button className="Books-button" type="submit">
            search
          </button>
        </form>
      </div>
      {renderDropdown()} {/* Render the dropdown here */}
      {/* <div className="Books-searchContainer">
        <FileUpload />
      </div> */}
      <div className="">
        <div className="u-textCenter">
          <h3>Your Library</h3>
        </div>
        {
          threeLib.map((lib, index) => {
            return (
              <>
                <div className="u-textCenter">
                  <h4>{sectionnames[index]}</h4>
                </div>
                {LibrarySection(lib)}
              </>
            );
          })
        }
      </div>
    </div>
  );
};

export default Books;
