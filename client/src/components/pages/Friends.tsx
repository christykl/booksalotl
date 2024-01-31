import React, { useState, useEffect } from "react";
import SingleFriend from "../modules/SingleFriend";
import userimage from "../../public/default.png";
import { get, post, remove } from "../../utilities";
import { User } from "../../../../server/models/User";
import "./Friends.css"

type Friend = {
  _id: string;
  userName: string;
  profileImage?: string;
  url: string;
}

// type FriendData = {
//   friends: Friend[];
// }

type FriendsProps = {
  userId: string;
}

// const frienddata: Friend[] = [{_id: "1", userName: "janelle"}, {_id: "2", userName: "christy"}];

const Friends = (props: FriendsProps) => {
  const [friendData, setFriendData] = useState<Friend[]>([]);
  const [idData, setIdData] = useState<string[]>([]);
  const [userLibrary, setUserLibrary] = useState<User[]>([]);

  useEffect(() => {
    get("/api/whoami")
      .then((user: User) => {
        if (user._id) {
          setIdData(user.blends);
        }
      })
  }, []);

  useEffect(() => {
    get("/api/users").then((users: User[]) => {
      setUserLibrary(users);
    })
  }, []);

  useEffect(() => {
    const friendsList : Friend[] = [];
    for (let j = 0; j < idData.length; j++) {
      for (let i = 0; i < userLibrary.length; i++) {
        if (userLibrary[i]._id === idData[j]) {
          console.log(userLibrary[i]._id);
          friendsList.push({ _id: userLibrary[i]._id, userName: userLibrary[i].name, url:  "https://bookblendr-7aw5.onrender.com/blends/" + userLibrary[i]._id});
        };
      };
    };
    setFriendData(friendsList);
    console.log(friendData);
  }, [userLibrary, idData]);

  useEffect(() => {
    console.log(friendData);
  }, [friendData])

  return <div className="outer-container">
    {friendData.map((item) => {
      return <SingleFriend key={item._id} userId={props.userId} userName={item.userName} url={item.url}/>
    })}
  </div>
};

export default Friends;