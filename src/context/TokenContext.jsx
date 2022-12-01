import React, { useState, createContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState({});
  let location = useLocation();

  const refreshToken = () => {
    //refreshes token if expired
    if (!token.expires || token.expires - new Date().getTime() < 1) {
      fetchToken();
    }
  };

  const fetchToken = () => {
    axios
      .get("http://localhost:3001/fetchToken")
      .then((res) => {
        setToken({
          token: res.data.access_token,
          tokenType: res.data.token_type,
          expires: new Date().getTime() + res.data.expires_in * 1000,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchToken();
  }, []);

  useEffect(() => {
    refreshToken();
  }, [location]);

  return (
    <TokenContext.Provider value={{ token }}>{children}</TokenContext.Provider>
  );
};

export default TokenContext;
