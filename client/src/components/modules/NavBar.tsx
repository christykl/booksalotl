import React from "react";
import { Link } from "react-router-dom";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  googleLogout,
  CredentialResponse,
} from "@react-oauth/google";
import "./NavBar.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "924135144483-a4h7ghgqcej244vnv4312rdkd4lovc95.apps.googleusercontent.com";

type NavBarProps = {
  userId: string | undefined;
  handleLogin: (response: CredentialResponse) => void;
  handleLogout: () => void;
};

/**
 * The navigation bar at the top of all pages.
 */
const NavBar = (props: NavBarProps) => {
  const { handleLogin, handleLogout } = props;

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <nav className="NavBar-container">
        <div className="NavBar-title u-inlineBlock">Catbook</div>
        <div className="NavBar-linkContainer u-inlineBlock">
          <Link to="/" className="NavBar-link">
            Home
          </Link>
          {props.userId && (
            <Link to={`/profile/${props.userId}`} className="NavBar-link">
              Profile
            </Link>
          )}
          <Link to="/chat/" className="NavBar-link">
            Chat
          </Link>
          {props.userId ? (
            <button
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
      </nav>
    </GoogleOAuthProvider>
  );
};

export default NavBar;
