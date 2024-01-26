import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { CredentialResponse } from "@react-oauth/google";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { get, post } from "../utilities";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import NavBar from "./modules/NavBar";
import Profile from "./pages/Profile";
import { socket } from "../client-socket";
import User from "../../../shared/User";
import "../utilities.css";
import Friends from "./pages/Friends";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css"; // Import Mantine styles
import Books from "./pages/Books";

const theme = createTheme({
  colors: {
    fadedpink: [
      "#DAA5A4",
      "#B88988",
      "#DAA5A4",
      "#DAA5A4",
      "#DAA5A4",
      "#DAA5A4",
      "#DAA5A4",
      "#DAA5A4",
      "#DAA5A4",
      "#DAA5A4",
    ],
  },
  fontFamily: "Courier Prime, Open Sans, sans-serif",
  primaryColor: "fadedpink",
});

const App = () => {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [googleid, setGoogleid] = useState<string>("");

  useEffect(() => {
    get("/api/whoami")
      .then((user: User) => {
        if (user._id) {
          // TRhey are registed in the database and currently logged in.
          setUserId(user._id);
        }
      })
      .then(() =>
        socket.on("connect", () => {
          post("/api/initsocket", { socketid: socket.id });
        })
      );
  }, []);

  const handleLogin = (credentialResponse: CredentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken as string) as { name: string; email: string };
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
      // post("/api/createuser", );
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  // const theme = createTheme({
  //   fontFamily: 'Courier Prime sans-serif'
  // });

  // NOTE:
  // All the pages need to have the props extended via RouteComponentProps for @reach/router to work properly. Please use the Skeleton as an example.
  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
        {!userId ? (
          <Home handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
        ) : (
          <>
            <NavBar handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
            <div>
              <Routes>
                {/* <Route path="/" element={} /> */}
                <Route path="/profile/" element={<Profile userId={userId} />} />
                <Route path="/my-books/" element={<Books userId={userId} />} />
                <Route path="/friends/" element={<Friends userId={userId} />} />
                <Route path="/" element={<Profile userId={userId} />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </>
        )}
      </BrowserRouter>
    </MantineProvider>
  );
};

export default App;
