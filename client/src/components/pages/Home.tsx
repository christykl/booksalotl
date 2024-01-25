import React from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  googleLogout,
  CredentialResponse,
} from "@react-oauth/google";

import "./Home.css";
import { FaChartColumn } from "react-icons/fa6";
import { IconContext } from "react-icons";

//TODO(weblab student): REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "924135144483-a4h7ghgqcej244vnv4312rdkd4lovc95.apps.googleusercontent.com";

type Props = {
  userId?: string;
  handleLogin: (credentialResponse: CredentialResponse) => void;
  handleLogout: () => void;
};
const Home = (props: Props) => {
  const { handleLogin, handleLogout } = props;

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="Home-container">
        <div className="Home-flexContainer">
          <div className="Home-content">
            <h1>
              book <br /> blendr
            </h1>
            <div className="u-subheader Home-subtitle">
              <h4>blend and send to a friend</h4>
            </div>
          </div>
        </div>
        <div className="Home-loginContainer">
          {props.userId ? (
            <button
              className="Home-loginButton"
              onClick={() => {
                googleLogout();
                handleLogout();
              }}
            >
              Logout
            </button>
          ) : (
            <GoogleLogin onSuccess={handleLogin} onError={() => console.log("Error Logging in")} />
          )}
        </div>
      </div>
      <div className="Home-container2"></div>
    </GoogleOAuthProvider>
  );
};

export default Home;
