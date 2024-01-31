// https://mantine.dev/core/box/

import React from "react";
import { Grid, Container, Avatar, Button, Text } from "@mantine/core";
import "./SingleFriend.css";

type SingleFriendProps = {
  userId: string;
  profileImage?: string;
  userName: string;
  url: string;
};

const SingleFriend = (props: SingleFriendProps) => {
  return (
    // <Grid>
    //   <Grid.Col span={4}>1</Grid.Col>
    //   <Grid.Col span={4}>2</Grid.Col>
    //   <Grid.Col span={4}>3</Grid.Col>
    // </Grid>
    <Container className="SingleFriend-container">
      <Grid className="grid-container" justify="center" align="stretch">
        <Grid.Col span={3}>
          <Avatar src={props.profileImage} alt={props.userName} radius="xl" />
        </Grid.Col>
        <Grid.Col span={6}>
          <Text className="u-textCenter" size="lg">
            {props.userName}
          </Text>
        </Grid.Col>
        <Grid.Col span={3}>
          <a href={props.url}>
            <button className="SingleFriend-button">
              <p> ~~View Blend~~ </p>
            </button>
          </a>
          
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default SingleFriend;
