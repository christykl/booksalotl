import React, { useState, useEffect } from "react";
import SingleBook from "../modules/SingleBook";
import FileUpload from "../modules/FileUpload";

export type Book = {
  _id: string;
  title: string;
  author: string;
  bookCover?: string;
  rating?: number;
  pageCount?: number;
  genre?: string;
  dateRead?: Date;
};

type BooksProps = {
  userId: string;
};

const Books = (props: BooksProps) => {
  const [bookData, setBookData] = useState<Book[]>([]);

  const loadBooks = () => {
    setBookData([
      { _id: "1", title: "1984", author: "George Orwell" },
      { _id: "2", title: "Pride and Prejudice", author: "Jane Austen" },
      { _id: "3", title: "Thinking, Fast and Slow", author: "Daniel Kahneman" },
    ]);
  };

  useEffect(loadBooks, []);

  return (
    <>
      <FileUpload />
      {bookData.map((item) => {
        return <SingleBook key={item._id} userId={props.userId} book={item} />;
      })}
    </>
  );
};

export default Books;
