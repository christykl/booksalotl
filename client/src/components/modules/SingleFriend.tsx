// https://mantine.dev/core/box/

import React from "react";
import { Grid, Container, Avatar, Button, Text } from "@mantine/core";
import "./SingleFriend.css";

type SingleFriendProps = {
  userId: string;
  profileImage?: string;
  userName: string;
}

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
          <Text size="lg">
            {props.userName}
          </Text>
        </Grid.Col>
        <Grid.Col span={3}>
          <Button>Create Blend</Button>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default SingleFriend;
