import React, { createContext, useContext, useState, useEffect } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import { useLocation } from "react-router-dom";

const ContextStore = createContext();

export function MyContext({ children, ...initOptions }) {
  const [state, setState] = useState({
    isAuthenticated: false,
    user: null,
    auth0Client: null,
    loading: true,
    popupOpen: false
  });
  const location = useLocation();

  useEffect(() => {
    async function initAuth0() {
      const auth0FromHook = await createAuth0Client(initOptions);
      setState({
        ...state,
        auth0Client: auth0FromHook
      });

      const isAuthenticated = await auth0FromHook.isAuthenticated();
      setState({
        ...state,
        isAuthenticated
      });

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        setState({
          ...state,
          user
        });
      }

      setState({
        ...state,
        loading: false
      });
    }

    console.log(location);

    initAuth0();
  }, []);

  return (
    <ContextStore.Provider value={{ ...state, setState }}>
      {children}
    </ContextStore.Provider>
  );
}

export const useMyContext = () => useContext(ContextStore);
