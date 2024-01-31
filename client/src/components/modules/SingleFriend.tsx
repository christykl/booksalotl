// https://mantine.dev/core/box/

import React from "react";
import { Grid, Container, Avatar, Button, Text } from "@mantine/core";
import "./SingleFriend.css";
import mascot from "../../public/mascot.png";

type SingleFriendProps = {
  userId: string;
  profileImage?: string;
  userName: string;
  url: string;
};

const SingleFriend = (props: SingleFriendProps) => {
  return (

    <div className="SingleFriend-container">
      <div className="SingleFriend-grid-container">
        <div className="SingleFriend-avatar-container">
          <Avatar src= {mascot} alt={props.userName} radius="xl" color="white"/>
        </div>
        <Text className="u-textCenter" size="lg">
          {props.userName}
        </Text>
         <a href={props.url}>
            <button className="SingleFriend-button">
              <p> View Blend </p>
            </button>
          </a>
      </div>
    </div>

  );
};

export default SingleFriend;
