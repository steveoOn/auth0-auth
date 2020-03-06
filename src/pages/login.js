import React from "react";
import Navbar from "../components/navbar";

const Login = () => {
  return (
    <Navbar>
      <form>
        <input type='email' />
        <input type='password' />
        <button>login</button>
      </form>
    </Navbar>
  );
};

export default Login;
