import React from "react";
import { Book } from "../pages/Books";
import { Card, Image, Title, Text } from '@mantine/core';

import "./SingleBook.css";

type SingleBookProps = {
  userId: string;
  book: Book;
};

const testSingleBook = () => {

  return (
    <Card className="single-book-card">
      {book.bookCover && <Image src="../../public/pride-and-prejudice.jpg" alt="Pride and Prejudice" className="book-cover" />}
      <div className="book-details">
        <Title order={3}>{book.title}</Title>
        <Text>Author: {book.author}</Text>
        {book.rating && <Text>Rating: {book.rating}</Text>}
      </div>
    </Card>
  );
};

export default testSingleBook;
