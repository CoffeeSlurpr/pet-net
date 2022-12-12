import React, { useState, createContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState({});
  let location = useLocation();

  const fetchToken = async () => {
    await axios
      .get("http://localhost:3001/fetchToken")
      .then((res) => {
        const newToken = {
          token: res.data.access_token,
          tokenType: res.data.token_type,
          expires: new Date().getTime() + res.data.expires_in * 1000,
        };

        localStorage.setItem("token", JSON.stringify(newToken));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const foundToken = JSON.parse(localStorage.getItem("token"));

    if (!foundToken || token.expires - new Date().getTime() < 10) {
      fetchToken();
    } else {
      setToken(foundToken);
    }
  }, [location.pathname]);

  return (
    <TokenContext.Provider value={{ token }}>{children}</TokenContext.Provider>
  );
};

export default TokenContext;
