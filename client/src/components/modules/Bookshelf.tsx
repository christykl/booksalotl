import React from "react";
import { Book } from "../../../../server/models/Book";
import LibraryCard from "./LibraryCard";
import "./Bookshelf.css";
import "../pages/Books.css";
import { Badge } from "@mantine/core";

type BookshelfProps = {
  userId: string;
  title: string;
  books: Book[];
};

const Bookshelf = (props) => {
  return (
    <>
      <div className="Books-lineOuterContainer">
        <div className="Books-lineInnerContainer">
          <hr></hr>
        </div>
      </div>
      <div className="Books-badgeContainer">
        <Badge variant="filled" size="xl">
          {props.title}
        </Badge>
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