import React, { useState, useEffect } from "react";
import "./Blends.css";
import { Await, useParams } from "react-router-dom";
import { get, post, remove } from "../../utilities";
import LibraryCard from "../modules/LibraryCard";
import { User } from "../../../../server/models/User";
import { Book } from "../../../../server/models/Book";
import "./Books.css";
import "./Profile.css";
import ProfileData from "../modules/ProfileData";
import Bookshelf from "../modules/Bookshelf";
import { set } from "mongoose";

type BlendsProps = {
  userId: string;
};

const Blends = (props: BlendsProps) => {
  const { id } = useParams<string>();
  const [selfid, setSelfID] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [userLibrary, setUserLibrary] = useState<User[]>([]);
  const [library, setLibrary] = useState<Book[]>([]);
  const [username2, setUsername2] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [lib1, setLib1] = useState<Book[]>([]);
  const [lib2, setLib2] = useState<Book[]>([]);
  const [bothBooks, setBothBooks] = useState<Book[]>([]);
  const [bothWantBooks, setBothWantBooks] = useState<Book[]>([]);


  useEffect(() => {
    get("/api/whoami").then((user: User) => {
      if (user._id) {
        setSelfID(user._id);
        setUsername(user.name);
      }
    });
  }, []);

  useEffect(() => {
    if (selfid && library.length > 0 && username2 !== "" && username !== "" && id) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [selfid, library, username2, username, id]);
  
  useEffect(() => {
    get("/api/users").then((users: User[]) => {
      setUserLibrary(users);
    });
  }, []);

  useEffect(() => {
    for (let i = 0; i < userLibrary.length; i++) {
      if (userLibrary[i]._id === id) {
        setUsername2(userLibrary[i].name);
      }
    }
  }, [userLibrary]);

  useEffect(() => {
    get("/api/books").then((books: Book[]) => {
      setLibrary(books);
    });
  }, []);

  useEffect(() => {
    setLib1(library.filter((book) => book.reader_id == selfid));
    setLib2(library.filter((book) => book.reader_id == id!));
  }, [library, selfid, id!]);

  useEffect(() => {
    console.log("lib1", lib1);
    console.log("lib2", lib2)
    const want1 = lib1.filter((book) => book.status === "want to read");
    const want2 = lib2.filter((book) => book.status === "want to read");
    const bothWant = want1.filter((book) => {
      for (let i = 0; i < want2.length; i++) {
        if (book.title === want2[i].title) {
          return true;
        }
      }
      return false;
    });
    setBothWantBooks(library.filter((book) => bothWant.includes(book)));
  }, [lib1, lib2]);

  useEffect(() => {
    const like1 = lib1.filter((book) => book.rating === 5);
    const like2 = lib2.filter((book) => book.rating === 5);
    const bothLike = like1.filter((book) => {
      for (let i = 0; i < like2.length; i++) {
        if (book.title === like2[i].title) {
          return true;
        }
      }
      return false;
    });
    setBothBooks(library.filter((book) => bothLike.includes(book)));
  }, [lib1, lib2]);

  if (isLoading) {
    return <div>Loading...</div>
  }
  else {
    return (
      <div>
        <div className="Blends-container">
          <div className="Blends-header u-textCenter">
            <h2>{username} and {username2}'s Blend</h2>
          </div>
        </div>
        <div className="Blends-bookshelf-container">
          <Bookshelf userId={id!} title="Books you both want to read" books={bothWantBooks} />
          <Bookshelf userId={id!} title="Books you both enjoyed" books={bothBooks} />
        </div>
        <div>
          <div className="u-textCenter">
            <h3>{username}'s Profile</h3>
          </div>
          <div className="library-container">
            <ProfileData userId={selfid} />
          </div>
        </div>
        <div>
          <div className="u-textCenter">
            <h3>{username2}'s Profile</h3>
          </div>
          <div className="library-container">
            <ProfileData userId={id!} />
          </div>
        </div>
      </div>
    );
  }
};

export default Blends;
