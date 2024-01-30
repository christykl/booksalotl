// https://mantine.dev/core/box/

import React from "react";
import { Grid, Container, Avatar, Button, Text } from "@mantine/core";
import "./SingleFriend.css";

type SingleFriendProps = {
  userId: string;
  profileImage?: string;
  userName: string;
};

const SingleFriend = (props: SingleFriendProps) => {
  return (
    // <Grid>
    //   <Grid.Col span={4}>1</Grid.Col>
    //   <Grid.Col span={4}>2</Grid.Col>
    //   <Grid.Col span={4}>3</Grid.Col>
    // </Grid>
    <div className="SingleFriend-container">
      <div className="SingleFriend-grid-container">
        <Avatar src={props.profileImage} alt={props.userName} radius="xl" />
        <Text className="u-textCenter" size="lg">
          {props.userName}
        </Text>
        <button className="SingleFriend-button">
          <p> ~Blend~ </p>
        </button>
      </div>
    </div>
  );
};

export default SingleFriend;
