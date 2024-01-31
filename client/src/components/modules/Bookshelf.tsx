import React from "react";
import { Book } from "../../../../server/models/Book";
import LibraryCard from "./LibraryCard";
import "./Bookshelf.css";

type BookshelfProps = {
  userId: string;
  title: string;
  books: Book[];
};

const Bookshelf = (props) => {
  return (
    <>
      <div>
        <h2>{props.title}</h2>
      </div>
      <div className="Books-container">
        {props.books.map((book) => (
          <div className="Books-card">
            <LibraryCard book={book} userId={props.userId}/>
          </div>
        ))}
      </div>
    </>
  );
}

export default Bookshelf;