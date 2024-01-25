import React, { useState, useEffect } from "react";
import SingleFriend from "../modules/SingleFriend";
import userimage from "../../public/default.png"
import "./Friends.css"

type Friend = {
  _id: string;
  userName: string;
  profileImage?: string;
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

  useEffect(() => {
    const loadFriends = () => {
      setFriendData([
        { _id: "1", userName: "janelle" },
        { _id: "2", userName: "christy" },
        { _id: "3", userName: "gracie"},
        { _id: "4", userName: "alknfda"}, 
        { _id: "5", userName: "ldaknf"}, 
        { _id: "6", userName: "janelle" },
        { _id: "7", userName: "christy" },
        { _id: "8", userName: "gracie"},
        { _id: "9", userName: "alknfda"}, 
        { _id: "10", userName: "ldaknf"}, 
      ]);
    };
    loadFriends();
  }, []);

  return <div className="outer-container">
    {friendData.map((item) => {
      return <SingleFriend key={item._id} userId={props.userId} userName={item.userName}/>
    })}
  </div>
};

export default Friends;

