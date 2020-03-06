import React from "react";
import { Link } from "react-router-dom";

function Navbar({ children }) {
  return (
    <nav>
      <ol>
        <li>
          <Link to='/'>home</Link>
        </li>
        <li>
          <Link to='/protected'>protected sources</Link>
        </li>
        <li>
          <Link to='/login'>login</Link>
        </li>
      </ol>
      <button>login</button>
      {children}
    </nav>
  );
}

export default Navbar;
