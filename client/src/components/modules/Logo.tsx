import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../public/logo.png"

const Logo = () => {
  return (
    <Link to="/profile/">
      <img 
        src={logo}
        alt="Logo" 
        style={{width: "60px", height: "60px"}}
      />
    </Link>
  );
};

export default Logo;