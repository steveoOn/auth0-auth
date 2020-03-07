import React, { createContext, useContext, useState, useEffect } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import { useLocation } from "react-router-dom";

const ContextStore = createContext();

const defaultRedirectCallback = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

export function MyContext({
  children,
  onRedirectCallback = defaultRedirectCallback,
  ...props
}) {
  const [auth, setAuth] = useState();
  const [user, setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    async function initAuth0() {
      try {
        const auth0FromHook = await createAuth0Client(props);
        setAuth(auth0FromHook);

        if (
          location.search.includes("code=") &&
          location.search.includes("state=")
        ) {
          const { appState } = await auth0FromHook.handleRedirectCallback();
          onRedirectCallback(appState);
        }

        const isAuthenticated = await auth0FromHook.isAuthenticated();
        setIsAuthenticated(isAuthenticated);

        if (isAuthenticated) {
          const user = await auth0FromHook.getUser();
          setUser(user);
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    initAuth0();
  }, []);

  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth.handleRedirectCallback();
    const user = await auth.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
  };

  return (
    <ContextStore.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        handleRedirectCallback,
        getIdTokenClaims: (...p) => auth.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth.getTokenSilently(...p),
        getTokenWithPopup: (...p) => auth.getTokenWithPopup(...p),
        logout: (...p) => auth.logout(...p)
      }}
    >
      {children}
    </ContextStore.Provider>
  );
}

export const useMyContext = () => useContext(ContextStore);
