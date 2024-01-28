import React, { useState, useEffect } from "react";
import "./Blends.css"
import { useParams } from 'react-router-dom';
import { get, post, remove } from "../../utilities";
import LibraryCard from "../modules/LibraryCard";
import User from "../../../../shared/User";

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

  useEffect(() => {
    get("/api/whoami")
      .then((user: User) => {
        if (user._id) {
          setUsername(user.name);
        }
      })
  }, []);

  return <div>
    <h1>{username}</h1>
    <h1>{id}</h1>
  </div>
};

export default Blends;

