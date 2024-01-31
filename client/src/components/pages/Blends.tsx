import React, { useState, useEffect } from "react";
import "./Blends.css"
import { Await, useParams } from 'react-router-dom';
import { get, post, remove } from "../../utilities";
import LibraryCard from "../modules/LibraryCard";
import { User } from "../../../../server/models/User";
import { Book } from "../../../../server/models/Book";
import "./Books.css";

type BlendsProps = {
  userId: string;
}

const Blends = (props: BlendsProps) => {
  const { id } = useParams();
  const [username, setUsername] = useState<string>("");
  const [userLibrary, setUserLibrary] = useState<User[]>([]);
  const [blendsList, setBlendsList] = useState<string[]>([]);
  const [library, setLibrary] = useState<Book[]>([]);
  const [username2, setUsername2] = useState<string>("");

  useEffect(() => {
    get("/api/whoami")
      .then((user: User) => {
        if (user._id) {
          setUsername(user.name);
          setBlendsList(user.blends);
        }
      })
  }, []);

  useEffect(() => {
    get("/api/users").then((users: User[]) => {
      setUserLibrary(users);
    })
  }, []);

  useEffect(() => {
    for (let i = 0; i < userLibrary.length; i++) {
        if (userLibrary[i]._id === id) {
          setUsername2(userLibrary[i].name);
        };
      };
  }, [userLibrary]);

  useEffect(() => {
    get("/api/books").then((books: Book[]) => {
      setLibrary(books);
    });
  }, []);

  // const getUsername2 = () => {
  //   for (let i = 0; i < userLibrary.length; i++) {
  //     if (userLibrary[i]._id === id) {
  //       setUsername2(userLibrary[i].name);
  //     };
  //   };
  // };

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

