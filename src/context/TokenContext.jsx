import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);

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
        setToken(newToken);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const foundToken = JSON.parse(localStorage.getItem("token"));

    if (
      !foundToken ||
      (foundToken?.expires - new Date().getTime()) / 1000 < 10
    ) {
      fetchToken();
    } else {
      setToken(foundToken);
    }
  }, []);

  return (
    <TokenContext.Provider value={{ token }}>{children}</TokenContext.Provider>
  );
};

export default TokenContext;
