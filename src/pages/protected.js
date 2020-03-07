import React from "react";
import Navbar from "../components/navbar";
import { useMyContext } from "../context";

function Protected() {
  const { loading, user } = useMyContext();

  if (loading || !user) return <p>loading...</p>;

  return (
    <Navbar>
      <img src={user.picture} alt='Profile' />
      <h1>{user.nickname}</h1>
      <h3>{user.email}</h3>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </Navbar>
  );
}

export default Protected;
