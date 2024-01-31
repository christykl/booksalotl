import React from "react";
import { Link } from "react-router-dom";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  googleLogout,
  CredentialResponse,
} from "@react-oauth/google";
import "./NavBar.css";
import Logo from "./Logo";

const GOOGLE_CLIENT_ID = "924135144483-a4h7ghgqcej244vnv4312rdkd4lovc95.apps.googleusercontent.com";

type NavBarProps = {
  userId: string | undefined;
  handleLogin: (response: CredentialResponse) => void;
  handleLogout: () => void;
};

const NavBar = (props: NavBarProps) => {
  const { handleLogin, handleLogout } = props;

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <nav className="NavBar-container">
        <Logo />
        <div className="NavBar-title NavBar-linkContainer u-inlineBlock">
          <Link to="/profile/" className="NavBar-link">
            profile
          </Link>
          <Link to="/my-books/" className="NavBar-link">
            my books
          </Link>
          <Link to="/blends/" className="NavBar-link">
            blends
          </Link>
          <Link to="/" className="NavBar-link" onClick={() => {
            googleLogout();
            handleLogout();
          }}>
            sign out
          </Link>
        </div>
      </nav>
    </GoogleOAuthProvider>
  );
};

export default NavBar;
