import React, { useState, useEffect } from "react";
import "./Blends.css"
import { useParams } from 'react-router-dom';
import { get, post, remove } from "../../utilities";
import LibraryCard from "../modules/LibraryCard";
import { User } from "../../../../server/models/User";
import { Book } from "../../../../server/models/Book";
import "./Books.css";

type Blend = {
  _id: string;
  userName: string;
}

type BlendsProps = {
  userId: string;
}

const Blends = (props: BlendsProps) => {
  const { id } = useParams();
  const [username, setUsername] = useState<string>("Janelle Cai");
  const [userLibrary, setUserLibrary] = useState<User[]>([]);
  const [library, setLibrary] = useState<Book[]>([]);
  const [username2, setUsername2] = useState<string>("Janelle Cai");

  useEffect(() => {
    get("/api/whoami")
      .then((user: User) => {
        if (user._id) {
          setUsername(user.name);
        }
      })
  }, []);

  useEffect(() => {
    get("/api/users").then((users: User[]) => {
      setUserLibrary(users);
    });
  }, []);

  useEffect(() => {
    get("/api/books").then((books: Book[]) => {
      setLibrary(books);
    });
  }, []);

  const getUsername2 = (id2) => {
    for (let i = 0; i < userLibrary.length; i++) {
      if (userLibrary[i]._id === id2) {
        setUsername2(userLibrary[i].name);
      }
    }
  }

  return <div>
    <div className="u-textCenter">
      <h3>{username}'s Library</h3>
    </div>
    <div className="library-container">
      {library.map((book, index) => {
        // console.log(book);
        if (book.reader_id && book.reader_id == props.userId)
          return (
            <div className="Books-card">
              <LibraryCard userId={props.userId} book={book} key={book._id} />
            </div>
          );
      })}
    </div>
    <div className="u-textCenter">
      <h3>{username2}'s Library</h3>
    </div>
    <div className="library-container">
      {library.map((book, index) => {
        // console.log(book);
        if (book.reader_id && book.reader_id == id)
          return (
            <div className="Books-card">
              <LibraryCard userId={props.userId} book={book} key={book._id} />
            </div>
          );
      })}
    </div>
  </div>
};

export default Blends;

