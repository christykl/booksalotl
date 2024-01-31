import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { User } from "../../../server/models/User";

import NotFound from "./pages/NotFound";
import Blends from "./pages/Blends";

import Profile from "./pages/Profile";
import { get, post } from "../utilities";

const BlendsRoute = ({ userId }) => {
  const [ids, setIds] = useState<string[]>([]);
  const { id } = useParams();
  const [blendsList, setBlendsList] = useState<string[]>([]);

  useEffect(() => {
    get("/api/users").then((users: User[]) => {
      setIds(users.map((user) => user._id));
    });
  }, []);

  const checkId = () => {
    for (let i = 0; i < ids.length; i++) {
      if (ids[i] === id) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    get("/api/whoami").then((user: User) => {
      if (user._id) {
        setBlendsList(user.blends);
      }
    });
  }, []);

  useEffect(() => {
    if (!checkBlends(id)) {
        post("/api/updateUsers", { passedId: id });
    }
  })

  const checkBlends = (id) => {
    for (let i = 0; i < blendsList.length; i++) {
      if (blendsList[i] === id) {
        return true;
      }
    }
    return false;
  };

  if (userId === undefined) {
    return <div>
        <p>loading...</p>
    </div>
  }

  if (!checkId()) {
    return <NotFound />;
  } else if (userId === id) {
    return <Profile userId={userId} />;
  } else {
    return <Blends userId={userId} />;
  }
};
export default BlendsRoute;
