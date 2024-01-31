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

type BlendsProps = {
  userId: string;
};

const Blends = (props: BlendsProps) => {
  const { id } = useParams<string>();
  const [selfid, setSelfID] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [userLibrary, setUserLibrary] = useState<User[]>([]);
  const [blendsList, setBlendsList] = useState<string[]>([]);
  const [library, setLibrary] = useState<Book[]>([]);
  const [username2, setUsername2] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    get("/api/whoami").then((user: User) => {
      if (user._id) {
        setSelfID(user._id);
        setUsername(user.name);
        setBlendsList(user.blends);
      }
      setIsLoading(false);
    });
  }, []);

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


  return (
    <div>
      <div className="u-textCenter">
        <h3>{username}'s Profile</h3>
      </div>
      <div className="library-container">
        {isLoading ? <div>Loading...</div> : <ProfileData userId={selfid} />}
      </div>
      <div className="u-textCenter">
        <h3>{username2}'s Profile</h3>
      </div>
      <div className="library-container">
        <ProfileData userId={id!} />
      </div>
    </div>
  );
};

export default Blends;
