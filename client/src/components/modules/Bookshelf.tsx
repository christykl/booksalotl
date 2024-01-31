import React from "react";
import { Book } from "../../../../server/models/Book";
import LibraryCard from "./LibraryCard";

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
      {props.books.map((book) => (
        <LibraryCard book={book} userId={props.userId}/>
      ))}
    </>
  );
}

export default Bookshelf;