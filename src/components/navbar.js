import React from "react";
import { Link } from "react-router-dom";
import { useMyContext } from "../context";

function Navbar({ children }) {
  const { isAuthenticated, loginWithRedirect, logout } = useMyContext();

  return (
    <nav>
      <ol>
        <li>
          <Link to='/'>home</Link>
        </li>
        <li>
          <Link to='/protected'>protected sources</Link>
        </li>
      </ol>
      {!isAuthenticated ? (
        <button onClick={() => loginWithRedirect()}>login</button>
      ) : (
        <button onClick={() => logout()}>logout</button>
      )}
      {children}
    </nav>
  );
}

export default Navbar;
